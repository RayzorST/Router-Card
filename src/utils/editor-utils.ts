// src/utils/editor-utils.ts
import { loadHaComponents } from '@kipk/load-ha-components';

/**
 * Загружает необходимые компоненты HA для редактора
 */
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
    'hui-card-picker',
  ];
  
  await loadHaComponents(requiredComponents);
};

/**
 * Создает стандартную карточку для добавления
 */
export const createDefaultCard = (type: string = 'entities'): any => {
  switch (type) {
    case 'entities':
      return {
        type: 'entities',
        entities: []
      };
    case 'glance':
      return {
        type: 'glance',
        entities: []
      };
    case 'markdown':
      return {
        type: 'markdown',
        content: ''
      };
    default:
      return {
        type: 'entities',
        entities: []
      };
  }
};