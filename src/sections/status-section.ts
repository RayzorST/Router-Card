import { LitElement, html, css, TemplateResult, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseSection } from './base-section';
import { StatusSectionConfig, SensorData } from '../types/config';
import { getLocalizedStringForHass } from '../localization';

@customElement('router-status-section')
export class StatusSection extends BaseSection {
  @property({ type: Object }) config!: StatusSectionConfig;
  @property({ type: Object }) leftData?: SensorData | null;
  @property({ type: Object }) rightData?: SensorData | null;
  @property({ type: Object }) hass?: any;

  private _localize(key: string, params?: Record<string, string>): string {
    return getLocalizedStringForHass(this.hass, key, params);
  }

  private _getStatusColor(status: string): string {
    const lower = status.toLowerCase();
    if (lower.includes('connected') || lower.includes('up') || lower === 'on' || lower === 'true' || lower === 'online') return '#27ae60';
    if (lower.includes('disconnected') || lower.includes('down') || lower === 'off' || lower === 'false' || lower === 'offline') return '#e74c3c';
    return '#f39c12';
  }

  private _getLocalizedStatus(status: string): string {
    const lower = status.toLowerCase();
    
    if (lower.includes('connected')) return this._localize('status.connected');
    if (lower.includes('disconnected')) return this._localize('status.disconnected');
    
    if (lower === 'on') return this._localize('status.on');
    if (lower === 'off') return this._localize('status.off');

    if (lower === 'online') return this._localize('status.online');
    if (lower === 'offline') return this._localize('status.offline');
    
    if (lower === 'up') return this._localize('status.up');
    if (lower === 'down') return this._localize('status.down');
    
    return status;
  }

  renderContent(): TemplateResult {
    const showLeft = this.leftData !== null && this.leftData !== undefined;
    const showRight = this.rightData !== null && this.rightData !== undefined;
    
    if (!showLeft && !showRight) return html``;

    return html`
      <div class="status-section">
        <div class="status-row">
          ${showLeft ? html`
            <div class="status-item status-left" @click=${(e: Event) => this._handleClick(e, this.config.left_entity)}>
              <span class="status-label">${this.config.left_label || 'Status'}</span>
              <span class="status-value" style="color: ${this._getStatusColor(this.leftData!.state)}">
                ● ${this._getLocalizedStatus(this.leftData!.state)}
              </span>
            </div>
          ` : nothing}
          
          ${showRight ? html`
            <div class="status-item status-right" @click=${(e: Event) => this._handleClick(e, this.config.right_entity)}>
              <span class="status-label">${this.config.right_label || 'IP'}</span>
              <span class="status-value">${this.rightData!.state}</span>
            </div>
          ` : nothing}
        </div>
      </div>
    `;
  }

  static get styles() {
    return [
      this.baseStyles,
      css`
        .status-section {
          padding: 12px;
          background: var(--secondary-background-color, #f5f5f5);
          border-radius: 8px;
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
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 4px;
          border-radius: 4px;
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
          letter-spacing: 0.5px;
        }

        .dark .status-label {
          color: #aaa;
        }

        .status-value {
          font-size: 16px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .status-item.status-right .status-value {
          justify-content: flex-end;
        }

        @media (max-width: 600px) {
          .status-row {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
          }

          .status-item.status-left,
          .status-item.status-right {
            text-align: left;
          }

          .status-item.status-right .status-value {
            justify-content: flex-start;
          }
        }
      `
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-status-section': StatusSection;
  }
}