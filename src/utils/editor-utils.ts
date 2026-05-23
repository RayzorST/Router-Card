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
    'hui-card-picker', // <-- Ключевой компонент
  ];
  
  await loadHaComponents(requiredComponents);
};

// Загрузка helpers Home Assistant (нужна для создания дочерних карт)
export const loadCardHelpers = async (): Promise<any> => {
  if ((window as any).loadCardHelpers) {
    return (window as any).loadCardHelpers();
  }
  throw new Error('loadCardHelpers not available');
};