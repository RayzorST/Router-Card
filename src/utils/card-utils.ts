import type { HomeAssistant } from '@hass/types';
import type { UniversalDeviceCardConfig } from '../types/config';

export const editorCardName = 'universal-device-card-editor';
const DEFAULT_ICON = 'mdi:devices';

export function getDefaultConfig(hass?: HomeAssistant): UniversalDeviceCardConfig {
  return {
    type: 'custom:universal-device-card',
    name: '',
    icon: DEFAULT_ICON,
    device_id: '',
    badges: [],
    cards: [],
  };
}

export function resolveConfigWithDeprecations(config: any): UniversalDeviceCardConfig {
  const resolved = { ...config };

  if (resolved.chips && !resolved.badges) {
    resolved.badges = resolved.chips;
  }
  delete resolved.chips;

  if (!resolved.badges) {
    resolved.badges = [];
    
    if (resolved.update_section?.enabled !== false && resolved.update_section?.entity) {
      resolved.badges.push({
        type: 'update',
        entity_id: resolved.update_section.entity,
        label: resolved.update_section.label || 'Update',
        tap_action: resolved.update_section.tap_action || { action: 'more-info' },
      });
    }

    if (resolved.action_button?.enabled !== false && resolved.action_button?.entity) {
      resolved.badges.push({
        type: 'action',
        icon: resolved.action_button.icon || 'mdi:restart',
        label: resolved.action_button.label || 'Reboot',
        entity_id: resolved.action_button.entity,
        tap_action: resolved.action_button.tap_action || { action: 'call-service' },
      });
    }
  }

  delete resolved.controller;
  delete resolved.reboot_button;
  delete resolved.update_section;
  delete resolved.action_button;

  return {
    type: resolved.type || 'custom:universal-device-card',
    name: resolved.name || '',
    icon: resolved.icon || DEFAULT_ICON,
    device_id: resolved.device_id || '',
    badges: resolved.badges || [],
    cards: resolved.cards || [],
  };
}