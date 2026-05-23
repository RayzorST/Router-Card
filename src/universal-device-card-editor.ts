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
  @state() private _editorLoaded = false;

  private _localize(key: string, params?: Record<string, string>): string {
    return getLocalizedStringForHass(this.hass, key, params);
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

  protected firstUpdated(): void {
    this._loadStackEditor();
  }

  private async _loadStackEditor(): Promise<void> {
    try {
      // Загружаем необходимые компоненты HA
      await Promise.all([
        customElements.whenDefined('hui-stack-card-editor'),
        customElements.whenDefined('hui-card-picker'),
        customElements.whenDefined('ha-device-picker'),
        customElements.whenDefined('ha-entity-picker'),
        customElements.whenDefined('ha-icon-picker'),
        customElements.whenDefined('ha-textfield'),
        customElements.whenDefined('ha-switch'),
      ]);
      this._editorLoaded = true;
    } catch (error) {
      console.error('Failed to load editor components:', error);
      this._editorLoaded = true; // Показываем что есть
    }
  }

  private _updateConfig(changes: Partial<UniversalDeviceCardConfig>): void {
    const newConfig = { ...this._config, ...changes };
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _handleCardsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (ev.detail.config && ev.detail.config.cards) {
      this._updateConfig({ cards: ev.detail.config.cards });
    }
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div style="padding: 16px;">Loading editor...</div>`;
    }

    const updateSection = this._config.update_section!;
    const actionButton = this._config.action_button!;

    return html`
      <div style="padding: 16px; display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Device Picker -->
        <div class="card-config">
          <ha-device-picker
            .hass=${this.hass}
            .label=${'Device'}
            .value=${this._config.device_id || ''}
            @value-changed=${(e: any) => this._updateConfig({ device_id: e.detail.value })}
          ></ha-device-picker>
        </div>

        <!-- Display Settings -->
        <div class="card-config">
          <ha-textfield
            .label=${'Title'}
            .value=${this._config.name || ''}
            @change=${(e: any) => this._updateConfig({ name: e.target.value })}
          ></ha-textfield>
          
          <ha-icon-picker
            .hass=${this.hass}
            .label=${'Icon'}
            .value=${this._config.icon || 'mdi:devices'}
            @value-changed=${(e: any) => this._updateConfig({ icon: e.detail.value })}
          ></ha-icon-picker>
        </div>

        <!-- Update Section -->
        <div class="card-config">
          <ha-switch
            .checked=${updateSection.enabled !== false}
            @change=${(e: any) => this._updateConfig({ 
              update_section: { ...updateSection, enabled: e.target.checked } 
            })}
          >
            Update Badge
          </ha-switch>
          
          ${updateSection.enabled ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .label=${'Update Entity'}
              .value=${updateSection.entity || ''}
              @value-changed=${(e: any) => this._updateConfig({ 
                update_section: { ...updateSection, entity: e.detail.value } 
              })}
            ></ha-entity-picker>
          ` : ''}
        </div>

        <!-- Action Button -->
        <div class="card-config">
          <ha-switch
            .checked=${actionButton.enabled !== false}
            @change=${(e: any) => this._updateConfig({ 
              action_button: { ...actionButton, enabled: e.target.checked } 
            })}
          >
            Action Button
          </ha-switch>
          
          ${actionButton.enabled ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .label=${'Action Entity'}
              .value=${actionButton.entity || ''}
              @value-changed=${(e: any) => this._updateConfig({ 
                action_button: { ...actionButton, entity: e.detail.value } 
              })}
            ></ha-entity-picker>
          ` : ''}
        </div>

        <!-- Cards Section -->
        <div class="card-config">
          ${this._editorLoaded ? html`
            <hui-stack-card-editor
              .hass=${this.hass}
              .lovelace=${this.lovelace}
              ._config=${{ cards: this._config.cards || [] }}
              @config-changed=${this._handleCardsChanged}
            ></hui-stack-card-editor>
          ` : html`
            <div style="padding: 16px; text-align: center;">
              Loading card editor...
            </div>
          `}
        </div>
        
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      
      ha-textfield {
        width: 100%;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'universal-device-card-editor': UniversalDeviceCardEditor;
  }
}