import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseCard } from './base-card';

@customElement('router-number-card')
export class NumberCard extends BaseCard {
  renderContent(): TemplateResult {
    const formatted = this.formatValue(this.data.state, this.sensor.unit || this.data.unit);
    
    return html`
      <div class="card-value">${formatted}</div>
    `;
  }

  static get styles() {
    return [
      this.baseStyles,
      css`
        .card {
          background: var(--secondary-background-color, #f5f5f5);
          padding: 14px;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }

        .dark .card {
          background: #16213e;
        }

        .card-value {
          font-size: 22px;
          font-weight: 600;
          padding: 0 12px 8px;
          color: var(--primary-text-color);
        }
      `
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-number-card': NumberCard;
  }
}