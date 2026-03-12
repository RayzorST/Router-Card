import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseCard } from './base-card';
import { HistoryData } from '../types/config';

@customElement('router-graph-card')
export class GraphCard extends BaseCard {
  @property({ type: Object }) graphData?: Record<string, HistoryData[]>;
  
  // Кешируем последние вычисления для производительности
  private _cachedPoints: { points: { x: number; y: number }[]; min: number; max: number } | null = null;
  private _lastEntityId: string = '';
  private _lastDataState: string = '';

  private _getGraphPoints(): { points: { x: number; y: number }[]; min: number; max: number } {
    const entityId = this.sensor.entity;
    const currentState = this.data.state;
    
    // Используем кеш если данные не изменились
    if (this._cachedPoints && this._lastEntityId === entityId && this._lastDataState === currentState) {
      return this._cachedPoints;
    }
    
    const history = this.graphData?.[entityId] || [];
    const currentValue = parseFloat(currentState) || 0;
    
    // Если нет истории, показываем только текущее значение
    if (history.length < 2) {
      const result = { points: [], min: 0, max: 100 };
      this._cachedPoints = result;
      this._lastEntityId = entityId;
      this._lastDataState = currentState;
      return result;
    }
    
    // Берем последние 24 точки для производительности
    const points = history.slice(-24);
    const values = points.map(p => parseFloat(p.state) || 0);
    
    // Добавляем текущее значение если оно значительно отличается
    if (values.length > 0 && Math.abs(values[values.length - 1] - currentValue) > 0.01) {
      values.push(currentValue);
    }
    
    const maxValue = Math.max(...values, this.sensor.max || Math.max(...values, currentValue));
    const minValue = Math.min(...values, this.sensor.min || Math.min(...values, 0));
    const range = maxValue - minValue || 1;
    
    const width = 200;
    const height = this._getGraphHeight();
    
    const graphPoints = values.map((val, i) => {
      const x = (i / (values.length - 1)) * width;
      const normalizedValue = (val - minValue) / range;
      const y = height - (normalizedValue * height * 0.9) - (height * 0.05);
      return { x, y };
    });
    
    const result = { points: graphPoints, min: minValue, max: maxValue };
    this._cachedPoints = result;
    this._lastEntityId = entityId;
    this._lastDataState = currentState;
    
    return result;
  }

  private _getGraphHeight(): number {
    const detail = this.sensor.graph_detail || 2;
    if (detail === 1) return 36; // Чуть меньше
    if (detail === 3) return 60;
    return 45;
  }

  private _generateSmoothPath(points: { x: number; y: number }[]): string {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x},${points[0].y} `;
    
    // Упрощенная интерполяция для производительности
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      const cp1x = p1.x + (p2.x - p1.x) * 0.25;
      const cp1y = p1.y;
      const cp2x = p2.x - (p2.x - p1.x) * 0.25;
      const cp2y = p2.y;
      
      path += `C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y} `;
    }
    
    return path;
  }

  private _generateAreaPoints(points: { x: number; y: number }[]): string {
    if (points.length < 2) return '';
    
    const height = this._getGraphHeight();
    let area = `0,${height} `;
    area += points.map(p => `${p.x},${p.y}`).join(' ');
    area += ` ${points[points.length - 1].x},${height}`;
    
    return area;
  }

  renderContent(): TemplateResult {
    const { points, min, max } = this._getGraphPoints();
    const currentValue = parseFloat(this.data.state) || 0;
    const unit = this.sensor.unit || this.data.unit || '';
    const detail = this.sensor.graph_detail || 2;
    const height = this._getGraphHeight();
    const width = 200;
    
    if (points.length < 2) {
      return html`
        <div class="graph-container" style="height: ${height}px">
          <div class="graph-current">${currentValue.toFixed(1)}${unit}</div>
          <div class="graph-placeholder">
            <ha-icon icon="mdi:chart-line"></ha-icon>
            <span>No data</span>
          </div>
        </div>
      `;
    }
    
    const smoothPath = this._generateSmoothPath(points);
    const areaPoints = this._generateAreaPoints(points);
    const entityId = this.sensor.entity.replace(/[^a-zA-Z0-9]/g, '-');
    
    return html`
      <div class="graph-wrapper">
        <div class="graph-current">${currentValue.toFixed(1)}${unit}</div>
        <div class="graph-container" style="height: ${height}px">
          <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" class="graph-svg">
            <defs>
              <linearGradient id="grad-${entityId}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="var(--accent-color, var(--primary-color, #03a9f4))" stop-opacity="0.2"/>
                <stop offset="80%" stop-color="var(--accent-color, var(--primary-color, #03a9f4))" stop-opacity="0.05"/>
                <stop offset="100%" stop-color="var(--accent-color, var(--primary-color, #03a9f4))" stop-opacity="0"/>
              </linearGradient>
            </defs>
            
            <polygon
              points="${areaPoints}"
              fill="url(#grad-${entityId})"
              class="graph-area"
            />
            
            <path
              d="${smoothPath}"
              fill="none"
              stroke="var(--accent-color, var(--primary-color, #03a9f4))"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="graph-line"
            />
            
            ${detail === 3 ? points.map(p => html`
              <circle
                cx="${p.x}"
                cy="${p.y}"
                r="2"
                fill="var(--accent-color, var(--primary-color, #03a9f4))"
                stroke="var(--card-background-color, white)"
                stroke-width="1.5"
                class="graph-point"
              />
            `) : ''}
          </svg>
        </div>
        <div class="graph-time">
          <span>${this.sensor.hours_to_show || 24}h ago</span>
          <span>now</span>
        </div>
      </div>
    `;
  }

  static get styles() {
    return [
      this.baseStyles,
      css`
        .card {
          background: var(--secondary-background-color, #f5f5f5);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
          padding: 0;
        }

        .dark .card {
          background: #16213e;
        }

        .graph-wrapper {
          width: 100%;
          padding: 0;
          display: flex;
          flex-direction: column;
        }

        .graph-current {
          font-size: 18px;
          font-weight: 600;
          color: var(--primary-text-color);
          padding: 8px 12px 4px 12px;
        }

        .graph-container {
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .graph-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .graph-line {
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
          vector-effect: non-scaling-stroke;
        }

        .graph-point {
          transition: r 0.2s ease;
        }

        .graph-point:hover {
          r: 4;
        }

        .graph-time {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: var(--secondary-text-color);
          padding: 2px 12px 8px 12px;
          opacity: 0.7;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .graph-placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 100%;
          min-height: 36px;
          font-size: 12px;
          color: var(--secondary-text-color);
          font-style: italic;
          background: var(--secondary-background-color);
          border-radius: 4px;
          margin: 0 12px 8px 12px;
        }

        .graph-placeholder ha-icon {
          --mdc-icon-size: 16px;
          color: var(--secondary-text-color);
        }
      `
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'router-graph-card': GraphCard;
  }
}