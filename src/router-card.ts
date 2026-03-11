import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCard, LovelaceCardEditor } from 'custom-card-helpers';
import './router-card-editor';

// Типы для конфигурации
interface SensorConfig {
  entity: string;
  name: string;
  unit?: string;
  icon?: string;
  show_bar?: boolean;
}

interface RouterCardConfig {
  type: string;
  name?: string;
  icon?: string;
  controller?: boolean;
  theme?: 'default' | 'dark' | 'light';
  
  // WAN секция
  wan_status_entity?: string;
  wan_ip_entity?: string;
  
  // Верхняя секция (кубики)
  top_sensors?: SensorConfig[];
  
  // Нижняя секция (список)
  bottom_sensors?: SensorConfig[];
}

interface SensorData {
  state: string;
  attributes?: Record<string, any>;
  unit?: string;
}

@customElement('router-card')
export class RouterCard extends LitElement implements LovelaceCard {
  @property() public hass!: HomeAssistant;
  @state() private config!: RouterCardConfig;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('router-card-editor');
  }

  public static getStubConfig(): RouterCardConfig {
    return {
      type: 'custom:router-card',
      name: 'Router',
      icon: 'mdi:router-wireless',
      controller: true,
      theme: 'default',
      wan_status_entity: 'sensor.router_wan_status',
      wan_ip_entity: 'sensor.router_wan_ip',
      top_sensors: [
        { entity: 'sensor.router_cpu_load', name: 'CPU Load', unit: '%', show_bar: true },
        { entity: 'sensor.router_memory_usage', name: 'Memory', unit: '%', show_bar: true },
        { entity: 'sensor.router_uptime', name: 'Uptime' },
        { entity: 'sensor.router_connected_clients', name: 'Clients', icon: 'mdi:devices' },
      ],
      bottom_sensors: [
        { entity: 'sensor.router_wifi_2g_temperature', name: 'WiFi 2.4GHz Temp', unit: '°C' },
        { entity: 'sensor.router_wifi_5g_temperature', name: 'WiFi 5GHz Temp', unit: '°C' },
        { entity: 'sensor.router_wan_rx', name: 'WAN RX', unit: 'GB' },
        { entity: 'sensor.router_wan_tx', name: 'WAN TX', unit: 'GB' },
      ],
    };
  }

  public setConfig(config: RouterCardConfig): void {
    this.config = {
      ...config,
    };
  }

  private _getSensorState(entityId: string): SensorData | null {
    if (!entityId || !this.hass.states[entityId]) {
      return null;
    }
    const state = this.hass.states[entityId];
    return {
      state: state.state,
      attributes: state.attributes,
      unit: state.attributes?.unit_of_measurement,
    };
  }

  private _formatValue(value: string, unit?: string, showBar?: boolean): { display: string, barValue?: number } {
    const numValue = parseFloat(value);
    let displayValue = value;
    let barValue: number | undefined;

    if (!isNaN(numValue)) {
      // Форматирование чисел
      if (unit === 'GB' || unit === 'TB') {
        displayValue = `${numValue.toFixed(2)} ${unit}`;
      } else if (unit === '%' || unit === '°C') {
        displayValue = `${numValue.toFixed(1)}${unit}`;
        if (showBar && unit === '%') {
          barValue = Math.min(100, Math.max(0, numValue));
        }
      } else if (numValue > 86400 && !unit) {
        // Uptime в секундах
        const days = Math.floor(numValue / 86400);
        const hours = Math.floor((numValue % 86400) / 3600);
        const minutes = Math.floor((numValue % 3600) / 60);
        const parts: string[] = [];
        if (days > 0) parts.push(`${days}д`);
        if (hours > 0) parts.push(`${hours}ч`);
        if (minutes > 0 || parts.length === 0) parts.push(`${minutes}м`);
        displayValue = parts.join(' ');
      } else {
        displayValue = `${numValue}${unit || ''}`;
      }
    } else {
      displayValue = `${value}${unit || ''}`;
    }

    return { display: displayValue, barValue };
  }

  private _getStatusColor(status: string): string {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('connected') || lowerStatus.includes('up') || lowerStatus === 'on' || lowerStatus === 'true') {
      return '#27ae60';
    }
    if (lowerStatus.includes('disconnected') || lowerStatus.includes('down') || lowerStatus === 'off' || lowerStatus === 'false') {
      return '#e74c3c';
    }
    return '#f39c12';
  }

  private _getLoadColor(percentage: number): string {
    if (percentage < 50) return '#27ae60';
    if (percentage < 80) return '#f39c12';
    return '#e74c3c';
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const icon = this.config.icon || (this.config.controller ? 'mdi:router-wireless' : 'mdi:router-network');
    
    // WAN секция
    const wanStatusData = this._getSensorState(this.config.wan_status_entity || '');
    const wanIpData = this._getSensorState(this.config.wan_ip_entity || '');
    const showWanSection = wanStatusData || wanIpData;

    return html`
      <ha-card class="router-card ${this.config.theme || 'default'}">
        <!-- Заголовок -->
        <div class="header">
          <div class="header-left">
            <ha-icon icon="${icon}"></ha-icon>
            <span class="title">${this.config.name || 'Router'}</span>
            ${this.config.controller 
              ? html`<span class="badge controller">Controller</span>` 
              : html`<span class="badge repeater">Repeater</span>`}
          </div>
        </div>

        <!-- WAN секция (над основными) -->
        ${showWanSection 
          ? html`<div class="wan-section">
              <div class="wan-row">
                ${wanStatusData 
                  ? html`<div class="wan-item ${wanIpData ? 'wan-left' : ''}">
                      <span class="wan-label">WAN Status</span>
                      <span class="wan-value" style="color: ${this._getStatusColor(wanStatusData.state)}">
                        ● ${wanStatusData.state}
                      </span>
                    </div>` 
                  : nothing}
                ${wanIpData 
                  ? html`<div class="wan-item ${wanStatusData ? 'wan-right' : ''}">
                      <span class="wan-label">WAN IP</span>
                      <span class="wan-value">${wanIpData.state}</span>
                    </div>` 
                  : nothing}
              </div>
            </div>` 
          : nothing}

        <div class="content">
          <!-- Верхняя секция (кубики) -->
          ${this.config.top_sensors && this.config.top_sensors.length > 0
            ? html`<div class="top-section">
                <div class="cards-grid">
                  ${this.config.top_sensors.map((sensor) => {
                    const data = this._getSensorState(sensor.entity);
                    if (!data) return nothing;
                    
                    const formatted = this._formatValue(data.state, sensor.unit || data.unit, sensor.show_bar);
                    const barColor = formatted.barValue !== undefined ? this._getLoadColor(formatted.barValue) : undefined;

                    return html`
                      <div class="card-item">
                        <div class="card-header">
                          ${sensor.icon ? html`<ha-icon icon="${sensor.icon}"></ha-icon>` : nothing}
                          <span class="card-name">${sensor.name}</span>
                        </div>
                        <div class="card-value" style="${barColor ? `color: ${barColor}` : ''}">
                          ${formatted.display}
                        </div>
                        ${sensor.show_bar && formatted.barValue !== undefined
                          ? html`<div class="card-bar">
                              <div class="card-bar-fill" style="width: ${formatted.barValue}%; background: ${barColor}"></div>
                            </div>`
                          : nothing}
                      </div>
                    `;
                  })}
                </div>
              </div>`
            : nothing}

          <!-- Нижняя секция (список) -->
          ${this.config.bottom_sensors && this.config.bottom_sensors.length > 0
            ? html`<div class="bottom-section">
                <div class="list-grid">
                  ${this.config.bottom_sensors.map((sensor) => {
                    const data = this._getSensorState(sensor.entity);
                    if (!data) return nothing;
                    
                    const formatted = this._formatValue(data.state, sensor.unit || data.unit);

                    return html`
                      <div class="list-item">
                        <span class="list-name">${sensor.name}</span>
                        <span class="list-value">${formatted.display}</span>
                      </div>
                    `;
                  })}
                </div>
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        padding: 16px;
        background: var(--card-background-color, #ffffff);
        border-radius: 12px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0,0,0,0.1));
      }

      .router-card.dark {
        background: #1a1a2e;
        color: #ffffff;
      }

      .router-card.light {
        background: #ffffff;
        color: #333333;
      }

      /* Header */
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .header-left ha-icon {
        font-size: 28px;
        color: var(--primary-color, #03a9f4);
      }

      .title {
        font-size: 18px;
        font-weight: 600;
      }

      .badge {
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
      }

      .badge.controller {
        background: #27ae60;
        color: white;
      }

      .badge.repeater {
        background: #3498db;
        color: white;
      }

      /* WAN Section */
      .wan-section {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .dark .wan-section {
        background: #16213e;
      }

      .wan-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      }

      .wan-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .wan-item.wan-left {
        flex: 1;
      }

      .wan-item.wan-right {
        text-align: right;
      }

      .wan-label {
        font-size: 11px;
        color: var(--secondary-text-color, #666);
        text-transform: uppercase;
      }

      .dark .wan-label {
        color: #aaa;
      }

      .wan-value {
        font-size: 16px;
        font-weight: 600;
      }

      /* Content */
      .content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      /* Top Section (Cards) */
      .top-section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 12px;
      }

      .card-item {
        background: var(--secondary-background-color, #f5f5f5);
        padding: 14px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .dark .card-item {
        background: #16213e;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .card-header ha-icon {
        font-size: 16px;
        color: var(--secondary-text-color, #666);
      }

      .dark .card-header ha-icon {
        color: #aaa;
      }

      .card-name {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        font-weight: 500;
      }

      .dark .card-name {
        color: #aaa;
      }

      .card-value {
        font-size: 22px;
        font-weight: 600;
      }

      .card-bar {
        height: 4px;
        background: #e0e0e0;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 4px;
      }

      .dark .card-bar {
        background: #2a2a4a;
      }

      .card-bar-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.3s ease;
      }

      /* Bottom Section (List) */
      .bottom-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .list-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 14px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .dark .list-item {
        background: #16213e;
      }

      .list-name {
        font-size: 13px;
        color: var(--primary-text-color, #333);
        font-weight: 500;
      }

      .dark .list-name {
        color: #fff;
      }

      .list-value {
        font-size: 14px;
        font-weight: 600;
        color: var(--primary-color, #03a9f4);
      }
    `;
  }

  public getCardSize(): number {
    return 4;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-card': RouterCard;
  }
}