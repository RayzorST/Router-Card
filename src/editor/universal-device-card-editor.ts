import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { UniversalDeviceCardConfig } from '../types/config';
import { getLocalizedStringForHass } from '../localization';
import { loadEditorComponents } from '../utils/editor-utils';
import './sections/cards-section';

@customElement('universal-device-card-editor')
export class UniversalDeviceCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass!: any;
  
  @state() private _config!: UniversalDeviceCardConfig;
  @state() private _componentsLoaded = false;

  private _localize(key: string, params?: Record<string, string>): string {
    return getLocalizedStringForHass(this.hass, key, params);
  }

  async connectedCallback() {
    super.connectedCallback();
    if (!this._componentsLoaded) {
      await loadEditorComponents();
      this._componentsLoaded = true;
      this.requestUpdate();
    }
  }

  public setConfig(config: UniversalDeviceCardConfig): void {
    // Миграция старых настроек
    const migratedConfig = { ...config };
    delete migratedConfig.controller;
    
    if ((config as any).reboot_button && !config.action_button) {
      migratedConfig.action_button = (config as any).reboot_button;
      delete (migratedConfig as any).reboot_button;
    }
    
    this._config = {
      type: migratedConfig.type,
      name: migratedConfig.name || '',
      icon: migratedConfig.icon || 'mdi:devices',
      device_id: migratedConfig.device_id || '',
      update_section: {
        enabled: true,
        entity: '',
        label: this._localize('common.update'),
        tap_action: { action: 'more-info' },
        ...migratedConfig.update_section,
      },
      action_button: {
        enabled: false,
        entity: '',
        confirmation: true,
        icon: 'mdi:restart',
        label: this._localize('common.reboot'),
        tap_action: { action: 'call-service' },
        ...migratedConfig.action_button,
      },
      cards: migratedConfig.cards || [],
    };
  }

  private _updateConfig(key: keyof UniversalDeviceCardConfig, value: any): void {
    const newConfig = { ...this._config, [key]: value };
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _handleCardsChanged(e: CustomEvent): void {
    this._updateConfig('cards', e.detail.cards);
  }

  render() {
    if (!this.hass || !this._config || !this._componentsLoaded) {
      return html`<div class="loading">Loading editor...</div>`;
    }

    const updateSection = this._config.update_section!;
    const actionButton = this._config.action_button!;

    return html`
      <div class="editor">
        <!-- Device Picker -->
        <div class="section">
          <h3>Device</h3>
          <ha-device-picker
            .hass=${this.hass}
            .value=${this._config.device_id || ''}
            @value-changed=${(e: any) => this._updateConfig('device_id', e.detail.value)}
          ></ha-device-picker>
        </div>

        <!-- Display Settings -->
        <div class="section">
          <h3>Display</h3>
          <ha-textfield
            .value=${this._config.name || ''}
            @input=${(e: any) => this._updateConfig('name', e.target.value)}
            label="Title (optional)"
          ></ha-textfield>
          <ha-icon-picker
            .value=${this._config.icon || 'mdi:devices'}
            @value-changed=${(e: any) => this._updateConfig('icon', e.detail.value)}
          ></ha-icon-picker>
        </div>

        <!-- Update Section -->
        <div class="section">
          <h3>Update Badge</h3>
          <ha-switch
            .checked=${updateSection.enabled !== false}
            @change=${(e: any) => this._updateConfig('update_section', { ...updateSection, enabled: e.target.checked })}
          ></ha-switch>
          ${updateSection.enabled ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${updateSection.entity || ''}
              @value-changed=${(e: any) => this._updateConfig('update_section', { ...updateSection, entity: e.detail.value })}
            ></ha-entity-picker>
          ` : ''}
        </div>

        <!-- Action Button -->
        <div class="section">
          <h3>Action Button</h3>
          <ha-switch
            .checked=${actionButton.enabled !== false}
            @change=${(e: any) => this._updateConfig('action_button', { ...actionButton, enabled: e.target.checked })}
          ></ha-switch>
          ${actionButton.enabled ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${actionButton.entity || ''}
              @value-changed=${(e: any) => this._updateConfig('action_button', { ...actionButton, entity: e.detail.value })}
            ></ha-entity-picker>
          ` : ''}
        </div>

        <!-- Cards Section -->
        <cards-section
          .hass=${this.hass}
          .cards=${this._config.cards || []}
          @cards-changed=${this._handleCardsChanged}
        ></cards-section>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 12px;
        border: 1px solid var(--divider-color);
      }
      h3 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'universal-device-card-editor': UniversalDeviceCardEditor;
  }
}