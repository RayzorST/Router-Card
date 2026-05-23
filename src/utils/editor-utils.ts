// src/utils/editor-utils.ts
import { loadHaComponents } from '@kipk/load-ha-components';

export const loadEditorComponents = async (): Promise<void> => {
  const requiredComponents = [
    'ha-icon',
    'ha-icon-button',
    'ha-icon-picker',
    'ha-textfield',
    'ha-entity-picker',
    'ha-selector',
    'ha-switch',
    'ha-device-picker',
    'ha-formfield',
    'ha-select',
    'ha-dialog',
    'ha-sortable',
    'ha-svg-icon',
    'ha-alert',
    'ha-button',
    'ha-color-picker',
    'ha-badge',
    'ha-expansion-panel',
  ];
  
  await loadHaComponents(requiredComponents);
};

// Тип для helpers, содержащий createCardPicker
interface CardHelpers {
  createCardElement(config: any): any;
  createCardPicker(): any;
}

// Загрузка helpers Home Assistant для доступа к hui-card-picker
export const loadCardHelpers = async (): Promise<CardHelpers> => {
  if ((window as any).loadCardHelpers) {
    return (window as any).loadCardHelpers();
  }
  throw new Error('loadCardHelpers not available');
};

// Создание элемента hui-card-picker
export const createCardPicker = async (hass: any, config: any, callback: (config: any) => void): Promise<HTMLElement> => {
  const helpers = await loadCardHelpers();
  
  // hui-card-picker создается через helpers
  const picker = helpers.createCardPicker();
  
  // Настройка пикера
  if (picker && typeof picker.setConfig === 'function') {
    picker.hass = hass;
    picker.config = config;
    
    // Подписка на изменения конфигурации карты
    picker.addEventListener('config-changed', (e: CustomEvent) => {
      if (e.detail && e.detail.config) {
        callback(e.detail.config);
      }
    });
  }
  
  return picker;
};