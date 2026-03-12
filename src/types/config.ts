// Типы для действий по нажатию
export interface TapActionConfig {
  action: 'more-info' | 'toggle' | 'call-service' | 'navigate' | 'url' | 'none';
  navigation_path?: string;
  url_path?: string;
  service?: string;
  service_data?: Record<string, any>;
}

// Конфигурация сенсора
export interface SensorConfig {
  entity: string;
  name: string;
  unit?: string;
  icon?: string;
  display_type?: 'bar' | 'number' | 'graph' | 'badge';
  graph_detail?: 1 | 2 | 3;
  hours_to_show?: number;
  min?: number;
  max?: number;
  tap_action?: TapActionConfig;
}

// Статус секция
export interface StatusSectionConfig {
  enabled: boolean;
  left_entity?: string;
  left_label?: string;
  right_entity?: string;
  right_label?: string;
  tap_action?: TapActionConfig;
}

// Секция обновлений
export interface UpdateSectionConfig {
  enabled: boolean;
  entity?: string;
  label?: string;
  tap_action?: TapActionConfig;
}

// Кнопка перезагрузки
export interface RebootButtonConfig {
  enabled: boolean;
  service?: string;
  service_data?: Record<string, any>;
  confirmation?: boolean;
  label?: string;
  icon?: string;
}

// Основная конфигурация карточки
export interface RouterCardConfig {
  type: string;
  name?: string;
  icon?: string;
  controller?: boolean;
  theme?: 'default' | 'dark' | 'light';
  update_section?: UpdateSectionConfig;
  status_section?: StatusSectionConfig;
  reboot_button?: RebootButtonConfig;
  top_sensors?: SensorConfig[];
  bottom_sensors?: SensorConfig[];
}

// Данные сенсора
export interface SensorData {
  state: string;
  attributes?: Record<string, any>;
  unit?: string;
}

// Данные истории
export interface HistoryData {
  state: string;
  last_changed: string;
}

// Интерфейс для свойств карточки
export interface CardProps {
  sensor: SensorConfig;
  data: SensorData;
  hass?: any;
  graphData?: Record<string, HistoryData[]>;
  onClick?: (action?: TapActionConfig, entityId?: string) => void;
}