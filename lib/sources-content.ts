/** Контент страницы источников (RU). Ссылки без tracking-параметров. */

export type SourceEntry = {
  title: string;
  description?: string;
  url: string;
};

export type SourceSection = {
  id: string;
  heading: string;
  entries: SourceEntry[];
};

export const SOURCE_SECTIONS: SourceSection[] = [
  {
    id: "gov",
    heading: "Государственные и официальные источники Республики Казахстан",
    entries: [
      {
        title: "Министерство экологии и природных ресурсов Республики Казахстан",
        description:
          "Официальный государственный орган: экологическая политика, охрана природы, климатические программы, отходы, зелёная экономика.",
        url: "https://www.gov.kz/memleket/entities/ecogeo",
      },
      {
        title: "Единый экологический интернет-ресурс Казахстана",
        description:
          "Национальные экологические доклады, статистика, состояние окружающей среды и государственные отчёты.",
        url: "https://ecogosfond.kz/",
      },
      {
        title: "Бюро национальной статистики РК — экологические индикаторы",
        description:
          "Официальная статистика: воздух, водные ресурсы, биоразнообразие, отходы, климат, энергетика.",
        url: "https://stat.gov.kz/ru/ecologic-indicators/28455/protected_areas/",
      },
      {
        title: "Экологический кодекс Республики Казахстан",
        description:
          "Основной законодательный документ по охране окружающей среды, отходам, выбросам и экологическому регулированию.",
        url: "https://www.adilet.zan.kz/rus/docs/K2100000400",
      },
    ],
  },
  {
    id: "analytics",
    heading: "Аналитические и информационные материалы",
    entries: [
      {
        title: "Основные экологические проблемы Казахстана",
        description:
          "Материалы о загрязнении воздуха, выбросах, водоёмах и экологических рисках.",
        url: "https://www.inform.kz/ru/osnovnye-istochniki-zagryazneniya-vozduha-v-kazahstane-nazvali-v-ministerstve-ekologii_a3707531",
      },
      {
        title: "Цифровая экология и экологические технологии Казахстана",
        description:
          "Материалы о цифровых технологиях в экологическом мониторинге и управлении природными ресурсами.",
        url: "https://centralasiaclimateportal.org/ru/",
      },
    ],
  },
  {
    id: "encyclopedia",
    heading: "Энциклопедические и ознакомительные источники",
    entries: [
      {
        title: "Wikipedia — Министерство экологии и природных ресурсов Казахстана",
        url: "https://ru.wikipedia.org/wiki/Министерство_экологии_и_природных_ресурсов_Казахстана",
      },
      {
        title: "Wikipedia — Региональный экологический саммит",
        url: "https://ru.wikipedia.org/wiki/Региональный_экологический_саммит",
      },
      {
        title: "Wikipedia — Карагандинский областной экологический музей",
        url: "https://ru.wikipedia.org/wiki/Карагандинский_областной_экологический_музей",
      },
      {
        title: "Wikipedia — Экология Казахстана",
        url: "https://ru.wikipedia.org/wiki/Экология_Казахстана",
      },
      {
        title: "Wikipedia — Аральское море",
        url: "https://ru.wikipedia.org/wiki/Аральское_море",
      },
      {
        title: "Wikipedia — Семипалатинский испытательный полигон",
        url: "https://ru.wikipedia.org/wiki/Семипалатинский_испытательный_полигон",
      },
    ],
  },
];

export const EXTRA_SOURCE_LINKS: { title: string; url: string }[] = [
  {
    title: "UNDP Kazakhstan — Environment and energy",
    url: "https://www.undp.org/kazakhstan/environment-and-energy",
  },
  {
    title: "UNESCO — Kazakhstan",
    url: "https://www.unesco.org/en/countries/kz",
  },
];
