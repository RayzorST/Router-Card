// src/editor/sections/cards-section.ts
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { loadEditorComponents } from '../../utils/editor-utils';

@customElement('cards-section')
export class CardsSection extends LitElement {
  @property() public hass!: any;
  @property() public cards: LovelaceCardConfig[] = [];
  
  @state() private _selectedCardIndex: number = -1;
  @state() private _componentsLoaded = false;

  async connectedCallback() {
    super.connectedCallback();
    if (!this._componentsLoaded) {
      await loadEditorComponents(); // Принудительно загружаем hui-card-picker
      this._componentsLoaded = true;
      this.requestUpdate();
    }
  }

  // Пересоздаём hui-card-picker при смене выбранной карты
  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);
    if (changedProperties.has('_selectedCardIndex') || changedProperties.has('_componentsLoaded')) {
      this._updateCardPicker();
    }
  }

  // ИМПЕРАТИВНОЕ создание hui-card-picker (как в go-hass-cards)
  private async _updateCardPicker() {
    if (!this._componentsLoaded || !this.hass) return;

    const container = this.shadowRoot?.getElementById('card-picker-container');
    if (!container) return;

    // Очищаем контейнер перед созданием нового пикера
    container.innerHTML = '';

    const currentCard = this.cards[this._selectedCardIndex];
    if (!currentCard) return;

    try {
      // Убедимся, что компонент точно определён
      await customElements.whenDefined('hui-card-picker');
      
      const picker = document.createElement('hui-card-picker');
      (picker as any).hass = this.hass;
      (picker as any).config = currentCard;

      picker.addEventListener('config-changed', (e: CustomEvent) => {
        this._handleCardConfigChanged(e.detail.config);
      });

      container.appendChild(picker);
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

  private _selectCard(index: number) {
    if (index >= 0 && index < this.cards.length) {
      this._selectedCardIndex = index;
    }
  }

  private _addCard() {
    const newCard = { type: 'entities', entities: [] };
    const newCards = [...this.cards, newCard];
    this.cards = newCards;
    this._selectedCardIndex = newCards.length - 1;
    this._fireCardsChanged();
  }

  private _removeCard(e: Event, index: number) {
    e.stopPropagation();
    const newCards = this.cards.filter((_, i) => i !== index);
    
    if (this._selectedCardIndex >= newCards.length) {
      this._selectedCardIndex = Math.max(-1, newCards.length - 1);
    }
    
    this.cards = newCards;
    this._fireCardsChanged();
  }

  private _fireCardsChanged() {
    this.dispatchEvent(new CustomEvent('cards-changed', {
      detail: { cards: this.cards },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this.hass || !this._componentsLoaded) {
      return html`<div class="loading">Loading...</div>`;
    }

    if (!this.cards.length) {
      return html`
        <div class="section">
          <div class="section-header">
            <h3>Cards</h3>
            <div class="add-button" @click=${this._addCard}>
              <ha-icon icon="mdi:plus"></ha-icon> Add Card
            </div>
          </div>
          <div class="no-cards">No cards added yet.</div>
        </div>
      `;
    }

    return html`
      <div class="section">
        <div class="section-header">
          <h3>Cards</h3>
          <div class="add-button" @click=${this._addCard}>
            <ha-icon icon="mdi:plus"></ha-icon> Add Card
          </div>
        </div>
        <div class="cards-toolbar">
          ${this.cards.map((_, index) => html`
            <div class="card-tab ${index === this._selectedCardIndex ? 'selected' : ''}"
                 @click=${() => this._selectCard(index)}>
              ${index + 1}
              ${this.cards.length > 1 ? html`
                <ha-icon class="remove-icon" icon="mdi:close"
                         @click=${(e: Event) => this._removeCard(e, index)}></ha-icon>
              ` : nothing}
            </div>
          `)}
        </div>
        <div id="card-picker-container" class="card-picker-container"></div>
      </div>
    `;
  }

  static get styles() {
    return css`
      .section {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 16px;
        background: var(--card-background-color);
        border-radius: 12px;
        border: 1px solid var(--divider-color);
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .add-button {
        cursor: pointer;
        color: var(--primary-color);
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .cards-toolbar {
        display: flex;
        gap: 8px;
        overflow-x: auto;
      }
      .card-tab {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 12px;
        border-radius: 16px;
        background: var(--secondary-background-color);
        cursor: pointer;
        position: relative;
      }
      .card-tab.selected {
        background: var(--primary-color);
        color: white;
      }
      .remove-icon {
        --mdc-icon-size: 14px;
        display: none;
      }
      .card-tab:hover .remove-icon {
        display: block;
      }
      .card-picker-container {
        min-height: 200px;
      }
      .no-cards, .loading, .error {
        text-align: center;
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