export type Languages = keyof typeof languages
export const languages = {
  en: {
    uLabel: 'English',
    label: 'English',
    code: 'en-US'
  },
  fa: {
    uLabel: 'Faris',
    label: 'فارسی',
    code: 'fa-IR'
  }
}

export const ui = {
  fa: {
    'nav.posts': 'بلاگ',
    'nav.about': 'درباره',
    'nav.podcast': 'پادکست',
  },
  en: {
    'nav.posts': 'Posts',
    'nav.about': 'About',
    'nav.podcast': 'Podcast',
  }
}

export const DEFAULT_LOCALE = 'en'
export const rtlLanguages = ['fa']

export const getLocales = () : Languages[] | string => <Languages[] | []> Object.keys(languages)

export function isRtl(locale: Languages | string) : boolean {
  return rtlLanguages.includes(locale)
}

export function getLocaleFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Languages;
  return DEFAULT_LOCALE;
}


export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof DEFAULT_LOCALE]) {
    return ui[lang][key] || ui[DEFAULT_LOCALE][key];
  }
}