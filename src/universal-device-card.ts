import { customElement, property, state } from 'lit/decorators.js';
import { css, html, LitElement, type CSSResultGroup } from 'lit';
import type { HASSDomEvent } from '@hass/common/dom/fire_event';
import type { LovelaceConfig } from '@hass/data/lovelace/config/types';
import type { StackCardConfig } from '@hass/panels/lovelace/cards/types';
import type { ConfigChangedEvent } from '@hass/panels/lovelace/editor/hui-element-editor';
import type { LovelaceCardEditor } from '@hass/panels/lovelace/types';
import type { HomeAssistant } from '@hass/types';
import type { UniversalDeviceCardConfig, BadgeConfig } from './types/config';
import { editorCardName, getDefaultConfig, resolveConfigWithDeprecations } from './utils/card-utils';

const tabs = [
  { id: 'settings', label: 'Settings', icon: 'mdi:cog-outline' },
  { id: 'badges', label: 'Badges', icon: 'mdi:badge-account-outline' },
  { id: 'cards', label: 'Cards', icon: 'mdi:card-multiple-outline' },
] as const;

@customElement(editorCardName)
export class UniversalDeviceCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @property({ attribute: false }) public lovelace?: LovelaceConfig;

  @state() public config: UniversalDeviceCardConfig | undefined;
  @state() protected _selectedTab: (typeof tabs)[number] = tabs[0];

  setConfig(config: UniversalDeviceCardConfig) {
    this.config = resolveConfigWithDeprecations(config);
  }

  protected render() {
    return html`
      <div class="universal-device-card-editor">
        <div class="toolbar">
          <ha-tab-group @wa-tab-show=${this._handleTabChange}>
            ${tabs.map(
              (tab) => html`
                <ha-tab-group-tab
                  slot="nav"
                  .id=${tab.id}
                  .panel=${tab.id}
                  .active=${this._selectedTab === tab}
                >
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <ha-icon icon="${tab.icon}"></ha-icon>
                    ${tab.label}
                  </div>
                </ha-tab-group-tab>
              `,
            )}
          </ha-tab-group>
        </div>
        ${this.renderContent()}
      </div>
    `;
  }

  protected renderContent() {
    const config = { ...getDefaultConfig(this.hass), ...this.config };

    switch (this._selectedTab.id) {
      case 'settings':
        return html`
          <div class="settings">
            <ha-device-picker
              label="Device"
              .hass=${this.hass}
              .value=${config.device_id}
              @value-changed=${this._updateDevice}
            ></ha-device-picker>
            
            <ha-textfield
              label="Custom Name"
              placeholder="Override device name"
              .value=${config.name || ''}
              @input=${this._updateName}
            ></ha-textfield>
            
            <ha-icon-picker
              label="Icon"
              .hass=${this.hass}
              .value=${config.icon}
              @value-changed=${this._updateIcon}
            ></ha-icon-picker>
          </div>
        `;

      case 'badges':
        return html`
          <div class="badges-editor">
            ${(config.badges || []).map(
              (badge, index) => html`
                <div class="badge-item">
                  <ha-select
                    label="Badge Type"
                    .value=${badge.type || 'action'}
                    @selected=${(e: CustomEvent) => this._updateBadge(index, { type: e.detail.value })}
                  >
                    <ha-list-item value="action">Action</ha-list-item>
                    <ha-list-item value="update">Update</ha-list-item>
                  </ha-select>
                  
                  <ha-textfield
                    label="Label"
                    .value=${badge.label || ''}
                    @input=${(e: InputEvent) => this._updateBadge(index, { 
                      label: (e.target as HTMLInputElement).value 
                    })}
                  ></ha-textfield>
                  
                  <ha-entity-picker
                    label="Entity"
                    .hass=${this.hass}
                    .value=${badge.entity_id || ''}
                    @value-changed=${(e: CustomEvent) => this._updateBadge(index, { 
                      entity_id: e.detail.value 
                    })}
                  ></ha-entity-picker>
                  
                  <ha-icon-picker
                    label="Icon"
                    .hass=${this.hass}
                    .value=${badge.icon || ''}
                    @value-changed=${(e: CustomEvent) => this._updateBadge(index, { 
                      icon: e.detail.value 
                    })}
                  ></ha-icon-picker>

                  <ha-icon-button
                    class="remove-badge"
                    .label=${'Remove badge'}
                    @click=${() => this._removeBadge(index)}
                  >
                    <ha-icon icon="mdi:delete"></ha-icon>
                  </ha-icon-button>
                </div>
              `,
            )}
            
            <ha-button @click=${this._addBadge}>
              <ha-icon icon="mdi:plus"></ha-icon>
              Add Badge
            </ha-button>
          </div>
        `;

      case 'cards':
        return html`
          <hui-stack-card-editor
            @config-changed=${this._updateCards}
            ._config=${{ cards: config.cards || [] }}
            .hass=${this.hass}
            .lovelace=${this.lovelace}
            .firstUpdated=${this._hideTitleForm}
          ></hui-stack-card-editor>
        `;
    }
  }

  private _handleTabChange(ev: CustomEvent) {
    const tab = tabs.find((t) => t.id === ev.detail.name)!;
    if (tab) this._selectedTab = tab;
  }

  private _hideTitleForm() {
    const titleForm = this.shadowRoot?.querySelector('ha-form');
    if (titleForm) titleForm.style.display = 'none';
  }

  private _updateDevice(ev: CustomEvent) {
    this._configChanged({ device_id: ev.detail.value });
  }

  private _updateName(ev: InputEvent) {
    this._configChanged({ name: (ev.target as HTMLInputElement).value });
  }

  private _updateIcon(ev: CustomEvent) {
    this._configChanged({ icon: ev.detail.value });
  }

  private _updateBadge(index: number, changes: Partial<BadgeConfig>) {
    const badges = [...(this.config?.badges || [])];
    badges[index] = { ...badges[index], ...changes };
    this._configChanged({ badges });
  }

  private _addBadge() {
    const badges = [...(this.config?.badges || []), { type: 'action' as const }];
    this._configChanged({ badges });
  }

  private _removeBadge(index: number) {
    const badges = this.config?.badges?.filter((_, i) => i !== index) || [];
    this._configChanged({ badges });
  }

  private _updateCards(ev: HASSDomEvent<ConfigChangedEvent<StackCardConfig>>) {
    ev.stopPropagation();
    this._configChanged({ cards: ev.detail.config.cards });
  }

  private _configChanged(config: Partial<UniversalDeviceCardConfig>) {
    const event = new CustomEvent('config-changed', {
      bubbles: true,
      composed: true,
      detail: { config: resolveConfigWithDeprecations({ ...this.config!, ...config }) },
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResultGroup {
    return css`
      .universal-device-card-editor {
        .settings {
          display: flex;
          flex-direction: column;
          margin-top: 16px;
          gap: 16px;

          > * {
            width: 100%;
          }
        }

        .badges-editor {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;

          .badge-item {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding: 12px;
            border: 1px solid var(--divider-color);
            border-radius: 8px;
            position: relative;

            .remove-badge {
              position: absolute;
              top: 4px;
              right: 4px;
            }
          }
        }
      }
    `;
  }
}