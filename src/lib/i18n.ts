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

export const DEFAULT_LOCALE = 'en'
export const rtlLanguages = ['fa']

export const getLocales = () => Object.keys(languages) as string[] | undefined

export function isRtl(locale: Languages | string) : boolean {
  return rtlLanguages.includes(locale)
}

export function getLocaleFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Languages;
  return DEFAULT_LOCALE;
}