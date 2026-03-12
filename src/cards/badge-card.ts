import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseCard } from './base-card';

@customElement('router-badge-card')
export class BadgeCard extends BaseCard {
  renderContent(): TemplateResult {
    const formatted = this.formatValue(this.data.state, this.sensor.unit || this.data.unit);
    
    return html`
      <div class="badge-wrapper">
        <span class="badge-value">${formatted}</span>
      </div>
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

        .badge-wrapper {
          padding: 0 12px 8px;
        }

        .badge-value {
          background: var(--primary-color, #03a9f4);
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 18px;
          font-weight: 600;
          display: inline-block;
        }
      `
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-badge-card': BadgeCard;
  }
}