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
  display_type?: 'bar' | 'number' | 'graph' | 'badge';
  min?: number;
  max?: number;
  tap_action?: {
    action: 'more-info' | 'toggle' | 'call-service' | 'navigate' | 'url' | 'none';
    navigation_path?: string;
    url_path?: string;
    service?: string;
    service_data?: Record<string, any>;
  };
}

interface StatusSectionConfig {
  enabled: boolean;
  left_entity?: string;
  left_label?: string;
  right_entity?: string;
  right_label?: string;
  tap_action?: {
    action: 'more-info' | 'toggle' | 'call-service' | 'navigate' | 'url' | 'none';
    navigation_path?: string;
    url_path?: string;
    service?: string;
    service_data?: Record<string, any>;
  };
}

interface UpdateSectionConfig {
  enabled: boolean;
  entity?: string;
  label?: string;
  tap_action?: {
    action: 'more-info' | 'toggle' | 'call-service' | 'navigate' | 'url' | 'none';
    navigation_path?: string;
    url_path?: string;
    service?: string;
    service_data?: Record<string, any>;
  };
}

interface RebootButtonConfig {
  enabled: boolean;
  service?: string;
  service_data?: Record<string, any>;
  confirmation?: boolean;
  label?: string;
  icon?: string;
}

interface RouterCardConfig {
  type: string;
  name?: string;
  icon?: string;
  controller?: boolean;
  theme?: 'default' | 'dark' | 'light';
  update_section?: UpdateSectionConfig;
  status_section?: StatusSectionConfig;
  reboot_button?: RebootButtonConfig;
  top_sensors?: SensorConfig[];
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
      update_section: {
        enabled: true,
        entity: 'update.router_firmware',
        label: 'Update Available',
        tap_action: { action: 'more-info' },
      },
      status_section: {
        enabled: true,
        left_entity: 'sensor.router_wan_status',
        left_label: 'WAN Status',
        right_entity: 'sensor.router_wan_ip',
        right_label: 'WAN IP',
        tap_action: { action: 'more-info' },
      },
      reboot_button: {
        enabled: false,
        service: 'button.router_reboot_press',
        confirmation: true,
        label: '',
        icon: 'mdi:restart',
      },
      top_sensors: [
        { entity: 'sensor.router_cpu_load', name: 'CPU Load', unit: '%', display_type: 'bar', tap_action: { action: 'more-info' } },
        { entity: 'sensor.router_memory_usage', name: 'Memory', unit: '%', display_type: 'graph', tap_action: { action: 'more-info' } },
        { entity: 'sensor.router_uptime', name: 'Uptime', display_type: 'number', tap_action: { action: 'more-info' } },
        { entity: 'sensor.router_connected_clients', name: 'Clients', icon: 'mdi:devices', display_type: 'badge', tap_action: { action: 'more-info' } },
      ],
      bottom_sensors: [
        { entity: 'sensor.router_wifi_2g_temperature', name: 'WiFi 2.4GHz', unit: '°C', display_type: 'number', tap_action: { action: 'more-info' } },
        { entity: 'sensor.router_wifi_5g_temperature', name: 'WiFi 5GHz', unit: '°C', display_type: 'number', tap_action: { action: 'more-info' } },
        { entity: 'sensor.router_wan_rx', name: 'WAN RX', unit: 'GB', display_type: 'number', tap_action: { action: 'more-info' } },
        { entity: 'sensor.router_wan_tx', name: 'WAN TX', unit: 'GB', display_type: 'number', tap_action: { action: 'more-info' } },
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

  private _checkUpdateAvailable(entityId: string): boolean {
    if (!entityId || !this.hass.states[entityId]) {
      return false;
    }
    const state = this.hass.states[entityId];
    const entityIdParts = entityId.split('.');
    const domain = entityIdParts[0];

    if (domain === 'update') {
      return state.state === 'on' || state.state === 'available';
    }
    if (domain === 'binary_sensor') {
      return state.state === 'on';
    }
    return state.state === 'on' || state.state === 'true' || state.state === '1';
  }

  private _formatValue(value: string, unit?: string, displayType?: string, min?: number, max?: number): { display: string, barValue?: number } {
    const numValue = parseFloat(value);
    let displayValue = value;
    let barValue: number | undefined;

    if (!isNaN(numValue)) {
      if (unit === 'GB' || unit === 'TB') {
        displayValue = `${numValue.toFixed(2)} ${unit}`;
      } else if (unit === '%' || unit === '°C') {
        displayValue = `${numValue.toFixed(1)}${unit}`;
        if (displayType === 'bar' && unit === '%') {
          barValue = Math.min(100, Math.max(0, numValue));
        }
      } else if (numValue > 86400 && !unit) {
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

      if (displayType === 'bar' && min !== undefined && max !== undefined) {
        barValue = ((numValue - min) / (max - min)) * 100;
        barValue = Math.min(100, Math.max(0, barValue));
      }
    } else {
      displayValue = `${value}${unit || ''}`;
    }

    return { display: displayValue, barValue };
  }

  private _getStatusColor(status: string): string {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('connected') || lowerStatus.includes('up') || lowerStatus === 'on' || lowerStatus === 'true' || lowerStatus === 'online') {
      return '#27ae60';
    }
    if (lowerStatus.includes('disconnected') || lowerStatus.includes('down') || lowerStatus === 'off' || lowerStatus === 'false' || lowerStatus === 'offline') {
      return '#e74c3c';
    }
    return '#f39c12';
  }

  private _getLoadColor(percentage: number): string {
    if (percentage < 50) return '#27ae60';
    if (percentage < 80) return '#f39c12';
    return '#e74c3c';
  }

  private _shouldShowStatusSection(): boolean {
    const statusSection = this.config.status_section;
    if (!statusSection || !statusSection.enabled) {
      return false;
    }
    return true;
  }

  private _handleReboot(): void {
    const rebootConfig = this.config.reboot_button;
    if (!rebootConfig || !rebootConfig.enabled) {
      return;
    }

    const confirmation = rebootConfig.confirmation !== false;
    
    if (confirmation) {
      const confirmed = confirm('Are you sure you want to reboot the router?');
      if (!confirmed) {
        return;
      }
    }

    const service = rebootConfig.service || 'button.router_reboot_press';
    const [domain, serviceName] = service.split('.');
    
    this.hass.callService(domain, serviceName, rebootConfig.service_data || {});
  }

  private _handleTap(action: { action: string; navigation_path?: string; url_path?: string; service?: string; service_data?: Record<string, any> } | undefined, entityId?: string): void {
    if (!action || action.action === 'none') {
      if (entityId) {
        this.dispatchEvent(new CustomEvent('hass-more-info', {
          bubbles: true,
          composed: true,
          detail: { entityId },
        }));
      }
      return;
    }

    switch (action.action) {
      case 'more-info':
        if (entityId) {
          this.dispatchEvent(new CustomEvent('hass-more-info', {
            bubbles: true,
            composed: true,
            detail: { entityId },
          }));
        }
        break;
      case 'navigate':
        if (action.navigation_path) {
          history.pushState(null, '', action.navigation_path);
          this.dispatchEvent(new CustomEvent('location-changed', { bubbles: true, composed: true }));
        }
        break;
      case 'url':
        if (action.url_path) {
          window.open(action.url_path, '_blank');
        }
        break;
      case 'call-service':
        if (action.service) {
          const [domain, service] = action.service.split('.');
          this.hass.callService(domain, service, action.service_data || {});
        }
        break;
      case 'toggle':
        if (entityId) {
          this.hass.callService('homeassistant', 'toggle', { entity_id: entityId });
        }
        break;
    }
  }

  protected render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const icon = this.config.icon || (this.config.controller ? 'mdi:router-wireless' : 'mdi:access-point');
    const showStatusSection = this._shouldShowStatusSection();
    const statusSection = this.config.status_section;
    const rebootConfig = this.config.reboot_button;
    const updateSection = this.config.update_section;

    const leftData = statusSection?.left_entity ? this._getSensorState(statusSection.left_entity) : null;
    const rightData = statusSection?.right_entity ? this._getSensorState(statusSection.right_entity) : null;
    const showLeft = leftData !== null;
    const showRight = rightData !== null;
    const showRebootLabel = rebootConfig?.enabled && rebootConfig.label && rebootConfig.label.trim() !== '';
    const showUpdate = updateSection?.enabled && updateSection.entity && this._checkUpdateAvailable(updateSection.entity);

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
          <div class="header-right">
            ${rebootConfig?.enabled 
              ? html`<span class="badge reboot-badge" @click=${this._handleReboot}>
                  <ha-icon icon="${rebootConfig.icon || 'mdi:restart'}"></ha-icon>
                  ${showRebootLabel ? html`<span>${rebootConfig.label}</span>` : nothing}
                </span>` 
              : nothing}
          </div>
        </div>

        <!-- Update Section -->
        ${showUpdate
          ? html`<div class="update-section ${updateSection?.tap_action && updateSection.tap_action.action !== 'none' ? 'clickable' : ''}" 
                @click=${() => this._handleTap(updateSection?.tap_action, updateSection?.entity)}>
              <ha-icon icon="mdi:arrow-up-circle"></ha-icon>
              <span>${updateSection?.label || 'Update Available'}</span>
            </div>` 
          : nothing}

        <!-- Status Section -->
        ${showStatusSection && (showLeft || showRight)
          ? html`<div class="status-section ${statusSection?.tap_action && statusSection.tap_action.action !== 'none' ? 'clickable' : ''}" 
                @click=${() => this._handleTap(statusSection?.tap_action, statusSection?.left_entity)}>
              <div class="status-row">
                ${showLeft 
                  ? html`<div class="status-item ${showRight ? 'status-left' : ''}">
                      <span class="status-label">${statusSection?.left_label || 'Status'}</span>
                      <span class="status-value" style="color: ${this._getStatusColor(leftData!.state)}">
                        ● ${leftData!.state}
                      </span>
                    </div>` 
                  : nothing}
                ${showRight 
                  ? html`<div class="status-item ${showLeft ? 'status-right' : ''}">
                      <span class="status-label">${statusSection?.right_label || 'IP'}</span>
                      <span class="status-value">${rightData!.state}</span>
                    </div>` 
                  : nothing}
              </div>
            </div>` 
          : nothing}

        <div class="content">
          <!-- Верхняя секция (карточки) -->
          ${this.config.top_sensors && this.config.top_sensors.length > 0
            ? html`<div class="top-section">
                <div class="cards-grid">
                  ${this.config.top_sensors.map((sensor) => {
                    const data = this._getSensorState(sensor.entity);
                    if (!data) return nothing;
                    
                    const formatted = this._formatValue(
                      data.state, 
                      sensor.unit || data.unit, 
                      sensor.display_type,
                      sensor.min,
                      sensor.max
                    );
                    const barColor = formatted.barValue !== undefined ? this._getLoadColor(formatted.barValue) : undefined;
                    const displayType = sensor.display_type || 'number';
                    const graphHeight = formatted.barValue !== undefined ? formatted.barValue : 50;
                    const showValue = displayType !== 'graph';
                    const isClickable = sensor.tap_action && sensor.tap_action.action !== 'none';

                    return html`
                      <div class="card-item display-type-${displayType} ${isClickable ? 'clickable' : ''}" 
                           @click=${() => this._handleTap(sensor.tap_action, sensor.entity)}>
                        <div class="card-header">
                          ${sensor.icon ? html`<ha-icon icon="${sensor.icon}"></ha-icon>` : nothing}
                          <span class="card-name">${sensor.name}</span>
                        </div>
                        ${showValue
                          ? html`<div class="card-value" 
                                style="${barColor && displayType === 'bar' ? `color: ${barColor}` : ''}">
                              ${displayType === 'badge' 
                                ? html`<span class="badge-value">${formatted.display}</span>`
                                : formatted.display}
                            </div>`
                          : nothing}
                        ${displayType === 'bar' && formatted.barValue !== undefined
                          ? html`<div class="card-bar">
                              <div class="card-bar-fill" style="width: ${formatted.barValue}%; background: ${barColor}"></div>
                            </div>`
                          : nothing}
                            ${displayType === 'graph'
                            ? html`<div class="card-graph-wrapper">
                                <div class="card-graph-header">
                                    <span class="card-graph-value">${formatted.display}</span>
                                </div>
                                <div class="card-graph">
                                    <svg class="graph-svg" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="graphGradient-${sensor.entity}" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" style="stop-color:var(--accent-color);stop-opacity:0.3" />
                                        <stop offset="100%" style="stop-color:var(--accent-color);stop-opacity:0" />
                                        </linearGradient>
                                    </defs>
                                    <path class="graph-area" 
                                            d="M 0 50 L 0 ${50 - graphHeight * 0.4} Q 25 ${50 - graphHeight * 0.5} 50 ${50 - graphHeight * 0.45} Q 75 ${50 - graphHeight * 0.4} 100 ${50 - graphHeight * 0.5} L 100 50 Z" 
                                            fill="url(#graphGradient-${sensor.entity})" />
                                    <path class="graph-line" 
                                            d="M 0 ${50 - graphHeight * 0.4} Q 25 ${50 - graphHeight * 0.5} 50 ${50 - graphHeight * 0.45} Q 75 ${50 - graphHeight * 0.4} 100 ${50 - graphHeight * 0.5}" 
                                            fill="none" 
                                            stroke="var(--accent-color)" 
                                            stroke-width="1.5" 
                                            stroke-linecap="round" />
                                    </svg>
                                </div>
                                </div>`
                            : nothing}
                      </div>
                    `;
                  })}
                </div>
              </div>`
            : nothing}

          <!-- Нижняя секция (список в 2 колонки) -->
          ${this.config.bottom_sensors && this.config.bottom_sensors.length > 0
            ? html`<div class="bottom-section">
                <div class="list-grid">
                  ${this.config.bottom_sensors.map((sensor) => {
                    const data = this._getSensorState(sensor.entity);
                    if (!data) return nothing;
                    
                    const formatted = this._formatValue(data.state, sensor.unit || data.unit, sensor.display_type);
                    const isClickable = sensor.tap_action && sensor.tap_action.action !== 'none';

                    return html`
                      <div class="list-item ${isClickable ? 'clickable' : ''}" 
                           @click=${() => this._handleTap(sensor.tap_action, sensor.entity)}>
                        <div class="list-left">
                          ${sensor.icon ? html`<ha-icon icon="${sensor.icon}"></ha-icon>` : nothing}
                          <span class="list-name">${sensor.name}</span>
                        </div>
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
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
      }

      .badge.controller {
        background: #27ae60;
        color: white;
      }

      .badge.repeater {
        background: #3498db;
        color: white;
      }

      .badge.reboot-badge {
        background: #e74c3c;
        color: white;
        cursor: pointer;
        transition: all 0.2s;
      }

      .badge.reboot-badge:hover {
        background: #c0392b;
        transform: scale(1.05);
      }

      .badge.reboot-badge ha-icon {
        font-size: 12px;
      }

      .header-right {
        display: flex;
        align-items: center;
      }

      /* Update Section */
      .update-section {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 16px;
        margin-bottom: 16px;
        background: rgba(243, 156, 28, 0.2);
        border: 1px solid rgba(243, 156, 28, 0.5);
        border-radius: 8px;
        color: #f39c12;
        font-size: 13px;
        font-weight: 600;
      }

      .update-section.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .update-section.clickable:hover {
        background: rgba(243, 156, 28, 0.3);
        transform: scale(1.02);
      }

      .dark .update-section {
        background: rgba(243, 156, 28, 0.15);
      }

      .update-section ha-icon {
        font-size: 18px;
      }

      /* Status Section */
      .status-section {
        margin-bottom: 16px;
        padding: 12px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .status-section.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .status-section.clickable:hover {
        background: var(--primary-color, #03a9f4);
      }

      .status-section.clickable:hover .status-label,
      .status-section.clickable:hover .status-value {
        color: white;
      }

      .dark .status-section {
        background: #16213e;
      }

      .status-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      }

      .status-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .status-item.status-left {
        flex: 1;
      }

      .status-item.status-right {
        text-align: right;
      }

      .status-label {
        font-size: 11px;
        color: var(--secondary-text-color, #666);
        text-transform: uppercase;
      }

      .dark .status-label {
        color: #aaa;
      }

      .status-value {
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

      .card-item.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .card-item.clickable:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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

      .badge-value {
        background: var(--primary-color, #03a9f4);
        color: white;
        padding: 4px 12px;
        border-radius: 16px;
        font-size: 18px;
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

      /* Graph Display Type - Compact SVG */
        .card-graph-wrapper {
            margin-top: 0;
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 0;
        }

        .card-graph-header {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 0;
            margin: 0;
            min-height: 20px;
        }

      .card-graph-container {
        margin-top: 4px;
        width: 100%;
      }

        .card-graph-value {
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color, #333);
        text-align: left;
        line-height: 1;
        }

      .card-graph {
        height: 35px;
        width: 100%;
        padding: 0;
        margin: 0;
      }

      .graph-svg {
        width: 100%;
        height: 100%;
        display: block;
      }

      .graph-area {
        transition: all 0.3s ease;
      }

      .graph-line {
        transition: all 0.3s ease;
        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
      }

      /* Bottom Section (List - 2 columns) */
      .bottom-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .list-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }

      @media (max-width: 600px) {
        .list-grid {
          grid-template-columns: 1fr;
        }
      }

      .list-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 14px;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
      }

      .list-item.clickable {
        cursor: pointer;
        transition: all 0.2s;
      }

      .list-item.clickable:hover {
        background: var(--primary-color, #03a9f4);
      }

      .list-item.clickable:hover .list-name,
      .list-item.clickable:hover .list-value {
        color: white;
      }

      .dark .list-item {
        background: #16213e;
      }

      .list-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .list-left ha-icon {
        font-size: 16px;
        color: var(--secondary-text-color, #666);
      }

      .dark .list-left ha-icon {
        color: #aaa;
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