import { environment } from 'src/environments/environment';

/*
 * Trust and detail content for the site: numbers, testimonials, client
 * logos, FAQ, equipment, case studies and the showreel.
 *
 * Anything marked `placeholder: true` was MADE UP as sample content. It shows
 * only in development builds (environment.showPlaceholderContent) and never in
 * production. Publishing invented reviews, clients or specs would mislead
 * customers (and fake reviews are illegal in Poland/the EU). To publish an
 * item, replace it with the real thing and set `placeholder: false`.
 */

interface Content {
  /** Made up; shown only in development builds until replaced */
  placeholder: boolean;
}

export interface Stat extends Content {
  value: string;
  label: string;
}

export interface Testimonial extends Content {
  quote: string;
  name: string;
  /** e.g. "Wesele" */
  eventType: string;
  /** Place and year, e.g. "Wrocław, 2025" */
  meta: string;
}

export interface ClientLogo extends Content {
  name: string;
  /** Path to the logo image; none yet, so a labelled box shows instead */
  logo?: string;
}

export interface FaqItem extends Content {
  question: string;
  answer: string;
}

export interface Equipment extends Content {
  name: string;
  specs: { label: string; value: string }[];
}

export interface CaseStudy extends Content {
  title: string;
  /** Place and year */
  meta: string;
  need: string;
  solution: string;
  /** Gallery category route, e.g. "imprezy-firmowe" */
  category: string;
}

export interface Video extends Content {
  /** The id from the YouTube link, e.g. youtube.com/watch?v=<id> */
  youtubeId: string;
  title: string;
}

/** Real business details; safe to publish */
export const BUSINESS = {
  name: 'MD LED Visual',
  city: 'Wrocław',
  area: 'cała Polska',
  years: 10,
  phone: '+48 795 641 741',
  phoneHref: 'tel:+48795641741',
  email: 'ledvisual@o2.pl',
};

export const STATS: Stat[] = [
  { value: '10 lat', label: 'doświadczenia w oprawie wydarzeń', placeholder: false },
  { value: '300+', label: 'zrealizowanych wydarzeń', placeholder: true },
  { value: 'do 40 m²', label: 'ekranu LED na jednym wydarzeniu', placeholder: true },
  { value: 'Cała Polska', label: 'z siedzibą we Wrocławiu', placeholder: false },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Ekran na weselu wyglądał świetnie, a montaż był gotowy, zanim przyjechali pierwsi goście. Zero stresu po naszej stronie.',
    name: 'Anna i Michał',
    eventType: 'Wesele',
    meta: 'Wrocław, 2025',
    placeholder: true,
  },
  {
    quote:
      'Transmisja z konferencji na dwa ekrany działała bez jednej przerwy. Ekipa była na miejscu cały dzień i reagowała na każdą zmianę w programie.',
    name: 'Katarzyna',
    eventType: 'Konferencja firmowa',
    meta: 'Poznań, 2025',
    placeholder: true,
  },
  {
    quote:
      'Telebim na festynie był dobrze widoczny nawet w pełnym słońcu. Szybki kontakt i jasna wycena od samego początku.',
    name: 'Tomasz',
    eventType: 'Festyn plenerowy',
    meta: 'Opole, 2024',
    placeholder: true,
  },
];

export const CLIENT_LOGOS: ClientLogo[] = Array.from({ length: 6 }, (_, i) => ({
  name: `Logo klienta ${i + 1}`,
  placeholder: true,
}));

export const FAQ: FaqItem[] = [
  {
    question: 'Z jakim wyprzedzeniem zarezerwować termin?',
    answer:
      'W sezonie, od maja do września, najlepiej 2–3 miesiące wcześniej, zwłaszcza na weekendy. Poza sezonem zwykle wystarczy kilka tygodni, a przy wolnym terminie przyjmujemy też zlecenia na ostatnią chwilę.',
    placeholder: true,
  },
  {
    question: 'Czy ekrany nadają się na wydarzenia plenerowe? Co, jeśli pada?',
    answer:
      'Tak. Ekrany plenerowe mają wysoką jasność i są odporne na deszcz (IP65). Przy silnym wietrze lub burzy decyzję o bezpieczeństwie podejmujemy razem z organizatorem.',
    placeholder: true,
  },
  {
    question: 'Jakie zasilanie jest potrzebne?',
    answer:
      'Zależnie od wielkości ekranu wystarczy gniazdo 230 V albo przyłącze siłowe 400 V w pobliżu. Jeśli na miejscu nie ma prądu, przywozimy agregat.',
    placeholder: true,
  },
  {
    question: 'Ile trwa montaż?',
    answer:
      'Mały ekran ustawiamy w około godzinę, duże konstrukcje plenerowe w 2–4 godziny. Przyjeżdżamy z zapasem czasu, żeby wszystko było gotowe przed gośćmi.',
    placeholder: true,
  },
  {
    question: 'Czy na wydarzeniu jest operator?',
    answer:
      'Tak, obsługa techniczna jest w cenie przez cały czas trwania wydarzenia. Operator pilnuje wyświetlanych treści i reaguje na zmiany w programie.',
    placeholder: true,
  },
  {
    question: 'Czy mogę wyświetlić własną prezentację albo transmisję na żywo?',
    answer:
      'Tak. Odtwarzamy prezentacje, filmy i zdjęcia z laptopa lub pendrive’a, a także obraz z kamer na żywo. Wystarczy przesłać materiały przed wydarzeniem.',
    placeholder: true,
  },
];

