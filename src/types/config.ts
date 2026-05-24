export interface BadgeConfig {
  type: 'action' | 'update' | '';
  icon?: string;
  label?: string;
  entity_id?: string;
  tap_action?: {
    action: 'more-info' | 'navigate' | 'url' | 'call-service' | 'none';
    navigation_path?: string;
    url_path?: string;
    service?: string;
    service_data?: Record<string, any>;
  };
  show_when?: {
    entity_id: string;
    state: string;
  };
}

export interface UniversalDeviceCardConfig {
  type: string;
  name: string;
  icon: string;
  device_id: string;
  badges: BadgeConfig[];
  cards: any[];
}