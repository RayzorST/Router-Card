import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardEditor } from 'custom-card-helpers';

interface TapActionConfig {
  action: 'more-info' | 'toggle' | 'call-service' | 'navigate' | 'url' | 'none';
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: Record<string, any>;
}

interface SensorConfig {
  entity: string;
  name: string;
  unit?: string;
  icon?: string;
  display_type?: 'bar' | 'number' | 'graph' | 'badge';
  min?: number;
  max?: number;
  tap_action?: TapActionConfig;
}

interface StatusSectionConfig {
  enabled: boolean;
  left_entity?: string;
  left_label?: string;
  right_entity?: string;
  right_label?: string;
  tap_action?: TapActionConfig;
}

interface UpdateSectionConfig {
  enabled: boolean;
  entity?: string;
  label?: string;
  tap_action?: TapActionConfig;
}

interface RebootButtonConfig {
  enabled: boolean;
  service?: string;
  service_data?: Record<string, any>;
  confirmation?: boolean;
  label?: string;
  icon?: string;
}

interface RouterCardEditorConfig {
  type: string;
  name?: string;
  icon?: string;
  controller?: boolean;
  theme?: string;
  update_section?: UpdateSectionConfig;
  status_section?: StatusSectionConfig;
  reboot_button?: RebootButtonConfig;
  top_sensors?: SensorConfig[];
  bottom_sensors?: SensorConfig[];
  [key: string]: any;
}

const VALID_CONFIG_KEYS = [
  'type', 'name', 'icon', 'controller', 'theme',
  'update_section', 'status_section', 'reboot_button', 'top_sensors', 'bottom_sensors',
];

