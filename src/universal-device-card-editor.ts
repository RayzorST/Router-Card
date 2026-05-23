// src/editor/universal-device-card-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fireEvent } from 'custom-card-helpers';
import type { UniversalDeviceCardConfig } from './types/config';
import { getLocalizedStringForHass } from './localization';

@customElement('universal-device-card-editor')
export class UniversalDeviceCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @property({ attribute: false }) public lovelace?: any;
  
  @state() private _config!: UniversalDeviceCardConfig;

  private _localize(key: string, params?: Record<string, string>): string {
    return getLocalizedStringForHass(this.hass, key, params);
  }

  public setConfig(config: UniversalDeviceCardConfig): void {
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

  render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const updateSection = this._config.update_section!;
    const actionButton = this._config.action_button!;

    return html`
      <div class="editor">
        <ha-device-picker
          .hass=${this.hass}
          .value=${this._config.device_id || ''}
          @value-changed=${(e: any) => this._updateConfig({ device_id: e.detail.value })}
        ></ha-device-picker>

        <ha-textfield
          label="Title"
          .value=${this._config.name || ''}
          @change=${(e: any) => this._updateConfig({ name: e.target.value })}
        ></ha-textfield>
        
        <ha-icon-picker
          .hass=${this.hass}
          .value=${this._config.icon || 'mdi:devices'}
          @value-changed=${(e: any) => this._updateConfig({ icon: e.detail.value })}
        ></ha-icon-picker>

        <ha-switch
          .checked=${updateSection.enabled !== false}
          @change=${(e: any) => this._updateConfig({ 
            update_section: { ...updateSection, enabled: e.target.checked } 
          })}
        ></ha-switch>
        
        ${updateSection.enabled ? html`
          <ha-entity-picker
            .hass=${this.hass}
            .value=${updateSection.entity || ''}
            @value-changed=${(e: any) => this._updateConfig({ 
              update_section: { ...updateSection, entity: e.detail.value } 
            })}
          ></ha-entity-picker>
        ` : ''}

        <ha-switch
          .checked=${actionButton.enabled !== false}
          @change=${(e: any) => this._updateConfig({ 
            action_button: { ...actionButton, enabled: e.target.checked } 
          })}
        ></ha-switch>
        
        ${actionButton.enabled ? html`
          <ha-entity-picker
            .hass=${this.hass}
            .value=${actionButton.entity || ''}
            @value-changed=${(e: any) => this._updateConfig({ 
              action_button: { ...actionButton, entity: e.detail.value } 
            })}
          ></ha-entity-picker>
        ` : ''}

        <!-- Просто используем, без всяких загрузок -->
        <hui-stack-card-editor
          .hass=${this.hass}
          .lovelace=${this.lovelace}
          ._config=${{ cards: this._config.cards || [] }}
          @config-changed=${this._handleCardsChanged}
        ></hui-stack-card-editor>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
      }
    `;
  }
}