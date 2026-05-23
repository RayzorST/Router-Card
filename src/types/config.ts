export interface ChipConfig {
  type: 'entity' | 'update' | 'action' | 'template';
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
  template?: string;
  show_when?: {
    entity_id?: string;
    state?: string;
  };
}

export interface UniversalDeviceCardConfig {
  type: string;
  name?: string;
  icon?: string;
  device_id?: string;
  chips?: ChipConfig[];
  cards?: any[];
  update_section?: {
    enabled?: boolean;
    entity?: string;
    label?: string;
    tap_action?: any;
  };
  action_button?: {
    enabled?: boolean;
    entity?: string;
    confirmation?: boolean;
    icon?: string;
    label?: string;
    tap_action?: any;
  };
  controller?: any;
  reboot_button?: any;
}