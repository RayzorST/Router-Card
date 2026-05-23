// src/editor/sections/cards-section.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { loadEditorComponents } from '../../utils/editor-utils';

@customElement('cards-section')
export class CardsSection extends LitElement {
  @property() public hass!: any;
  @property() public cards: LovelaceCardConfig[] = [];
  
  @state() private _selectedCardIndex: number = 0;
  @state() private _componentsLoaded = false;

  async connectedCallback() {
    super.connectedCallback();
    if (!this._componentsLoaded) {
      await loadEditorComponents();
      this._componentsLoaded = true;
      this.requestUpdate();
    }
  }

  private _handleCardConfigChanged(e: CustomEvent) {
    if (this._selectedCardIndex >= 0 && e.detail.config) {
      const newCards = [...this.cards];
      newCards[this._selectedCardIndex] = e.detail.config;
      this.cards = newCards;
      this._fireCardsChanged();
    }
  }

  private _addCard(): void {
    const newCard = { type: 'entities', entities: [] };
    const newCards = [...this.cards, newCard];
    this.cards = newCards;
    this._selectedCardIndex = newCards.length - 1;
    this._fireCardsChanged();
  }

  private _removeCard(e: Event, index: number): void {
    e.stopPropagation();
    const newCards = this.cards.filter((_, i) => i !== index);
    if (this._selectedCardIndex >= newCards.length) {
      this._selectedCardIndex = Math.max(0, newCards.length - 1);
    }
    this.cards = newCards;
    this._fireCardsChanged();
  }

  private _fireCardsChanged(): void {
    this.dispatchEvent(new CustomEvent('cards-changed', {
      detail: { cards: this.cards },
      bubbles: true,
      composed: true
    }));
  }

  protected render() {
    if (!this.hass || !this._componentsLoaded) {
      return html`<div>Loading cards section...</div>`;
    }

    if (!this.cards || this.cards.length === 0) {
      return html`
        <div class="section">
          <div class="section-header">
            <ha-icon icon="mdi:card-multiple"></ha-icon>
            <h3>Cards</h3>
          </div>
          <div class="cards-toolbar">
            <div class="card-tab add-tab" @click=${this._addCard}>
              <ha-icon icon="mdi:plus"></ha-icon>
            </div>
          </div>
          <div class="no-cards">No cards added yet. Click + to add one.</div>
        </div>
      `;
    }

    return html`
      <div class="section">
        <div class="section-header">
          <ha-icon icon="mdi:card-multiple"></ha-icon>
          <h3>Cards</h3>
        </div>

        <div class="cards-toolbar">
          ${this.cards.map((_, index) => html`
            <div 
              class="card-tab ${index === this._selectedCardIndex ? 'selected' : ''}"
              @click=${() => this._selectedCardIndex = index}
            >
              ${index + 1}
              ${this.cards.length > 1 ? html`
                <ha-icon 
                  class="remove-icon"
                  icon="mdi:close"
                  @click=${(e: Event) => this._removeCard(e, index)}
                ></ha-icon>
              ` : nothing}
            </div>
          `)}
          <div class="card-tab add-tab" @click=${this._addCard}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </div>
        </div>

        ${this.cards[this._selectedCardIndex] ? html`
          <hui-card-picker
            .hass=${this.hass}
            .config=${this.cards[this._selectedCardIndex]}
            @config-changed=${this._handleCardConfigChanged}
          ></hui-card-picker>
        ` : nothing}
      </div>
    `;
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
        position: relative;
        transition: all 0.2s;
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

      .no-cards {
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