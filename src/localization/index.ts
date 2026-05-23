import en from './en.json';
import ru from './ru.json';

export type Language = 'en' | 'ru';

const translations: Record<Language, any> = {
  en,
  ru,
};

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return current[key];
    }
    return undefined;
  }, obj);
}

export function getLocalizedString(lang: Language, key: string, params?: Record<string, string>): string {
  let value = getNestedValue(translations[lang], key);
  
  if (value === undefined && lang !== 'en') {
    value = getNestedValue(translations.en, key);
  }
  
  if (value === undefined || typeof value !== 'string') {
    const parts = key.split('.');
    const fallback = parts[parts.length - 1]
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
    console.warn(`Translation missing: ${key} (${lang})`);
    return fallback;
  }
  
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (_: string, param: string) => {
      return params[param] !== undefined ? params[param] : `{{${param}}}`;
    });
  }
  
  return value;
}

export function getLocalizedStringForHass(hass: any, key: string, params?: Record<string, string>): string {
  const lang: Language = (hass?.locale?.language === 'ru' ? 'ru' : 'en');
  return getLocalizedString(lang, key, params);
}

let currentLanguage: Language = 'en';

export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

export function t(key: string, params?: Record<string, string>): string {
  return getLocalizedString(currentLanguage, key, params);
}