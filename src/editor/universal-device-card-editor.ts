// src/editor/universal-device-card-editor.ts
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardEditor, fireEvent } from 'custom-card-helpers';
import { UniversalDeviceCardConfig } from '../types/config';
import { getLocalizedStringForHass } from '../localization';
import { loadEditorComponents } from '../utils/editor-utils';
import './sections/cards-section';

const ICONS = {
  DEVICE: 'mdi:devices',
  RESTART: 'mdi:restart',
  UPDATE: 'mdi:update',
};

type NestedConfigKey = 'update_section' | 'action_button';

@customElement('universal-device-card-editor')
export class UniversalDeviceCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass!: any;
  
  @state() private _config!: UniversalDeviceCardConfig;
  @state() private _componentsLoaded = false;

  private _localize(key: string, params?: Record<string, string>): string {
    return getLocalizedStringForHass(this.hass, key, params);
  }

  public async connectedCallback() {
    super.connectedCallback();
    if (!this._componentsLoaded) {
      await loadEditorComponents();
      this._componentsLoaded = true;
      this.requestUpdate();
    }
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

  private _updateConfig(key: keyof UniversalDeviceCardConfig, value: any): void {
    const newConfig = { ...this._config, [key]: value };
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _updateNested<K extends NestedConfigKey>(
    section: K, 
    field: string, 
    value: any
  ): void {
    const newConfig = { ...this._config };
    const currentSection = newConfig[section] || {};
    
    const updatedSection = {
      ...currentSection,
      [field]: value
    };
    
    (newConfig[section] as any) = updatedSection;
    this._config = newConfig;
    fireEvent(this, 'config-changed', { config: newConfig });
  }

  private _handleCardsChanged(e: CustomEvent): void {
    this._updateConfig('cards', e.detail.cards);
  }

  protected render() {
    if (!this.hass || !this._config || !this._componentsLoaded) {
      return html`<div class="loading">Loading...</div>`;
    }

    const updateSection = this._config.update_section!;
    const actionButton = this._config.action_button!;

    return html`
      <div class="editor">
        <div class="section">
          <div class="section-header">
            <ha-icon icon="${ICONS.DEVICE}"></ha-icon>
            <h3>${this._localize('editor.sections.device')}</h3>
          </div>
          <ha-device-picker
            .hass=${this.hass}
            .value=${this._config.device_id || ''}
            @value-changed=${(e: any) => this._updateConfig('device_id', e.detail.value)}
          ></ha-device-picker>
        </div>

        <div class="section">
          <div class="section-header">
            <ha-icon icon="mdi:palette"></ha-icon>
            <h3>${this._localize('editor.sections.display')}</h3>
          </div>
          <ha-textfield
            .value=${this._config.name || ''}
            @input=${(e: any) => this._updateConfig('name', e.target.value)}
            label="${this._localize('editor.fields.custom_title')}"
          ></ha-textfield>
          <ha-icon-picker
            .value=${this._config.icon || 'mdi:devices'}
            @value-changed=${(e: any) => this._updateConfig('icon', e.detail.value)}
          ></ha-icon-picker>
        </div>

        <div class="section">
          <div class="section-header">
            <ha-icon icon="${ICONS.UPDATE}"></ha-icon>
            <h3>${this._localize('editor.sections.update_badge')}</h3>
            <ha-switch
              .checked=${updateSection.enabled !== false}
              @change=${(e: any) => this._updateNested('update_section', 'enabled', e.target.checked)}
            ></ha-switch>
          </div>
          ${updateSection.enabled ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${updateSection.entity || ''}
              @value-changed=${(e: any) => this._updateNested('update_section', 'entity', e.detail.value)}
              include-domains='["update", "binary_sensor"]'
            ></ha-entity-picker>
          ` : ''}
        </div>

        <div class="section">
          <div class="section-header">
            <ha-icon icon="${ICONS.RESTART}"></ha-icon>
            <h3>${this._localize('editor.sections.reboot_badge')}</h3>
            <ha-switch
              .checked=${actionButton.enabled !== false}
              @change=${(e: any) => this._updateNested('action_button', 'enabled', e.target.checked)}
            ></ha-switch>
          </div>
          ${actionButton.enabled ? html`
            <ha-entity-picker
              .hass=${this.hass}
              .value=${actionButton.entity || ''}
              @value-changed=${(e: any) => this._updateNested('action_button', 'entity', e.detail.value)}
              include-domains='["button", "script"]'
            ></ha-entity-picker>
          ` : ''}
        </div>

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
        background: var(--card-background-color);
        border-radius: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .section-header ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-color);
      }

      .section-header h3 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        flex: 1;
      }

      ha-textfield, ha-icon-picker, ha-entity-picker, ha-device-picker {
        width: 100%;
      }

      .loading {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'universal-device-card-editor': UniversalDeviceCardEditor;
  }
}