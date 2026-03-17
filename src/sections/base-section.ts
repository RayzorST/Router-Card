import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { TapActionConfig } from '../types/config';

// Базовый класс для всех секций
export abstract class BaseSection extends LitElement {
  @property({ type: Boolean }) enabled = true;
  @property({ type: Object }) tap_action?: TapActionConfig;
  @property({ type: Function }) onClick?: (action?: TapActionConfig, entityId?: string) => void;

  // Обработчик клика
  protected _handleClick(e: Event, entityId?: string): void {
    e.stopPropagation();
    if (this.onClick) {
      this.onClick(this.tap_action, entityId);
    }
  }

  // Абстрактный метод для рендера содержимого
  abstract renderContent(): TemplateResult;

  // Базовые стили
  static get baseStyles() {
    return css`
      :host {
        display: block;
        width: 100%;
      }

      .section {
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .section.clickable {
        cursor: pointer;
      }

      .section.clickable:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }

      .section-content {
        width: 100%;
      }
    `;
  }

  protected render() {
    if (!this.enabled) return html``;

    const isClickable = this.tap_action && this.tap_action.action !== 'none';
    
    return html`
      <div class="section ${isClickable ? 'clickable' : ''}" @click=${(e: Event) => this._handleClick(e)}>
        <div class="section-content">
          ${this.renderContent()}
        </div>
      </div>
    `;
  }
}