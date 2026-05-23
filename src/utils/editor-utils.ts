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
    'hui-card-picker',
    'ha-expansion-panel',
  ];
  
  await loadHaComponents(requiredComponents);
};