@customElement('router-card-editor')
export class RouterCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass!: any;
  @state() private _config!: RouterCardEditorConfig;
  @state() private _activeTab: 'general' | 'status' | 'top' | 'bottom' = 'general';

  public setConfig(config: RouterCardEditorConfig): void {
    this._config = {
      ...config,
      update_section: config.update_section || {
        enabled: true,
        entity: '',
        label: 'Update Available',
        tap_action: { action: 'more-info' },
      },
      status_section: config.status_section || {
        enabled: true,
        left_entity: '',
        left_label: 'Status',
        right_entity: '',
        right_label: 'IP',
        tap_action: { action: 'more-info' },
      },
      reboot_button: config.reboot_button || {
        enabled: false,
        service: 'button.router_reboot_press',
        confirmation: true,
        label: '',
        icon: 'mdi:restart',
      },
      top_sensors: config.top_sensors || [],
      bottom_sensors: config.bottom_sensors || [],
    };
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    const updateSection = this._config.update_section || {
      enabled: true,
      entity: '',
      label: 'Update Available',
      tap_action: { action: 'more-info' },
    };

    const statusSection = this._config.status_section || {
      enabled: true,
      left_entity: '',
      left_label: 'Status',
      right_entity: '',
      right_label: 'IP',
      tap_action: { action: 'more-info' },
    };

    const rebootConfig = this._config.reboot_button || {
      enabled: false,
      service: 'button.router_reboot_press',
      confirmation: true,
      label: '',
      icon: 'mdi:restart',
    };

    return html`
      <div class="editor">
        <!-- Tabs -->
        <div class="tabs">
          <button class="tab ${this._activeTab === 'general' ? 'active' : ''}" @click=${() => this._setActiveTab('general')}>
            <ha-icon icon="mdi:cog"></ha-icon> General
          </button>
          <button class="tab ${this._activeTab === 'status' ? 'active' : ''}" @click=${() => this._setActiveTab('status')}>
            <ha-icon icon="mdi:wan"></ha-icon> Status
          </button>
          <button class="tab ${this._activeTab === 'top' ? 'active' : ''}" @click=${() => this._setActiveTab('top')}>
            <ha-icon icon="mdi:view-grid"></ha-icon> Top (Cards)
          </button>
          <button class="tab ${this._activeTab === 'bottom' ? 'active' : ''}" @click=${() => this._setActiveTab('bottom')}>
            <ha-icon icon="mdi:format-list-bulleted"></ha-icon> Bottom (List)
          </button>
        </div>

        <!-- General Tab -->
        ${this._activeTab === 'general' ? html`
          <div class="tab-content">
            <div class="editor-row">
              <div class="editor-item">
                <ha-textfield
                  .value=${this._config.name || ''}
                  .configValue=${'name'}
                  @input=${this._valueChanged}
                  label="Card Name"
                ></ha-textfield>
              </div>
              <div class="editor-item">
                <ha-icon-picker
                  .value=${this._config.icon || 'mdi:router-wireless'}
                  .configValue=${'icon'}
                  @value-changed=${this._valueChanged}
                  label="Custom Icon"
                ></ha-icon-picker>
              </div>
            </div>
            <div class="editor-row">
              <ha-formfield label="Controller Mode">
                <ha-switch
                  .checked=${this._config.controller !== false}
                  .configValue=${'controller'}
                  @change=${this._valueChanged}
                ></ha-switch>
              </ha-formfield>
              <div class="editor-item" style="max-width: 200px;">
                <ha-select
                  .value=${this._config.theme || 'default'}
                  .configValue=${'theme'}
                  @selected=${this._valueChanged}
                  @closed=${(ev: any) => ev.stopPropagation()}
                  label="Theme"
                >
                  <mwc-list-item value="default">Default</mwc-list-item>
                  <mwc-list-item value="dark">Dark</mwc-list-item>
                  <mwc-list-item value="light">Light</mwc-list-item>
                </ha-select>
              </div>
            </div>
            
            <!-- Update Section in General Tab -->
            <div class="section-divider">
              <span class="section-title">Update Section</span>
            </div>
            <div class="editor-row">
              <ha-formfield label="Enable Update Section">
                <ha-switch
                  .checked=${updateSection.enabled !== false}
                  .configValue=${'update_section'}
                  .fieldValue=${'enabled'}
                  @change=${this._nestedValueChanged}
                ></ha-switch>
              </ha-formfield>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${updateSection.entity || ''}
                  .configValue=${'update_section'}
                  .fieldValue=${'entity'}
                  @value-changed=${this._nestedValueChanged}
                  label="Update Entity"
                  allow-custom-entity
                  include-domains='["update", "binary_sensor"]'
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-textfield
                  .value=${updateSection.label || 'Update Available'}
                  .configValue=${'update_section'}
                  .fieldValue=${'label'}
                  @input=${this._nestedValueChanged}
                  label="Label"
                ></ha-textfield>
              </div>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-select
                  .value=${updateSection.tap_action?.action || 'more-info'}
                  .configValue=${'update_section'}
                  .fieldValue=${'tap_action'}
                  @selected=${this._tapActionChanged}
                  @closed=${(ev: any) => ev.stopPropagation()}
                  label="Tap Action"
                >
                  <mwc-list-item value="more-info">More Info</mwc-list-item>
                  <mwc-list-item value="navigate">Navigate</mwc-list-item>
                  <mwc-list-item value="url">URL</mwc-list-item>
                  <mwc-list-item value="call-service">Call Service</mwc-list-item>
                  <mwc-list-item value="none">None</mwc-list-item>
                </ha-select>
              </div>
            </div>
            
            <!-- Reboot Button Section in General Tab -->
            <div class="section-divider">
            <span class="section-title">Reboot Button</span>
            </div>
            <div class="editor-row">
            <ha-formfield label="Enable Reboot Button">
                <ha-switch
                .checked=${rebootConfig.enabled !== false}
                .configValue=${'reboot_button'}
                .fieldValue=${'enabled'}
                @change=${this._nestedValueChanged}
                ></ha-switch>
            </ha-formfield>
            </div>
            <div class="editor-row">
            <div class="editor-item">
                <ha-textfield
                .value=${rebootConfig.service || 'button.router_reboot_press'}
                .configValue=${'reboot_button'}
                .fieldValue=${'service'}
                @input=${this._nestedValueChanged}
                label="Service"
                ></ha-textfield>
            </div>
            <ha-formfield label="Show Confirmation">
                <ha-switch
                .checked=${rebootConfig.confirmation !== false}
                .configValue=${'reboot_button'}
                .fieldValue=${'confirmation'}
                @change=${this._nestedValueChanged}
                ></ha-switch>
            </ha-formfield>
            </div>
        ` : nothing}

        <!-- Status Tab -->
        ${this._activeTab === 'status' ? html`
          <div class="tab-content">
            <div class="editor-row">
              <ha-formfield label="Enable Status Section">
                <ha-switch
                  .checked=${statusSection.enabled !== false}
                  .configValue=${'status_section'}
                  .fieldValue=${'enabled'}
                  @change=${this._nestedValueChanged}
                ></ha-switch>
              </ha-formfield>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${statusSection.left_entity || ''}
                  .configValue=${'status_section'}
                  .fieldValue=${'left_entity'}
                  @value-changed=${this._nestedValueChanged}
                  label="Left Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-textfield
                  .value=${statusSection.left_label || 'Status'}
                  .configValue=${'status_section'}
                  .fieldValue=${'left_label'}
                  @input=${this._nestedValueChanged}
                  label="Left Label"
                ></ha-textfield>
              </div>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${statusSection.right_entity || ''}
                  .configValue=${'status_section'}
                  .fieldValue=${'right_entity'}
                  @value-changed=${this._nestedValueChanged}
                  label="Right Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-textfield
                  .value=${statusSection.right_label || 'IP'}
                  .configValue=${'status_section'}
                  .fieldValue=${'right_label'}
                  @input=${this._nestedValueChanged}
                  label="Right Label"
                ></ha-textfield>
              </div>
            </div>
            <div class="editor-row">
              <div class="editor-item">
                <ha-select
                  .value=${statusSection.tap_action?.action || 'more-info'}
                  .configValue=${'status_section'}
                  .fieldValue=${'tap_action'}
                  @selected=${this._tapActionChanged}
                  @closed=${(ev: any) => ev.stopPropagation()}
                  label="Tap Action"
                >
                  <mwc-list-item value="more-info">More Info</mwc-list-item>
                  <mwc-list-item value="navigate">Navigate</mwc-list-item>
                  <mwc-list-item value="url">URL</mwc-list-item>
                  <mwc-list-item value="call-service">Call Service</mwc-list-item>
                  <mwc-list-item value="none">None</mwc-list-item>
                </ha-select>
              </div>
            </div>
          </div>
        ` : nothing}

        <!-- Top Sensors Tab -->
        ${this._activeTab === 'top' ? html`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Top Section (Card View)</span>
              <ha-button @click=${() => this._addSensor('top_sensors')}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${this._config.top_sensors?.map((sensor: SensorConfig, index: number) => html`
              <div class="sensor-row">
                <div class="sensor-item">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${sensor.entity || ''}
                    .configValue=${'top_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'entity'}
                    @value-changed=${this._sensorValueChanged}
                    label="Entity"
                    allow-custom-entity
                  ></ha-entity-picker>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${sensor.name || ''}
                    .configValue=${'top_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'name'}
                    @input=${this._sensorValueChanged}
                    label="Name"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${sensor.unit || ''}
                    .configValue=${'top_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'unit'}
                    @input=${this._sensorValueChanged}
                    label="Unit"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                    <ha-select
                    .value=${sensor.display_type || 'number'}
                    .configValue=${'top_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'display_type'}
                    @selected=${this._sensorValueChanged}
                    @closed=${(ev: any) => ev.stopPropagation()}
                    label="Display Type"
                    >
                    <mwc-list-item value="number">Number</mwc-list-item>
                    <mwc-list-item value="bar">Progress Bar</mwc-list-item>
                    <mwc-list-item value="graph">Graph (HA Sensor Style)</mwc-list-item>
                    <mwc-list-item value="badge">Badge</mwc-list-item>
                    </ha-select>
                </div>
                <div class="sensor-item">
                  <ha-select
                    .value=${sensor.tap_action?.action || 'more-info'}
                    .configValue=${'top_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'tap_action'}
                    @selected=${this._sensorTapActionChanged}
                    @closed=${(ev: any) => ev.stopPropagation()}
                    label="Tap Action"
                  >
                    <mwc-list-item value="more-info">More Info</mwc-list-item>
                    <mwc-list-item value="navigate">Navigate</mwc-list-item>
                    <mwc-list-item value="url">URL</mwc-list-item>
                    <mwc-list-item value="call-service">Call Service</mwc-list-item>
                    <mwc-list-item value="none">None</mwc-list-item>
                  </ha-select>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${() => this._removeSensor('top_sensors', index)}
                ></ha-icon-button>
              </div>
            `) || html`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        ` : nothing}

        <!-- Bottom Sensors Tab -->
        ${this._activeTab === 'bottom' ? html`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Bottom Section (List View - 2 Columns)</span>
              <ha-button @click=${() => this._addSensor('bottom_sensors')}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${this._config.bottom_sensors?.map((sensor: SensorConfig, index: number) => html`
              <div class="sensor-row">
                <div class="sensor-item">
                  <ha-entity-picker
                    .hass=${this.hass}
                    .value=${sensor.entity || ''}
                    .configValue=${'bottom_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'entity'}
                    @value-changed=${this._sensorValueChanged}
                    label="Entity"
                    allow-custom-entity
                  ></ha-entity-picker>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${sensor.name || ''}
                    .configValue=${'bottom_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'name'}
                    @input=${this._sensorValueChanged}
                    label="Name"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                  <ha-textfield
                    .value=${sensor.unit || ''}
                    .configValue=${'bottom_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'unit'}
                    @input=${this._sensorValueChanged}
                    label="Unit"
                  ></ha-textfield>
                </div>
                <div class="sensor-item">
                  <ha-select
                    .value=${sensor.tap_action?.action || 'more-info'}
                    .configValue=${'bottom_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'tap_action'}
                    @selected=${this._sensorTapActionChanged}
                    @closed=${(ev: any) => ev.stopPropagation()}
                    label="Tap Action"
                  >
                    <mwc-list-item value="more-info">More Info</mwc-list-item>
                    <mwc-list-item value="navigate">Navigate</mwc-list-item>
                    <mwc-list-item value="url">URL</mwc-list-item>
                    <mwc-list-item value="call-service">Call Service</mwc-list-item>
                    <mwc-list-item value="none">None</mwc-list-item>
                  </ha-select>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${() => this._removeSensor('bottom_sensors', index)}
                ></ha-icon-button>
              </div>
            `) || html`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        ` : nothing}
      </div>
    `;
  }

  private _setActiveTab(tab: 'general' | 'status' | 'top' | 'bottom'): void {
    this._activeTab = tab;
  }

  private _valueChanged(ev: any): void {
    const target = ev.target as any;
    const configValue = target.configValue as string;
    const value = target.checked !== undefined ? target.checked : target.value;

    if (!this._config || !configValue) {
      return;
    }

    if (!VALID_CONFIG_KEYS.includes(configValue)) {
      return;
    }

    const newConfig = { ...this._config };

    if (value === '' || value === undefined) {
      delete newConfig[configValue];
    } else {
      newConfig[configValue] = value;
    }

    this._config = newConfig;
    this._dispatchConfigChange(newConfig);
  }

  private _nestedValueChanged(ev: any): void {
    const target = ev.target as any;
    const configValue = target.configValue as string;
    const fieldValue = target.fieldValue as string;
    const value = target.checked !== undefined ? target.checked : target.value;

    if (!this._config || !configValue || !fieldValue) {
      return;
    }

    const newConfig = { ...this._config };
    const nestedObject = { ...(newConfig[configValue] || {}) };

    if (value === '' || value === undefined) {
      delete nestedObject[fieldValue];
    } else {
      nestedObject[fieldValue] = value;
    }

    newConfig[configValue] = nestedObject;
    this._config = newConfig;
    this._dispatchConfigChange(newConfig);
  }

  private _tapActionChanged(ev: any): void {
    const target = ev.target as any;
    const configValue = target.configValue as string;
    const fieldValue = target.fieldValue as string;
    const actionValue = target.value;

    if (!this._config || !configValue || !fieldValue) {
      return;
    }

    const newConfig = { ...this._config };
    const nestedObject = { ...(newConfig[configValue] || {}) };

    if (actionValue === 'none') {
      delete nestedObject[fieldValue];
    } else {
      nestedObject[fieldValue] = { action: actionValue };
    }

    newConfig[configValue] = nestedObject;
    this._config = newConfig;
    this._dispatchConfigChange(newConfig);
  }

  private _sensorValueChanged(ev: any): void {
    const target = ev.target as any;
    const configValue = target.configValue as string;
    const sensorIndex = target.sensorIndex as number;
    const sensorField = target.sensorField as string;
    const value = target.checked !== undefined ? target.checked : target.value;

    if (!this._config || !configValue || sensorIndex === undefined || !sensorField) {
      return;
    }

    const newConfig = { ...this._config };
    const sensorsArray = [...(newConfig[configValue] || [])];

    if (!sensorsArray[sensorIndex]) {
      sensorsArray[sensorIndex] = {};
    }

    if (value === '' || value === undefined) {
      delete sensorsArray[sensorIndex][sensorField];
    } else {
      sensorsArray[sensorIndex][sensorField] = value;
    }

    newConfig[configValue] = sensorsArray;
    this._config = newConfig;
    this._dispatchConfigChange(newConfig);
  }

  private _sensorTapActionChanged(ev: any): void {
    const target = ev.target as any;
    const configValue = target.configValue as string;
    const sensorIndex = target.sensorIndex as number;
    const sensorField = target.sensorField as string;
    const actionValue = target.value;

    if (!this._config || !configValue || sensorIndex === undefined || !sensorField) {
      return;
    }

    const newConfig = { ...this._config };
    const sensorsArray = [...(newConfig[configValue] || [])];

    if (!sensorsArray[sensorIndex]) {
      sensorsArray[sensorIndex] = {};
    }

    if (actionValue === 'none') {
      delete sensorsArray[sensorIndex][sensorField];
    } else {
      sensorsArray[sensorIndex][sensorField] = { action: actionValue };
    }

    newConfig[configValue] = sensorsArray;
    this._config = newConfig;
    this._dispatchConfigChange(newConfig);
  }

  private _addSensor(section: 'top_sensors' | 'bottom_sensors'): void {
    const newConfig = { ...this._config };
    const sensorsArray = [...(newConfig[section] || [])];
    sensorsArray.push({ 
      entity: '', 
      name: 'New Sensor', 
      display_type: section === 'top_sensors' ? 'bar' : 'number',
      tap_action: { action: 'more-info' },
    });
    newConfig[section] = sensorsArray;
    this._config = newConfig;
    this._dispatchConfigChange(newConfig);
  }

  private _removeSensor(section: 'top_sensors' | 'bottom_sensors', index: number): void {
    const newConfig = { ...this._config };
    const sensorsArray = [...(newConfig[section] || [])];
    sensorsArray.splice(index, 1);
    newConfig[section] = sensorsArray;
    this._config = newConfig;
    this._dispatchConfigChange(newConfig);
  }

  private _dispatchConfigChange(newConfig: RouterCardEditorConfig): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: newConfig },
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles() {
    return css`
      .editor {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .tabs {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        padding-bottom: 8px;
      }

      .tab {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 16px;
        border: none;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        color: var(--primary-text-color, #333);
        transition: all 0.2s;
      }

      .tab:hover {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      .tab.active {
        background: var(--primary-color, #03a9f4);
        color: white;
      }

      .tab ha-icon {
        font-size: 16px;
      }

      .tab-content {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .editor-row {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
      }

      .editor-item {
        flex: 1;
        min-width: 150px;
      }

      .section-divider {
        margin: 16px 0 8px 0;
        padding-top: 16px;
        border-top: 1px solid var(--divider-color, #e0e0e0);
      }

      .section-title {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-text-color, #333);
      }

      .info-box {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        font-size: 13px;
        color: var(--secondary-text-color, #666);
      }

      .info-box ha-icon {
        color: var(--primary-color, #03a9f4);
      }

      .sensors-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 0;
        font-weight: 600;
      }

      .sensor-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: flex-end;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        margin-bottom: 8px;
      }

      .sensor-item {
        flex: 1;
        min-width: 120px;
      }

      .empty-state {
        padding: 24px;
        text-align: center;
        color: var(--secondary-text-color, #666);
        font-style: italic;
      }

      ha-textfield,
      ha-select,
      ha-entity-picker,
      ha-icon-picker {
        width: 100%;
      }

      ha-formfield {
        white-space: nowrap;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-card-editor': RouterCardEditor;
  }
}