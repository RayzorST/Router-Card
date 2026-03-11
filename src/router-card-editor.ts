import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardEditor } from 'custom-card-helpers';

interface SensorConfig {
  entity: string;
  name: string;
  unit?: string;
  icon?: string;
  show_bar?: boolean;
}

interface RouterCardEditorConfig {
  type: string;
  name?: string;
  icon?: string;
  controller?: boolean;
  theme?: string;
  wan_status_entity?: string;
  wan_ip_entity?: string;
  top_sensors?: SensorConfig[];
  bottom_sensors?: SensorConfig[];
  [key: string]: any;
}

const VALID_CONFIG_KEYS = [
  'type', 'name', 'icon', 'controller', 'theme',
  'wan_status_entity', 'wan_ip_entity',
  'top_sensors', 'bottom_sensors',
];

@customElement('router-card-editor')
export class RouterCardEditor extends LitElement implements LovelaceCardEditor {
  @property() public hass!: any;
  @state() private _config!: RouterCardEditorConfig;
  @state() private _activeTab: 'wan' | 'top' | 'bottom' | 'general' = 'general';

  public setConfig(config: RouterCardEditorConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) {
      return html``;
    }

    return html`
      <div class="editor">
        <!-- Tabs -->
        <div class="tabs">
          <button class="tab ${this._activeTab === 'general' ? 'active' : ''}" @click=${() => this._activeTab = 'general'}>
            <ha-icon icon="mdi:cog"></ha-icon> General
          </button>
          <button class="tab ${this._activeTab === 'wan' ? 'active' : ''}" @click=${() => this._activeTab = 'wan'}>
            <ha-icon icon="mdi:wan"></ha-icon> WAN
          </button>
          <button class="tab ${this._activeTab === 'top' ? 'active' : ''}" @click=${() => this._activeTab = 'top'}>
            <ha-icon icon="mdi:view-grid"></ha-icon> Top (Cards)
          </button>
          <button class="tab ${this._activeTab === 'bottom' ? 'active' : ''}" @click=${() => this._activeTab = 'bottom'}>
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
          </div>
        ` : null}

        <!-- WAN Tab -->
        ${this._activeTab === 'wan' ? html`
          <div class="tab-content">
            <div class="editor-row">
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${this._config.wan_status_entity || ''}
                  .configValue=${'wan_status_entity'}
                  @value-changed=${this._valueChanged}
                  label="WAN Status Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
              <div class="editor-item">
                <ha-entity-picker
                  .hass=${this.hass}
                  .value=${this._config.wan_ip_entity || ''}
                  .configValue=${'wan_ip_entity'}
                  @value-changed=${this._valueChanged}
                  label="WAN IP Entity"
                  allow-custom-entity
                ></ha-entity-picker>
              </div>
            </div>
            <div class="info-box">
              <ha-icon icon="mdi:information"></ha-icon>
              <span>If both entities exist, status shows on left and IP on right. If only one exists, it shows on left.</span>
            </div>
          </div>
        ` : null}

        <!-- Top Sensors Tab -->
        ${this._activeTab === 'top' ? html`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Top Section (Card View)</span>
              <ha-button @click=${() => this._addSensor('top_sensors')}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${this._config.top_sensors?.map((sensor, index) => html`
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
                  <ha-icon-picker
                    .value=${sensor.icon || ''}
                    .configValue=${'top_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'icon'}
                    @value-changed=${this._sensorValueChanged}
                    label="Icon"
                  ></ha-icon-picker>
                </div>
                <div class="sensor-item checkbox">
                  <ha-formfield label="Bar">
                    <ha-switch
                      .checked=${sensor.show_bar === true}
                      .configValue=${'top_sensors'}
                      .sensorIndex=${index}
                      .sensorField=${'show_bar'}
                      @change=${this._sensorValueChanged}
                    ></ha-switch>
                  </ha-formfield>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${() => this._removeSensor('top_sensors', index)}
                ></ha-icon-button>
              </div>
            `) || html`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        ` : null}

        <!-- Bottom Sensors Tab -->
        ${this._activeTab === 'bottom' ? html`
          <div class="tab-content">
            <div class="sensors-header">
              <span>Bottom Section (List View)</span>
              <ha-button @click=${() => this._addSensor('bottom_sensors')}>
                <ha-icon icon="mdi:plus"></ha-icon> Add Sensor
              </ha-button>
            </div>
            ${this._config.bottom_sensors?.map((sensor, index) => html`
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
                  <ha-icon-picker
                    .value=${sensor.icon || ''}
                    .configValue=${'bottom_sensors'}
                    .sensorIndex=${index}
                    .sensorField=${'icon'}
                    @value-changed=${this._sensorValueChanged}
                    label="Icon"
                  ></ha-icon-picker>
                </div>
                <ha-icon-button
                  icon="mdi:delete"
                  @click=${() => this._removeSensor('bottom_sensors', index)}
                ></ha-icon-button>
              </div>
            `) || html`<div class="empty-state">No sensors configured. Click "Add Sensor" to start.</div>`}
          </div>
        ` : null}
      </div>
    `;
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

  private _addSensor(section: 'top_sensors' | 'bottom_sensors'): void {
    const newConfig = { ...this._config };
    const sensorsArray = [...(newConfig[section] || [])];
    sensorsArray.push({ entity: '', name: 'New Sensor' });
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
        min-width: 200px;
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

      .sensor-item.checkbox {
        flex: 0;
        min-width: auto;
        display: flex;
        align-items: center;
        height: 52px;
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