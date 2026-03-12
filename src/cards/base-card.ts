import { LitElement, html, css, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { SensorConfig, SensorData, CardProps, TapActionConfig } from '../types/config';

// Базовый класс для всех карточек
export abstract class BaseCard extends LitElement {
  @property({ type: Object }) sensor!: SensorConfig;
  @property({ type: Object }) data!: SensorData;
  @property({ type: Object }) hass?: any;
  @property({ type: Function }) onClick?: (action?: TapActionConfig, entityId?: string) => void;

  // Форматирование значения (общее для всех карточек)
  protected formatValue(value: string, unit?: string): string {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return `${value}${unit || ''}`;
    
    // Форматирование времени аптайма
    if (numValue > 86400 && !unit) {
      const days = Math.floor(numValue / 86400);
      const hours = Math.floor((numValue % 86400) / 3600);
      const minutes = Math.floor((numValue % 3600) / 60);
      const parts: string[] = [];
      if (days > 0) parts.push(`${days}д`);
      if (hours > 0) parts.push(`${hours}ч`);
      if (minutes > 0 || parts.length === 0) parts.push(`${minutes}м`);
      return parts.join(' ');
    }
    
    // Форматирование с единицами измерения
    if (unit === 'GB' || unit === 'TB') {
      return `${numValue.toFixed(2)} ${unit}`;
    }
    if (unit === '%' || unit === '°C') {
      return `${numValue.toFixed(1)}${unit}`;
    }
    return `${numValue}${unit || ''}`;
  }

  // Получение цвета в зависимости от значения
  protected getValueColor(value: number, min?: number, max?: number): string {
    if (min !== undefined && max !== undefined) {
      const percentage = ((value - min) / (max - min)) * 100;
      if (percentage < 50) return '#27ae60';
      if (percentage < 80) return '#f39c12';
      return '#e74c3c';
    }
    return 'var(--primary-color, #03a9f4)';
  }

  // Обработчик клика
  protected _handleClick(e: Event): void {
    e.stopPropagation();
    if (this.onClick) {
      this.onClick(this.sensor.tap_action, this.sensor.entity);
    }
  }

  // Абстрактный метод для рендера содержимого карточки
  abstract renderContent(): TemplateResult;

  // Базовые стили для всех карточек
  static get baseStyles() {
    return css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .card-header {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 12px 0;
      }

      .card-header ha-icon {
        --mdc-icon-size: 16px;
        color: var(--secondary-text-color, #666);
      }

      .dark .card-header ha-icon {
        color: #aaa;
      }

      .card-name {
        font-size: 12px;
        color: var(--secondary-text-color, #666);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .dark .card-name {
        color: #aaa;
      }

      .clickable {
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .clickable:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
      }

      .error {
        color: #e74c3c;
        font-size: 12px;
      }
    `;
  }

  protected render() {
    const isClickable = this.sensor.tap_action && this.sensor.tap_action.action !== 'none';
    
    return html`
      <div class="card ${isClickable ? 'clickable' : ''}" @click=${this._handleClick}>
        <div class="card-header">
          ${this.sensor.icon ? html`<ha-icon icon="${this.sensor.icon}"></ha-icon>` : ''}
          <span class="card-name">${this.sensor.name}</span>
        </div>
        ${this.renderContent()}
      </div>
    `;
  }
}