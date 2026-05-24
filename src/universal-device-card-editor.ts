import { LitElement, html, css, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import type { HomeAssistant } from '@hass/types';
import type { LovelaceCard, LovelaceCardEditor } from '@hass/panels/lovelace/types';
import type { BadgeConfig, UniversalDeviceCardConfig } from './types/config';
import { loadHaComponents } from '@kipk/load-ha-components';
import { getLocalizedStringForHass } from './localization';
import { loadCardHelpers } from './utils/editor-utils';

import './universal-device-card-editor';

const DEFAULT_ICON = 'mdi:devices';

@customElement('universal-device-card')
export class UniversalDeviceCard extends LitElement implements LovelaceCard {
  @state() private config!: UniversalDeviceCardConfig;
  @state() private _componentsLoaded = false;
  @state() private childCards: LovelaceCard[] = [];
  @state() private _deviceName?: string;
  @state() private _deviceModel?: string;

  private _hass?: HomeAssistant;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    const stackCard = document.createElement('hui-vertical-stack-card');
    if (
      'getConfigElement' in stackCard.constructor &&
      typeof (stackCard.constructor as any).getConfigElement === 'function'
    ) {
      (stackCard.constructor as any).getConfigElement();
    }

    return document.createElement('universal-device-card-editor') as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): UniversalDeviceCardConfig {
    return {
      type: 'custom:universal-device-card',
      name: '',
      icon: DEFAULT_ICON,
      device_id: '',
      badges: [],
      cards: [],
    };
  }

  public setConfig(config: UniversalDeviceCardConfig): void {
    this.config = this._migrateConfig(config);
    this._updateDeviceInfo();
    this._loadComponents();
  }

  set hass(hass: HomeAssistant) {
    this._hass = hass;
    this._updateDeviceInfo();
    this._updateChildCardsHass();
  }

  get hass(): HomeAssistant | undefined {
    return this._hass;
  }

  private _migrateConfig(config: any): UniversalDeviceCardConfig {
    const migrated = { ...config };

    delete migrated.controller;
    delete migrated.reboot_button;

    if (migrated.chips && !migrated.badges) {
      migrated.badges = migrated.chips;
    }
    delete migrated.chips;

    if (!migrated.badges) {
      migrated.badges = [];

      if (migrated.update_section?.enabled !== false && migrated.update_section?.entity) {
        migrated.badges.push({
          type: 'update',
          entity_id: migrated.update_section.entity,
          label: migrated.update_section.label || this._t('common.update'),
          tap_action: migrated.update_section.tap_action || { action: 'more-info' },
        });
      }

      if (migrated.action_button?.enabled !== false && migrated.action_button?.entity) {
        migrated.badges.push({
          type: 'action',
          icon: migrated.action_button.icon || 'mdi:restart',
          label: migrated.action_button.label || this._t('common.reboot'),
          entity_id: migrated.action_button.entity,
          tap_action: migrated.action_button.tap_action || { action: 'call-service' },
        });
      }
    }

    delete migrated.update_section;
    delete migrated.action_button;

    return {
      type: migrated.type,
      name: migrated.name || '',
      icon: migrated.icon || DEFAULT_ICON,
      device_id: migrated.device_id || '',
      badges: migrated.badges || [],
      cards: migrated.cards || [],
    };
  }

  private _t(key: string, params?: Record<string, string>): string {
    return getLocalizedStringForHass(this._hass, key, params);
  }

  private _updateDeviceInfo(): void {
    if (!this._hass || !this.config.device_id) {
      this._deviceName = undefined;
      this._deviceModel = undefined;
      return;
    }

    const device = this._hass.devices[this.config.device_id];
    if (device) {
      this._deviceName = device.name_by_user || device.name || undefined;
      const modelParts = [device.manufacturer, device.model, device.model_id].filter(Boolean);
      this._deviceModel = modelParts.join(' ') || undefined;
    } else {
      this._deviceName = undefined;
      this._deviceModel = undefined;
    }
  }

  private _getDisplayName(): string {
    if (this.config.name?.trim()) {
      return this.config.name;
    }

    if (this.config.device_id && this._hass?.devices[this.config.device_id]) {
      const device = this._hass.devices[this.config.device_id];
      return device.model || device.name_by_user || device.name || this._t('common.device');
    }

    return this._t('common.device');
  }

  private _getManufacturer(): string {
    if (this.config.device_id && this._hass?.devices[this.config.device_id]) {
      return this._hass.devices[this.config.device_id].manufacturer || '';
    }
    return '';
  }

  private async _loadComponents(): Promise<void> {
    try {
      await loadHaComponents();
      this._componentsLoaded = true;
      await this._createChildCards();
    } catch (e) {
      console.warn('Failed to load HA components:', e);
    }
  }

  private async _createChildCards(): Promise<void> {
    if (!this.config.cards?.length) {
      this.childCards = [];
      this.requestUpdate();
      return;
    }

    try {
      const helpers = await loadCardHelpers();
      const cards: LovelaceCard[] = [];

      for (const cardConfig of this.config.cards) {
        try {
          const element = helpers.createCardElement(cardConfig) as LovelaceCard;
          if (this._hass) {
            element.hass = this._hass;
          }

          element.addEventListener('ll-rebuild', () => {
            this._createChildCards();
          });

          cards.push(element);
        } catch (e) {
          console.error('Failed to create card:', cardConfig, e);
        }
      }

      this.childCards = cards;
      this.requestUpdate();
      await this.updateComplete;
    } catch (e) {
      console.error('Failed to load card helpers:', e);
      this.childCards = [];
    }
  }

  private _updateChildCardsHass(): void {
    if (this.childCards && this._hass) {
      for (const card of this.childCards) {
        card.hass = this._hass;
      }
    }
  }

  private _shouldShowBadge(badge: BadgeConfig): boolean {
    if (!badge.show_when?.entity_id || !this._hass) return true;

    const state = this._hass.states[badge.show_when.entity_id];
    if (!state) return false;

    if (badge.show_when.state !== undefined && badge.show_when.state !== '') {
      return state.state === badge.show_when.state;
    }

    return true;
  }

  private _isUpdateAvailable(entityId: string): boolean {
    if (!this._hass || !entityId) return false;
    const state = this._hass.states[entityId];
    if (!state) return false;
    return state.state === 'on';
  }

  private _handleBadgeClick(badge: BadgeConfig): void {
    if (!this._hass) return;

    const action = badge.tap_action;
    if (!action || action.action === 'none') return;

    switch (action.action) {
      case 'more-info':
        if (badge.entity_id) {
          this.dispatchEvent(
            new CustomEvent('hass-more-info', {
              bubbles: true,
              composed: true,
              detail: { entityId: badge.entity_id },
            })
          );
        }
        break;

      case 'navigate':
        if (action.navigation_path) {
          history.pushState(null, '', action.navigation_path);
          window.dispatchEvent(new PopStateEvent('popstate'));
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
          this._hass.callService(domain, service, action.service_data || {});
        } else if (badge.entity_id) {
          const domain = badge.entity_id.split('.')[0];
          if (domain === 'button') {
            this._hass.callService('button', 'press', { entity_id: badge.entity_id });
          } else if (domain === 'script') {
            this._hass.callService('script', 'turn_on', { entity_id: badge.entity_id });
          } else if (domain === 'switch' || domain === 'light' || domain === 'input_boolean') {
            this._hass.callService('homeassistant', 'toggle', { entity_id: badge.entity_id });
          }
        }
        break;
    }
  }

  private _renderBadges() {
    const badges = this.config.badges || [];
    if (!badges.length) return nothing;

    return html`
      <div class="badges">
        ${badges.map((badge) => {
          if (!this._shouldShowBadge(badge)) return nothing;

          if (badge.type === 'update' && badge.entity_id) {
            if (!this._isUpdateAvailable(badge.entity_id)) return nothing;
          }

          const badgeClass =
            badge.type === 'update' ? 'update' : badge.type === 'action' ? 'action' : '';

          return html`
            <div class="badge ${badgeClass}" @click=${() => this._handleBadgeClick(badge)}>
              ${badge.icon ? html`<ha-icon .icon=${badge.icon}></ha-icon>` : nothing}
              ${badge.label ? html`<span>${badge.label}</span>` : nothing}
            </div>
          `;
        })}
      </div>
    `;
  }

  protected render() {
    if (!this.config || !this._hass || !this._componentsLoaded) {
      return html`<ha-card><div class="loading">Loading...</div></ha-card>`;
    }

    const icon = this.config.icon || DEFAULT_ICON;
    const displayName = this._getDisplayName();
    const manufacturer = this._getManufacturer();

    return html`
      <ha-card class="device-card">
        <div class="header">
          <div class="header-content">
            <div class="header-left">
              <ha-icon .icon=${icon}></ha-icon>
              <div class="title-container">
                <div class="title">${displayName}</div>
                ${manufacturer ? html`<div class="manufacturer">${manufacturer}</div>` : nothing}
              </div>
            </div>
            <div class="header-right">
              ${this._renderBadges()}
            </div>
          </div>
        </div>

        ${this.childCards.length > 0
          ? html`
              <div class="cards-container">
                ${this.childCards.map((card) => html`${card}`)}
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      ha-card {
        background: var(--card-background-color, #ffffff);
        border-radius: 12px;
        box-shadow: var(--ha-card-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
        overflow: hidden;
      }

      .loading {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
      }

      .header {
        padding: 12px 16px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
        min-width: 0;
        flex: 1;
      }

      .header-left ha-icon {
        --mdc-icon-size: 24px;
        color: var(--state-icon-color, #03a9f4);
        flex-shrink: 0;
      }

      .title-container {
        min-width: 0;
        flex: 1;
      }

      .title {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.3;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .manufacturer {
        font-size: 11px;
        color: var(--secondary-text-color, #666);
        line-height: 1.3;
        margin-top: 2px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .header-right {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }

      .badges {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
      }

      .badge {
        cursor: pointer;
        transition: all 0.2s;
        padding: 4px 10px;
        border-radius: 16px;
        font-size: 12px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        background: var(--secondary-background-color, #f0f0f0);
        color: var(--secondary-text-color, #666);
        user-select: none;
      }

      .badge:hover {
        filter: brightness(0.95);
      }

      .badge:active {
        transform: scale(0.97);
      }

      .badge ha-icon {
        --mdc-icon-size: 14px;
      }

      .badge.update {
        background: var(--warning-color, #ff9800);
        color: #fff;
      }

      .badge.action {
        background: var(--primary-color, #03a9f4);
        color: #fff;
      }

      .cards-container {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .cards-container > *,
      .cards-container ha-card,
      .cards-container [class*="card"] {
        background: var(--secondary-background-color, #f5f5f5) !important;
        border-radius: 8px !important;
        margin: 0 !important;
        box-shadow: none !important;
        border: none !important;
      }

      .cards-container ha-card ha-card,
      .cards-container .card-content,
      .cards-container .content {
        background: transparent !important;
        border-radius: 8px !important;
      }

      .cards-container hui-vertical-stack-card,
      .cards-container hui-horizontal-stack-card,
      .cards-container hui-grid-card {
        background: transparent !important;
        gap: 12px;
      }

      .cards-container .card {
        background: var(--secondary-background-color, #f5f5f5) !important;
        border-radius: 8px !important;
        overflow: hidden;
      }

      @media (max-width: 600px) {
        .header {
          padding: 10px 12px;
        }

        .header-left {
          gap: 10px;
        }

        .header-left ha-icon {
          --mdc-icon-size: 20px;
        }

        .title {
          font-size: 14px;
        }

        .manufacturer {
          font-size: 10px;
        }

        .cards-container {
          padding: 8px 12px;
          gap: 8px;
        }

        .badge {
          padding: 3px 8px;
          font-size: 11px;
        }

        .badge ha-icon {
          --mdc-icon-size: 12px;
        }
      }
    `;
  }

  public async getCardSize(): Promise<number> {
    let size = 1;
    
    if (this.childCards) {
      for (const card of this.childCards) {
        if (typeof card.getCardSize === 'function') {
          const cardSize = await card.getCardSize();
          size += cardSize;
        } else {
          size += 1;
        }
      }
    }
    
    return size;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'universal-device-card': UniversalDeviceCard;
  }
}