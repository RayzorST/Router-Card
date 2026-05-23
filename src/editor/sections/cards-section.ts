// src/editor/sections/cards-section.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { loadEditorComponents, createDefaultCard } from '../../utils/editor-utils';

@customElement('cards-section')
export class CardsSection extends LitElement {
  @property() public hass!: any;
  @property() public cards: LovelaceCardConfig[] = [];
  @property() public localize!: (key: string, params?: Record<string, string>) => string;
  
  @state() private _selectedCardIndex: number = -1;
  @state() private _componentsLoaded = false;

  async connectedCallback() {
    super.connectedCallback();
    if (!this._componentsLoaded) {
      await loadEditorComponents();
      this._componentsLoaded = true;
      this.requestUpdate();
    }
  }

  protected render() {
    if (!this.hass || !this._componentsLoaded) return nothing;

    return html`
      <div class="section">
        <div class="section-header">
          <ha-icon icon="mdi:card-multiple"></ha-icon>
          <h3>${this.localize('editor.sections.cards')}</h3>
        </div>

        <div class="cards-toolbar">
          ${this.cards.map((_, index) => html`
            <div 
              class="card-tab ${index === this._selectedCardIndex ? 'selected' : ''}"
              @click=${() => this._selectCard(index)}
            >
              ${index + 1}
              <ha-icon 
                class="remove-icon"
                icon="mdi:close"
                @click=${(e: Event) => this._removeCard(e, index)}
              ></ha-icon>
            </div>
          `)}
          <div 
            class="card-tab add-tab"
            @click=${this._addCard}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </div>
        </div>

        ${this._selectedCardIndex >= 0 && this.cards[this._selectedCardIndex] ? html`
          <hui-card-picker
            .hass=${this.hass}
            .config=${this.cards[this._selectedCardIndex]}
            @config-changed=${this._handleCardConfigChanged}
          ></hui-card-picker>
        ` : html`
          <div class="no-card-selected">
            ${this.localize('editor.sections.no_card_selected')}
          </div>
        `}
      </div>
    `;
  }

  private _selectCard(index: number): void {
    this._selectedCardIndex = index;
  }

  private _addCard(): void {
    const newCard = createDefaultCard();
    const newCards = [...this.cards, newCard];
    this.cards = newCards;
    this._selectedCardIndex = newCards.length - 1;
    this._fireCardsChanged();
  }

  private _removeCard(e: Event, index: number): void {
    e.stopPropagation();
    
    const newCards = this.cards.filter((_, i) => i !== index);
    
    if (this._selectedCardIndex >= newCards.length) {
      this._selectedCardIndex = newCards.length - 1;
    }
    
    this.cards = newCards;
    this._fireCardsChanged();
  }

  private _handleCardConfigChanged(e: CustomEvent): void {
    if (this._selectedCardIndex >= 0) {
      const newCards = [...this.cards];
      newCards[this._selectedCardIndex] = e.detail.config;
      this.cards = newCards;
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

  static get styles() {
    return css`
      .section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: var(--card-background-color);
        border-radius: 12px;
        padding: 16px;
        border: 1px solid var(--divider-color);
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

      .cards-toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
        overflow-x: auto;
        scrollbar-width: thin;
      }

      .card-tab {
        min-width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
        cursor: pointer;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-weight: 500;
        font-size: 14px;
        transition: all 0.2s;
        flex-shrink: 0;
        position: relative;
      }

      .card-tab:hover {
        background: var(--primary-color);
        color: white;
      }

      .card-tab.selected {
        background: var(--primary-color);
        color: white;
      }

      .remove-icon {
        --mdc-icon-size: 14px;
        position: absolute;
        top: -4px;
        right: -4px;
        background: var(--error-color, #f44336);
        color: white;
        border-radius: 50%;
        padding: 2px;
        opacity: 0;
        transition: opacity 0.2s;
      }

      .card-tab:hover .remove-icon {
        opacity: 1;
      }

      .add-tab {
        background: var(--success-color, #4caf50);
        color: white;
      }

      .add-tab ha-icon {
        --mdc-icon-size: 20px;
      }

      .no-card-selected {
        text-align: center;
        color: var(--secondary-text-color);
        padding: 20px;
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cards-section': CardsSection;
  }
}