export const EQUIPMENT: Equipment[] = [
  {
    name: 'Ekran LED do wnętrz',
    specs: [
      { label: 'Rozstaw pikseli', value: 'P2.9' },
      { label: 'Jasność', value: '1 000 nitów' },
      { label: 'Rozmiary', value: 'od 2 × 1 m do 6 × 3 m' },
      { label: 'Do czego', value: 'konferencje, gale, wesela' },
    ],
    placeholder: true,
  },
  {
    name: 'Ekran LED plenerowy',
    specs: [
      { label: 'Rozstaw pikseli', value: 'P3.9' },
      { label: 'Jasność', value: '5 000 nitów' },
      { label: 'Odporność', value: 'IP65, deszcz i kurz' },
      { label: 'Rozmiary', value: 'do 8 × 5 m' },
    ],
    placeholder: true,
  },
  {
    name: 'Telebim mobilny na przyczepie',
    specs: [
      { label: 'Powierzchnia', value: '12 m²' },
      { label: 'Montaż', value: 'około 30 minut' },
      { label: 'Zasilanie', value: '230 V lub agregat' },
      { label: 'Do czego', value: 'festyny, sport, kampanie' },
    ],
    placeholder: true,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    title: 'Konferencja z transmisją na żywo',
    meta: 'Poznań · 2025',
    need: 'Firma potrzebowała ekranu za sceną i podglądu prelegentów dla 400 osób na sali.',
    solution:
      'Ekran 6 × 3 m z obrazem z dwóch kamer i prezentacjami, z operatorem przez cały dzień.',
    category: 'imprezy-firmowe',
    placeholder: true,
  },
  {
    title: 'Wesele w stodole pod Wrocławiem',
    meta: 'Dolny Śląsk · 2025',
    need: 'Para chciała pokazać film o sobie i zdjęcia gości na żywo, w sali bez sceny.',
    solution:
      'Ekran 3 × 2 m, oświetlenie dekoracyjne całej sali i ciężki dym na pierwszy taniec.',
    category: 'imprezy-prywatne',
    placeholder: true,
  },
  {
    title: 'Festyn miejski',
    meta: 'Opole · 2024',
    need: 'Miasto potrzebowało telebimu widocznego w dzień na placu dla kilku tysięcy osób.',
    solution:
      'Telebim mobilny na przyczepie, gotowy w pół godziny, z transmisją koncertu i komunikatami.',
    category: 'imprezy-plenerowe',
    placeholder: true,
  },
];

export interface Story extends Content {
  paragraphs: string[];
}

/** The About page's history; the real story replaces this */
export const ABOUT_STORY: Story = {
  paragraphs: [
    'Zaczynałem od jednego ekranu na lokalnych imprezach w okolicach Wrocławia. Z czasem doszły większe ekrany plenerowe, oświetlenie i efekty specjalne, a razem z nimi konferencje, festiwale i wesela w całej Polsce.',
    'Dziś każde wydarzenie prowadzę od pierwszej rozmowy do demontażu, z tą samą dbałością co na początku: sprzęt sprawdzony przed wyjazdem, zapas czasu na montaż i obsługa na miejscu do samego końca.',
  ],
  placeholder: true,
};

/** The About page's photo; none yet, so a labelled stand-in shows */
export const TEAM_PHOTO: Content & { src?: string; alt: string } = {
  alt: 'Zespół MD LED Visual przy ekranie LED',
  placeholder: true,
};

/** A real event, from the company's own YouTube channel (musicteam) */
export const SHOWREEL: Video = {
  youtubeId: 's2FHnMWDh48',
  title: 'Ekran LED, napis LOVE, fontanna iskier i niski dym',
  placeholder: false,
};

/** Keeps real items, and made-up ones only in development builds */
export function publishable<T extends Content>(items: T[]): T[] {
  return items.filter(
    (item) => !item.placeholder || environment.showPlaceholderContent,
  );
}

/** Whether a single made-up item may show */
export function isPublishable(item: Content): boolean {
  return !item.placeholder || environment.showPlaceholderContent;
}

/**
 * Whether the /oferta page (equipment, case studies, FAQ) has anything to
 * show; until it does, the menus leave out the link to it
 */
export const OFFER_PAGE_HAS_CONTENT = [EQUIPMENT, CASE_STUDIES, FAQ].some(
  (items: Content[]) => publishable(items).length > 0,
);
