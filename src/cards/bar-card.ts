import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseCard } from './base-card';

@customElement('router-bar-card')
export class BarCard extends BaseCard {
  private _calculateBarValue(): number {
    const value = parseFloat(this.data.state);
    if (isNaN(value)) return 0;
    
    const min = this.sensor.min ?? 0;
    const max = this.sensor.max ?? 100;
    
    return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  }

  renderContent(): TemplateResult {
    const value = parseFloat(this.data.state);
    const barValue = this._calculateBarValue();
    const barColor = this.getValueColor(value, this.sensor.min, this.sensor.max);
    const formatted = this.formatValue(this.data.state, this.sensor.unit || this.data.unit);
    
    return html`
      <div class="card-value" style="color: ${barColor}">${formatted}</div>
      <div class="card-bar">
        <div class="card-bar-fill" style="width: ${barValue}%; background: ${barColor}"></div>
      </div>
    `;
  }

  static get styles() {
    return [
      this.baseStyles,
      css`
        .card {
          background: var(--secondary-background-color, #f5f5f5);
          padding: 10px 14px 8px 14px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          height: 100%;
        }

        .dark .card {
          background: #16213e;
        }

        .card-value {
          font-size: 18px; /* Уменьшил с 22px */
          font-weight: 600;
          padding: 0;
          transition: color 0.3s ease;
        }

        .card-bar {
          height: 4px;
          background: #e0e0e0;
          border-radius: 2px;
          overflow: hidden;
          margin: 0 0 2px 0; /* Уменьшил отступ снизу */
        }

        .dark .card-bar {
          background: #2a2a4a;
        }

        .card-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
      `
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-bar-card': BarCard;
  }
}