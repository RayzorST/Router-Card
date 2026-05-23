// src/editor/sections/cards-section.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { loadEditorComponents } from '../../utils/editor-utils';

@customElement('cards-section')
export class CardsSection extends LitElement {
  @property() public hass!: any;
  @property() public cards: LovelaceCardConfig[] = [];
  @property() public localize!: (key: string, params?: Record<string, string>) => string;
  
  @state() private _componentsLoaded = false;
  private _stackEditor: any; // Используем any

  async connectedCallback() {
    super.connectedCallback();
    if (!this._componentsLoaded) {
      await loadEditorComponents();
      this._componentsLoaded = true;
      this.requestUpdate();
    }
  }

  protected updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('cards') && this._stackEditor) {
      (this._stackEditor as any).config = this._getStackConfig();
    }
  }

  private _getStackConfig() {
    return {
      type: 'vertical-stack',
      title: '',
      cards: this.cards || []
    };
  }

  private _handleConfigChanged(e: CustomEvent) {
    const newConfig = e.detail.config;
    if (newConfig && newConfig.cards) {
      this.cards = newConfig.cards;
      this._fireCardsChanged();
    }
  }

  private _fireCardsChanged(): void {
    this.dispatchEvent(new CustomEvent('cards-changed', {
      detail: { cards: this.cards },
      bubbles: true,
      composed: true
    }));
  }

  protected render() {
    if (!this.hass || !this._componentsLoaded) return nothing;

    return html`
      <div class="section">
        <div class="section-header">
          <ha-icon icon="mdi:card-multiple"></ha-icon>
          <h3>${this.localize('editor.sections.cards')}</h3>
        </div>

        <hui-stack-card-editor
          .hass=${this.hass}
          .config=${this._getStackConfig()}
          @config-changed=${this._handleConfigChanged}
          ${(el: any) => { this._stackEditor = el; }}
        ></hui-stack-card-editor>
      </div>
    `;
  }

  static get styles() {
    return css`
      .section {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 4px;
      }

      .section-header ha-icon {
        --mdc-icon-size: 20px;
        color: var(--primary-color);
      }

      .section-header h3 {
        margin: 0;
        font-size: 15px;
        font-weight: 600;
        flex: 1;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cards-section': CardsSection;
  }
}