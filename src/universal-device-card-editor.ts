import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent } from 'custom-card-helpers';
import type { UniversalDeviceCardConfig, BadgeConfig } from './types/config';
import { getLocalizedStringForHass } from './localization';
import type { HASSDomEvent } from '@hass/common/dom/fire_event';
import type { LovelaceConfig } from '@hass/data/lovelace/config/types';
import type { SelectSelector } from '@hass/data/selector';
import type { StackCardConfig } from '@hass/panels/lovelace/cards/types';
import type { ConfigChangedEvent } from '@hass/panels/lovelace/editor/hui-element-editor';
import type { LovelaceCardEditor } from '@hass/panels/lovelace/types';
import type { HomeAssistant } from '@hass/types';

const BADGE_TYPES = [
  { value: 'entity', label_key: 'editor.badge_types.entity' },
  { value: 'update', label_key: 'editor.badge_types.update' },
  { value: 'action', label_key: 'editor.badge_types.action' },
  { value: 'template', label_key: 'editor.badge_types.template' },
] as const;

const TABS = [
  { id: 'settings', label: 'Settings' },
  { id: 'badges', label: 'Badges' },
  { id: 'cards', label: 'Cards' },
] as const;

@customElement('universal-device-card-editor')
export class UniversalDeviceCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: any;
  @property({ attribute: false }) public lovelace?: any;

  @state() private _config!: UniversalDeviceCardConfig;
  @state() private _selectedTab: string = TABS[0].id;

  private _t(key: string, params?: Record<string, string>): string {
    if (!this.hass) {
      const parts = key.split('.');
      return parts[parts.length - 1]
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return getLocalizedStringForHass(this.hass, key, params);
  }

  public setConfig(config: UniversalDeviceCardConfig): void {
    const migrated = this._migrateConfig(config);
    this._config = {
      type: migrated.type,
      name: migrated.name || '',
      icon: migrated.icon || 'mdi:devices',
      device_id: migrated.device_id || '',
      badges: migrated.badges || [],
      cards: migrated.cards || [],
    };
  }

  private _migrateConfig(config: any): UniversalDeviceCardConfig {
    const migrated = { ...config };
    delete migrated.controller;
    delete migrated.reboot_button;

    if (migrated.chips && !migrated.badges) {
      migrated.badges = migrated.chips;
    }
    delete migrated.chips;

    if (!migrated.badges) {
      migrated.badges = [];

      if (migrated.update_section?.enabled !== false && migrated.update_section?.entity) {
        migrated.badges.push({
          type: 'update',
          entity_id: migrated.update_section.entity,
          label: migrated.update_section.label || this._t('common.update'),
          tap_action: migrated.update_section.tap_action || { action: 'more-info' },
        });
      }

      if (migrated.action_button?.enabled !== false && migrated.action_button?.entity) {
        migrated.badges.push({
          type: 'action',
          icon: migrated.action_button.icon || 'mdi:restart',
          label: migrated.action_button.label || this._t('common.reboot'),
          entity_id: migrated.action_button.entity,
          tap_action: migrated.action_button.tap_action || { action: 'call-service' },
        });
      }
    }

    delete migrated.update_section;
    delete migrated.action_button;

    return migrated;
  }

  protected updated(): void {
    if (this._selectedTab === 'cards') {
      this._hideStackTitle();
    }
  }

  private _hideStackTitle(): void {
    requestAnimationFrame(() => {
      const editor = this.shadowRoot?.querySelector('hui-stack-card-editor');
      if (editor?.shadowRoot) {
        const form = editor.shadowRoot.querySelector('ha-form');
        if (form) {
          (form as HTMLElement).style.display = 'none';
        }
      }
    });
  }

  private _updateConfig(changes: Partial<UniversalDeviceCardConfig>): void {
    const newConfig = { ...this._config, ...changes };
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _handleCardsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (ev.detail.config?.cards) {
      this._updateConfig({ cards: ev.detail.config.cards });
    }
  }

  private _handleTabSelected(ev: CustomEvent): void {
    const tabId = ev.detail.name;
    if (TABS.some((t) => t.id === tabId)) {
      this._selectedTab = tabId;
    }
  }

  private _addBadge(): void {
    const badges = [...(this._config.badges || [])];
    badges.push({
      type: 'entity',
      icon: 'mdi:badge-account',
      label: '',
      entity_id: '',
      tap_action: { action: 'more-info' },
    });
    this._updateConfig({ badges });
  }

  private _removeBadge(index: number): void {
    const badges = [...(this._config.badges || [])];
    badges.splice(index, 1);
    this._updateConfig({ badges });
  }

  private _updateBadge(index: number, changes: Partial<BadgeConfig>): void {
    const badges = [...(this._config.badges || [])];
    badges[index] = { ...badges[index], ...changes };
    this._updateConfig({ badges });
  }

  private _renderBadgeEditor(badge: BadgeConfig, index: number) {
    const badgeTypes = BADGE_TYPES.map((t) => ({
      value: t.value,
      label: this._t(t.label_key),
    }));

    return html`
      <div class="badge-item">
        <div class="badge-item-header">
          <ha-icon .icon=${badge.icon || 'mdi:badge-account'}></ha-icon>
          <span>${this._t('editor.badges')} ${index + 1}</span>
          <ha-icon-button .label=${'Remove'} @click=${() => this._removeBadge(index)}>
            <ha-icon icon="mdi:close"></ha-icon>
          </ha-icon-button>
        </div>

        <ha-selector
          .hass=${this.hass}
          .label=${this._t('editor.badge_type')}
          .value=${badge.type}
          .selector=${{ select: { options: badgeTypes } }}
          @value-changed=${(e: CustomEvent) => this._updateBadge(index, { type: e.detail.value })}
        ></ha-selector>

        <ha-textfield
          .label=${this._t('editor.badge_label')}
          .value=${badge.label || ''}
          @change=${(e: Event) => this._updateBadge(index, { label: (e.target as HTMLInputElement).value })}
        ></ha-textfield>

        <ha-icon-picker
          .hass=${this.hass}
          .label=${this._t('editor.badge_icon')}
          .value=${badge.icon || ''}
          @value-changed=${(e: CustomEvent) => this._updateBadge(index, { icon: e.detail.value })}
        ></ha-icon-picker>

        ${badge.type !== 'template'
          ? html`
              <ha-entity-picker
                .hass=${this.hass}
                .label=${this._t('editor.badge_entity')}
                .value=${badge.entity_id || ''}
                @value-changed=${(e: CustomEvent) => this._updateBadge(index, { entity_id: e.detail.value })}
              ></ha-entity-picker>
            `
          : html`
              <ha-textfield
                .label=${this._t('editor.badge_template')}
                .value=${badge.template || ''}
                @change=${(e: Event) => this._updateBadge(index, { template: (e.target as HTMLInputElement).value })}
              ></ha-textfield>
            `}

        <ha-expansion-panel .header=${this._t('editor.badge_visibility')}>
          <div class="visibility-fields">
            <ha-entity-picker
              .hass=${this.hass}
              .label=${this._t('editor.badge_show_when_entity')}
              .value=${badge.show_when?.entity_id || ''}
              @value-changed=${(e: CustomEvent) =>
                this._updateBadge(index, { show_when: { ...badge.show_when, entity_id: e.detail.value } })}
            ></ha-entity-picker>
            <ha-textfield
              .label=${this._t('editor.badge_show_when_state')}
              .value=${badge.show_when?.state || ''}
              @change=${(e: Event) =>
                this._updateBadge(index, { show_when: { ...badge.show_when, state: (e.target as HTMLInputElement).value } })}
            ></ha-textfield>
          </div>
        </ha-expansion-panel>
      </div>
    `;
  } 

  private _getDeviceName(): string {
    if (!this.hass || !this._config?.device_id) return '';
    const device = this.hass.devices?.[this._config.device_id];
    if (!device) return '';
    return device.name_by_user || device.name || '';
  }

  private _renderSettingsTab() {
    const deviceName = this._getDeviceName();

    return html`
      <div class="tab-content"> 
        <ha-textfield
          .label=${this._t('editor.card_name')}
          .placeholder=${deviceName || this._t('editor.card_name_placeholder')}
          .value=${this._config.name || ''}
          @change=${(e: Event) => this._updateConfig({ name: (e.target as HTMLInputElement).value })}
        ></ha-textfield>
        ${!this._config.name
          ? html`<div class="hint">${this._t('editor.card_name_hint', { name: deviceName || 'Device' })}</div>`
          : nothing}

        <ha-device-picker
          .hass=${this.hass}
          .value=${this._config.device_id || ''}
          @value-changed=${(e: CustomEvent) => this._updateConfig({ device_id: e.detail.value })}
        ></ha-device-picker>

        <ha-icon-picker
          .hass=${this.hass}
          .label=${this._t('editor.icon')}
          .value=${this._config.icon || 'mdi:devices'}
          @value-changed=${(e: CustomEvent) => this._updateConfig({ icon: e.detail.value })}
        ></ha-icon-picker>
      </div>
    `;
  }

  private _renderBadgesTab() {
    const badges = this._config.badges || [];

    return html`
      <div class="tab-content">
        <div class="tab-header">
          <ha-button @click=${this._addBadge}>
            <ha-icon icon="mdi:plus" slot="icon"></ha-icon>
            ${this._t('editor.add_badge')}
          </ha-button>
        </div>
        ${badges.length === 0
          ? html`<div class="empty-state">No badges configured. Click "Add Badge" to create one.</div>`
          : badges.map((badge, i) => this._renderBadgeEditor(badge, i))}
      </div>
    `;
  }

  private _renderCardsTab() {
    return html`
      <div class="tab-content">
        <hui-stack-card-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          ._config=${{ cards: this._config.cards || [] }}
          @config-changed=${this._handleCardsChanged}
        ></hui-stack-card-editor>
      </div>
    `;
  }

  render() {
    if (!this._config) {
      return html`<div class="loading">${this._t('editor.loading')}</div>`;
    }

    return html`
      <div class="editor">
        <ha-tab-group @wa-tab-show=${this._handleTabSelected}>
          ${TABS.map(
            (tab) => html`
              <ha-tab-group-tab
                slot="nav"
                .id=${tab.id}
                .panel=${tab.id}
                .active=${this._selectedTab === tab.id}
              >
                <div class="tab-label">
                  ${this._t(`editor.tabs.${tab.id}`) || tab.label}
                </div>
              </ha-tab-group-tab>
            `
          )}
        </ha-tab-group>

        ${this._selectedTab === 'settings' ? this._renderSettingsTab() : nothing}
        ${this._selectedTab === 'badges' ? this._renderBadgesTab() : nothing}
        ${this._selectedTab === 'cards' ? this._renderCardsTab() : nothing}
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        display: flex;
        flex-direction: column;
      }

      .loading {
        padding: 16px;
        text-align: center;
        color: var(--secondary-text-color);
      }

      /* Табы на всю ширину как в go-hass-cards */
      ha-tab-group {
        --ha-tab-group-tab-flex: 1;
      }

      .tab-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 100%;
      }

      .tab-content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .tab-header {
        display: flex;
        justify-content: flex-end;
      }

      .hint {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-style: italic;
        margin-top: -8px;
      }

      .empty-state {
        text-align: center;
        padding: 24px;
        color: var(--secondary-text-color);
        font-style: italic;
      }

      .badge-item {
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .badge-item-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
      }

      .badge-item-header ha-icon-button {
        margin-left: auto;
      }

      .visibility-fields {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 8px;
      }

      ha-textfield {
        display: block;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'universal-device-card-editor': UniversalDeviceCardEditor;
  }
}