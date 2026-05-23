// src/editor/sections/cards-section.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { loadEditorComponents, createCardPicker } from '../../utils/editor-utils';

@customElement('cards-section')
export class CardsSection extends LitElement {
  @property() public hass!: any;
  @property() public cards: LovelaceCardConfig[] = [];
  
  @state() private _selectedCardIndex: number = -1;
  @state() private _componentsLoaded = false;
  @state() private _cardPicker: HTMLElement | null = null;

  async connectedCallback() {
    super.connectedCallback();
    if (!this._componentsLoaded) {
      await loadEditorComponents();
      this._componentsLoaded = true;
      this.requestUpdate();
    }
  }

  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    
    if (changedProperties.has('cards') || changedProperties.has('_selectedCardIndex')) {
      this._updateCardPicker();
    }
  }

  private async _updateCardPicker() {
    if (!this._componentsLoaded || !this.hass) return;
    
    const container = this.shadowRoot?.getElementById('card-picker-container');
    if (!container) return;
    
    // Очищаем контейнер
    container.innerHTML = '';
    this._cardPicker = null;
    
    const currentCard = this.cards[this._selectedCardIndex];
    if (!currentCard) return;
    
    try {
      const picker = await createCardPicker(
        this.hass, 
        currentCard, 
        (newConfig) => {
          this._handleCardConfigChanged(newConfig);
        }
      );
      
      if (picker) {
        container.appendChild(picker);
        this._cardPicker = picker;
      }
    } catch (e) {
      console.error('Failed to create card picker:', e);
      container.innerHTML = '<div class="error">Failed to load card editor</div>';
    }
  }

  private _handleCardConfigChanged(newConfig: LovelaceCardConfig) {
    if (this._selectedCardIndex >= 0) {
      const newCards = [...this.cards];
      newCards[this._selectedCardIndex] = newConfig;
      this.cards = newCards;
      this._fireCardsChanged();
    }
  }

  private _selectCard(index: number): void {
    if (index >= 0 && index < this.cards.length) {
      this._selectedCardIndex = index;
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
      this._selectedCardIndex = Math.max(-1, newCards.length - 1);
    } else if (this._selectedCardIndex === index) {
      // Если удалили выбранную карту, выбираем предыдущую
      this._selectedCardIndex = Math.max(-1, index - 1);
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
      return html`<div class="loading">Loading cards section...</div>`;
    }

    // Если карт нет, показываем только кнопку добавления
    if (!this.cards || this.cards.length === 0) {
      return html`
        <div class="section">
          <div class="section-header">
            <ha-icon icon="mdi:card-multiple"></ha-icon>
            <h3>Cards</h3>
            <div class="add-button" @click=${this._addCard}>
              <ha-icon icon="mdi:plus"></ha-icon>
              <span>Add Card</span>
            </div>
          </div>
          <div class="no-cards">
            <ha-icon icon="mdi:card-plus-outline"></ha-icon>
            <p>No cards added yet. Click "Add Card" to start adding cards to your device view.</p>
          </div>
        </div>
      `;
    }

    // Проверяем, выбран ли индекс
    const selectedIndex = this._selectedCardIndex >= 0 && this._selectedCardIndex < this.cards.length 
      ? this._selectedCardIndex 
      : 0;

    return html`
      <div class="section">
        <div class="section-header">
          <ha-icon icon="mdi:card-multiple"></ha-icon>
          <h3>Cards</h3>
          <span class="card-count">${this.cards.length} ${this.cards.length === 1 ? 'card' : 'cards'}</span>
        </div>

        <div class="cards-toolbar">
          ${this.cards.map((card, index) => html`
            <div 
              class="card-tab ${index === selectedIndex ? 'selected' : ''}"
              @click=${() => this._selectCard(index)}
            >
              <span class="card-tab-label">
                <ha-icon icon="mdi:card"></ha-icon>
                ${index + 1}
              </span>
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

        <div id="card-picker-container" class="card-picker-container">
          ${!this.cards[selectedIndex] ? html`
            <div class="no-card-selected">Select a card to edit</div>
          ` : nothing}
        </div>
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

      .card-count {
        font-size: 12px;
        color: var(--secondary-text-color);
        background: var(--secondary-background-color);
        padding: 2px 8px;
        border-radius: 10px;
      }

      .add-button {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
        color: var(--primary-color);
        font-size: 13px;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 6px;
        transition: background 0.2s;
      }

      .add-button:hover {
        background: rgba(var(--rgb-primary-color), 0.1);
      }

      .add-button ha-icon {
        --mdc-icon-size: 16px;
      }

      .cards-toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 0;
        border-bottom: 1px solid var(--divider-color);
        overflow-x: auto;
        flex-wrap: wrap;
      }

      .card-tab {
        min-width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        border-radius: 18px;
        cursor: pointer;
        background: var(--secondary-background-color);
        color: var(--primary-text-color);
        font-weight: 500;
        font-size: 14px;
        position: relative;
        transition: all 0.2s;
        padding: 0 8px;
      }

      .card-tab:hover {
        background: var(--primary-color);
        color: white;
      }

      .card-tab.selected {
        background: var(--primary-color);
        color: white;
      }

      .card-tab-label {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .card-tab-label ha-icon {
        --mdc-icon-size: 14px;
      }

      .remove-icon {
        --mdc-icon-size: 14px;
        background: var(--error-color, #f44336);
        color: white;
        border-radius: 50%;
        padding: 2px;
        opacity: 0;
        transition: opacity 0.2s;
        margin-left: 2px;
      }

      .card-tab:hover .remove-icon {
        opacity: 1;
      }

      .add-tab {
        background: var(--success-color, #4caf50);
        color: white;
        min-width: 36px;
        padding: 0;
      }

      .add-tab ha-icon {
        --mdc-icon-size: 20px;
      }

      .card-picker-container {
        min-height: 100px;
      }

      .no-cards {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 40px 20px;
        text-align: center;
        color: var(--secondary-text-color);
      }

      .no-cards ha-icon {
        --mdc-icon-size: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
      }

      .no-cards p {
        margin: 0;
        max-width: 300px;
      }

      .no-card-selected {
        text-align: center;
        padding: 20px;
        color: var(--secondary-text-color);
      }

      .loading {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
      }

      .error {
        padding: 20px;
        text-align: center;
        color: var(--error-color);
      }
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cards-section': CardsSection;
  }
}