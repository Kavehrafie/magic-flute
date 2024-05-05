export type Languages = keyof typeof languages;
export const languages = {
  en: {
    uLabel: "English",
    label: "English",
    code: "en-US",
  },
  fa: {
    uLabel: "Faris",
    label: "فارسی",
    code: "fa-IR",
  },
};

export const ui = {
  fa: {
    "nav.posts": "بلاگ",
    "nav.about": "درباره",
    "nav.podcast": "پادکست",
    "action.add-to-calendar": "به تقویم اضافه کن",
    session: "نشست",
    "form.event-subscription.email": "آدرس پست الکترونیکی",
    "form.event-subscription.description":
      "برای دریافت متن و لینک جلسه، آدرس پست الکترونیکی خود را وارد کنید",
    "form.event-subscription.action": "بفرست",
    "event.invitation.sent":
      "موفقیت! اگر ایمیل خود را پیدا نکردید، لطفا این پوشه اسپم خود را مشاهده کنید.",
    "reading.minutes": "دقیقه",
    "player.loading": "در حال بارگذاری...",
  },
  en: {
    "nav.posts": "Posts",
    "nav.about": "About",
    "nav.podcast": "Podcast",
    "action.add-to-calendar": "Add to Calendar",
    session: "Session",
    "form.event-subscription.email": "Email",
    "form.event-subscription.description":
      "To receive a text and link to the session, enter your email address",
    "form.event-subscription.action": "Submit",
    "event.invitation.sent":
      "Successfully sent! Check your spam if you do not find in the inbox.",
    "reading.minutes": "minutes reading",
    "player.loading": "Loading...",
  },
};

export const DEFAULT_LOCALE = "en";
export const rtlLanguages = ["fa"];

export const getLocales = (): Languages[] | string =>
  <Languages[] | []>Object.keys(languages);

export function isRtl(locale: Languages | string): boolean {
  return rtlLanguages.includes(locale);
}

export function getLocaleFromUrl(url: URL): Languages {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as Languages;
  return DEFAULT_LOCALE;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)[typeof DEFAULT_LOCALE]) {
    try {
      return ui[lang][key] || ui[DEFAULT_LOCALE][key];
    } catch (error) {
      return "";
    }
  };
}

export function useIndiaDigits() {
  String.prototype.toIndiaDigits = function () {
    var id = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };
}
