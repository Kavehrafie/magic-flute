type Languages = keyof typeof languages
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
    'nav.posts': 'بلاگ'
  },
  en: {
    'nav.posts': 'Posts'
  }
}

export const DEFAULT_LOCALE = 'en'
export const rtlLanguages = ['fa']

export const getLocales = () : Languages[] | string => Object.keys(languages)

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
  console.log('>>>', ui[lang][key]);
    return ui[lang][key] || ui[DEFAULT_LOCALE][key];
  }
}