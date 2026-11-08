export type NewsCategory =
  | "Oznam"
  | "Zákaz lovu"
  | "Pre rybárov"
  | "Preteky"
  | "Brigády";

export type WaterType = "Kaprový" | "Pstruhový" | "Lipňový";

export type NewsItem = {
  id: string;
  dateLabel: string;
  dateSort: string;
  category: NewsCategory;
  title: string;
  perex?: string;
  href: string;
  isNotice?: boolean;
  image?: string;
  imageAlt?: string;
  /** Real photo suitable for cropped featured card; posters stay false. */
  heroImage?: boolean;
  pdfHref?: string;
  pdfLabel?: string;
};

export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition?: string;
  caption?: string;
};

export type Water = {
  id: string;
  name: string;
  number: string;
  type: WaterType;
  description: string;
  wardenName: string;
  wardenPhone?: string;
  photo?: SiteImage;
  numberLabel?: "revir" | "useky";
  href?: string;
};

export type ContactPerson = {
  role: string;
  name: string;
  phone?: string;
  email?: string;
};

export type Warden = {
  area: string;
  name: string;
  phone?: string;
  phoneNote?: string;
};

export type PermitPrice = {
  name: string;
  price: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const site = {
  name: "SRZ MO Čadca",
  fullName: "Slovenský rybársky zväz – Miestna organizácia Čadca",
  shortOrg: "Slovenský rybársky zväz",
  email: "infosrzca@gmail.com",
  addressLines: [
    "Slovenský rybársky zväz – MO Čadca",
    "Rybársky dom, Horná 1108/35",
    "022 01 Čadca",
  ],
  saleAddress:
    "Rybársky dom, Horná 1108/35, Čadca – 1. poschodie, zasadačka.",
  facebookUrl: "https://www.facebook.com/srzcadca/",
  logo: {
    src: "/images/logo-srz-cadca.png",
    alt: "Logo Slovenského rybárskeho zväzu – Miestna organizácia Čadca",
  },
  hero: {
    image: "/images/hero-milosova.jpg",
    imageAlt: "Vodná nádrž Milošová",
    eyebrow: "Miestna organizácia Čadca · od roku 1945",
    title: "Staráme sa o kysucké vody",
    text: "Spravujeme vodnú nádrž Milošová, rybníky Svrčinovec a Čierne, Kysucu a pstruhové aj lipňové revíry. Ryby chováme vo vlastnej liahni a deti učíme rybárčiť.",
  },
  hatchery: {
    image: {
      src: "/images/liahen/odchovne-zlaby.jpg",
      alt: "Odchovné žľaby s plôdikom pstruha v liahni Rieka Čadca",
      width: 2000,
      height: 1500,
      objectPosition: "center 45%",
      caption: "Odchovné žľaby v liahni Rieka",
    },
    eyebrow: "Liaheň Rieka Čadca",
    title: "Vlastné ryby pre naše vody",
    text: "Od 80. rokov tu odchovávame pstruha potočného. Liaheň vyprodukovala milióny pstruhov a od roku 2022 prechádza obnovou – nové rozvody, sádky, odchovné žľaby a kruhové nádrže.",
  },
  clubAndRaces: {
    collage: {
      src: "/images/kruzok/detske-preteky-kolaz.jpg",
      alt: "Koláž fotografií z detských rybárskych pretekov",
      width: 1920,
      height: 600,
      caption: "Z detských pretekov našej organizácie – archív",
    },
    poster: {
      src: "/images/preteky/plagat-detske-preteky-2026.png",
      alt: "Plagát – Rybárske preteky detí v love na plávanú",
      width: 1254,
      height: 1254,
      href: "/aktuality/detske-preteky-jesen-2026",
    },
    clubText:
      "Krúžok je pre deti od 6 do 14 rokov. Prihlášku nájdete v tlačivách.",
    clubMeetingPlaceholder: "[doplniť: kedy a kde sa krúžok stretáva]",
    clubApplicationPdf: {
      label: "Prihláška do krúžku (PDF)",
      href: "https://www.srzrada.sk/wp-content/uploads/srzrada/rada_srz/tlaciva/tlaciva-prihlaska-do-kruzku-deti.pdf",
    },
    races: [
      "Detské preteky jeseň 2026",
      "Muškárske preteky – jeseň 2026",
      "CCM Milošová 2026",
    ],
  },
  mapsSearchUrl: "https://maps.app.goo.gl/T9zE1FdTucfwTo2MA",
  contactCardAddress: "Horná 1108/35, 022 01 Čadca",
  contactOrgLine: "Slovenský rybársky zväz – MO Čadca",
  footerContactAddressLines: ["Rybársky dom, Horná 1108/35", "022 01 Čadca"],
  /** Concrete sale dates when the board publishes them; empty → show notice + link. */
  saleDates: "",
  salePosterPdf: {
    label: "Informácie Rady SRZ k predaju (PDF)",
    href: "/uploads/2026/11/srz_a3_infoplagat-hoaxy-2.pdf",
  },
  memberFeeValue: "Zaplatiť do 31. marca",
  memberFeeDeadline: "Členský príspevok je potrebné zaplatiť do 31. marca.",
  saleChecklist: [
    "Občiansky preukaz (u maloletých rodný list)",
    "Vyplnenú žiadosť o pridelenie ID člena",
    "Záznam o úlovkoch za predchádzajúci rok",
  ],
  saleContact: {
    name: "Milan Krkoška st.",
    phone: "0904 342 155",
  },
};

export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("421")) return `tel:+${digits}`;
  if (digits.startsWith("0")) return `tel:+421${digits.slice(1)}`;
  return `tel:+421${digits}`;
}

export const news: NewsItem[] = [
  {
    id: "predaj-povoleni-2027",
    dateLabel: "2. 11. 2026",
    dateSort: "2026-11-02",
    category: "Oznam",
    title: "Informácie k predaju povolení",
    perex:
      "Zverejňujeme informácie Rady SRZ o predaji povolení na rok 2027. Plagát A3 na stiahnutie.",
    href: "/aktuality/informacie-k-predaji-povoleni",
    isNotice: true,
    image: "/images/aktuality/predaj-povoleni.jpg",
    imageAlt: "Informačný plagát k predaju povolení 2027",
    heroImage: false,
    pdfHref: "/uploads/2026/11/srz_a3_infoplagat-hoaxy-2.pdf",
    pdfLabel: "Plagát (PDF)",
  },
  {
    id: "e-srz",
    dateLabel: "14. 10. 2026",
    dateSort: "2026-10-14",
    category: "Pre rybárov",
    title: "Prihlásenie do aplikácie E-SRZ",
    href: "/aktuality/prihlasenie-do-aplikacie-e-srz",
  },
  {
    id: "sbirolino",
    dateLabel: "12. 10. 2026",
    dateSort: "2026-10-12",
    category: "Pre rybárov",
    title: "Lov rýb pomocou sbirolina a bubliny",
    href: "/aktuality/lov-ryb-pomocou-sbirolina-a-bubliny",
  },
  {
    id: "zakaz-lovu",
    dateLabel: "20. 9. 2026",
    dateSort: "2026-09-20",
    category: "Zákaz lovu",
    title: "Zákaz lovu všetkých druhov rýb",
    href: "/aktuality/zakaz-lovu-vsetkych-druhov-ryb-4",
  },
  {
    id: "detske-preteky",
    dateLabel: "12. 9. 2026",
    dateSort: "2026-09-12",
    category: "Preteky",
    title: "Detské preteky jeseň 2026",
    href: "/aktuality/detske-preteky-jesen-2026",
  },
];

export function getLatestNotice(): NewsItem | undefined {
  return news
    .filter((item) => item.isNotice)
    .sort((a, b) => b.dateSort.localeCompare(a.dateSort))[0];
}

export function getHomepageNews(): {
  featured: NewsItem | undefined;
  list: NewsItem[];
} {
  const sorted = [...news].sort((a, b) => b.dateSort.localeCompare(a.dateSort));
  const featured =
    sorted.find((item) => item.isNotice) ?? sorted[0];
  const list = sorted.filter((item) => item.id !== featured?.id).slice(0, 4);
  return { featured, list };
}

export const waters: Water[] = [
  {
    id: "milosova",
    name: "VN Milošová",
    number: "3-3440-1-1",
    type: "Kaprový",
    description: "Vodná plocha cca 3 ha, postavená v roku 1987.",
    wardenName: "Milan Krkoška ml.",
    wardenPhone: "0907 633 033",
    href: "/reviry/vn-milosova",
    photo: {
      src: "/images/reviry/vn-milosova.jpg",
      alt: "Vodná nádrž Milošová",
      width: 800,
      height: 600,
      objectPosition: "center",
    },
  },
  {
    id: "svrcinovec",
    name: "Rybník Svrčinovec",
    number: "3-3520-1-1",
    type: "Kaprový",
    description: "Bočná vodná nádrž pri obci Svrčinovec, cca 2 ha.",
    wardenName: "Peter Krkoška",
    wardenPhone: "0914 215 465",
    href: "/reviry/rybnik-svrcinovec",
    photo: {
      src: "/images/reviry/rybnik-svrcinovec.jpg",
      alt: "Rybník Svrčinovec",
      width: 800,
      height: 600,
      objectPosition: "center",
    },
  },
  {
    id: "cierne",
    name: "Rybník Čierne",
    number: "3-0530-1-1",
    type: "Kaprový",
    description: "Bočná vodná nádrž v obci Čierne, cca 1 ha.",
    wardenName: "Roman Mikula",
    wardenPhone: "0908 563 111",
    href: "/reviry/rybnik-cierne",
    photo: {
      src: "/images/reviry/rybnik-cierne.jpg",
      alt: "Rybník Čierne",
      width: 800,
      height: 600,
      objectPosition: "center",
    },
  },
  {
    id: "kysuca-3",
    name: "Kysuca č. 3",
    number: "3-1850-1-1",
    type: "Kaprový",
    description:
      "Od ústia Bystrice v Krásne nad Kysucou po ústie potoka Olešnianka.",
    wardenName: "[doplniť]",
    href: "/reviry/kysuca-c-3",
    photo: {
      src: "/images/reviry/kysuca-c-3.jpg",
      alt: "Rieka Kysuca – revír Kysuca č. 3",
      width: 800,
      height: 600,
      objectPosition: "center",
    },
  },
  {
    id: "pstruhove",
    name: "Revíry pstruhové",
    number: "9",
    numberLabel: "useky",
    type: "Pstruhový",
    description: "Vychylovka, Oščadnica, Raková, Čadečanka, Trstená a ďalšie.",
    wardenName: "podľa úseku",
    href: "/reviry/reviry-pstruhove",
    photo: {
      src: "/images/reviry/reviry-pstruhove.jpg",
      alt: "Pstruhový revír",
      width: 800,
      height: 600,
      objectPosition: "center",
    },
  },
  {
    id: "lipnove",
    name: "Revíry lipňové",
    number: "3",
    numberLabel: "useky",
    type: "Lipňový",
    description: "Čierňanka č. 1, Bystrica č. 1a (CHAP) a Bystrica č. 1b.",
    wardenName: "podľa úseku",
    href: "/reviry/reviry-lipnove",
    photo: {
      src: "/images/reviry/reviry-lipnove.jpg",
      alt: "Lipňový revír",
      width: 800,
      height: 600,
      objectPosition: "center",
    },
  },
];

export const adultPermitPreview: PermitPrice[] = [
  { name: "Členská známka", price: "35 €" },
  { name: "Miestna kaprová + mimoriadna známka", price: "70 € + 5 €" },
  { name: "Miestna pstruhová", price: "30 €" },
  { name: "Miestna lipňová", price: "35 €" },
  { name: "Neodpracovaná brigáda", price: "100 €" },
];

export const permitPrices: PermitPrice[] = [
  { name: "Miestna kaprová + Mimoriadna známka", price: "70 € + 5 €" },
  { name: "Zväzová kaprová (samostatne nepredajné)", price: "75 €" },
  { name: "Členská známka", price: "35 €" },
  { name: "Miestna lipňová", price: "35 €" },
  { name: "Zväzová lipňová", price: "70 €" },
  { name: "Miestna pstruhová", price: "30 €" },
  { name: "Neodpracovaná brigáda", price: "100 €" },
  { name: "Miestna kaprová detská", price: "14 €" },
  { name: "Zväzová kaprová detská (5–15 r.)", price: "15 €" },
  { name: "Miestna kaprová (3–5 r.)", price: "0 €" },
  { name: "Zväzová kaprová (3–5 r.)", price: "1 €" },
  { name: "Členská známka mládež (15–17 r.)", price: "17 €" },
  { name: "Členská známka detská (3–14 r.)", price: "3 €" },
  { name: "Miestna pstruhová detská", price: "15 €" },
  { name: "Miestna lipňová detská", price: "17 €" },
];

export const committeeContacts: ContactPerson[] = [
  {
    role: "Predseda MO",
    name: "Ing. Marián Sihelník",
    phone: "0951 362 741",
  },
  {
    role: "Tajomník MO",
    name: "Milan Krkoška ml.",
    email: "infosrzca@gmail.com",
  },
  {
    role: "Hospodár MO",
    name: "Ing. Karol Hausman",
    phone: "0905 935 201",
  },
  {
    role: "Predaj povolení",
    name: "Milan Krkoška st.",
    phone: "0904 342 155",
  },
];

export const wardens: Warden[] = [
  {
    area: "VN Milošová",
    name: "Milan Krkoška ml.",
    phone: "0907 633 033",
  },
  {
    area: "Rybník Čierne / Čierňanka",
    name: "Roman Mikula",
    phone: "0908 563 111",
  },
  {
    area: "Rybník Svrčinovec",
    name: "Peter Krkoška",
    phone: "0914 215 465",
  },
  {
    area: "Oščadnica",
    name: "Dušan Batorek",
    phone: "0915 756 199",
  },
  {
    area: "Rakovka lovný revír",
    name: "Ing. František Kučák",
    phone: "0940 003 335",
  },
  {
    area: "Raková Kysuca",
    name: "František Hnidka",
    phone: "0907 812 033",
  },
  {
    area: "Staškov Kysuca a prítoky",
    name: "Jozef Zahatlan",
    phone: "0907 850 940",
  },
  {
    area: "Bystrica Veľký potok",
    name: "Milan Cáder",
    phone: "0905 514 887",
  },
  {
    area: "Vychylovka",
    name: "Peter Kubatka",
    phone: "0905 793 849",
  },
  {
    area: "Stará Bystrica",
    name: "Lukáš Belko",
    phone: "0948 878 096",
  },
  {
    area: "Raková Korcháň",
    name: "Stanislav Hanulak",
    phone: "0905 164 838",
  },
  {
    area: "Klubinský potok",
    name: "Ing. Martin Kasák",
    phone: "902482604",
    phoneNote: "[overiť číslo: 902482604]",
  },
  {
    area: "Rieka Čadca / Liaheň Rieka",
    name: "Marcel Vorek",
    phone: "0915 269 599",
  },
  {
    area: "Ladunkovský potok / Kriváč",
    name: "Ing. Roman Nieslaník",
    phone: "0905 477 635",
  },
  {
    area: "Rakovka chovný / Zákopčie a chovné potoky",
    name: "Miroslav Kovalíček",
    phone: "0903 488 749",
  },
  {
    area: "Bystričanka Zborov a prítoky",
    name: "Filip Kubeň",
    phone: "0904 811 374",
  },
];

export const mainNav: NavItem[] = [
  { label: "Povolenia", href: "/povolenia" },
  { label: "Revíry", href: "/reviry" },
  { label: "Aktuality", href: "/aktuality" },
  { label: "Brigády", href: "/brigady" },
  { label: "Liaheň", href: "/liahen" },
  {
    label: "Pre rybárov",
    href: "/pre-rybarov",
    children: [
      { label: "Miestny poriadok", href: "/miestny-poriadok" },
      { label: "Legislatíva", href: "/legislativa" },
      { label: "Tlačivá", href: "/tlaciva" },
      { label: "Zarybňovanie revírov", href: "/zarybnovanie" },
      { label: "Členská schôdza", href: "/clenska-schodza" },
      { label: "Výbor a kontrolná komisia", href: "/vybor" },
      { label: "Rybársky krúžok", href: "/kruzok" },
      { label: "Preteky", href: "/preteky" },
      { label: "Rybársky ples", href: "/ples" },
      { label: "2 % dane", href: "/2-percenta" },
      { label: "Straty a nálezy", href: "/straty-a-nalezy" },
      { label: "História", href: "/historia" },
    ],
  },
  { label: "Kontakt", href: "/kontakt" },
];

export const quickTiles = [
  {
    href: "/povolenia",
    title: "Povolenia a cenník",
    text: "Termíny, ceny a tlačivá",
    icon: "permits" as const,
  },
  {
    href: "/reviry",
    title: "Revíry",
    text: "Čísla revírov a hospodári",
    icon: "waters" as const,
  },
  {
    href: "/brigady",
    title: "Brigády",
    text: "Plán brigád na tento rok",
    icon: "work" as const,
  },
  {
    href: "/kontakt",
    title: "Kontakty",
    text: "Výbor, predaj a hospodári",
    icon: "contacts" as const,
  },
];

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Pre rybárov",
    links: [
      { label: "Miestny poriadok", href: "/miestny-poriadok" },
      { label: "Legislatíva", href: "/legislativa" },
      { label: "Tlačivá", href: "/tlaciva" },
      { label: "Straty a nálezy", href: "/straty-a-nalezy" },
    ],
  },
  {
    title: "Organizácia",
    links: [
      { label: "Výbor a kontrolná komisia", href: "/vybor" },
      { label: "Členská schôdza", href: "/clenska-schodza" },
      { label: "História", href: "/historia" },
      { label: "Rybársky ples", href: "/ples" },
    ],
  },
  {
    title: "Podporte nás",
    links: [
      { label: "2 % dane pre SRZ MO Čadca", href: "/2-percenta" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/srzcadca/",
        external: true,
      },
    ],
  },
];

export const stubPages: { path: string; title: string }[] = [
  { path: "/aktuality", title: "Aktuality" },
  { path: "/reviry", title: "Revíry" },
  { path: "/brigady", title: "Brigády" },
  { path: "/liahen", title: "Liaheň Rieka Čadca" },
  { path: "/preteky", title: "Preteky" },
  { path: "/tlaciva", title: "Tlačivá" },
  { path: "/pre-rybarov", title: "Pre rybárov" },
  { path: "/miestny-poriadok", title: "Miestny poriadok" },
  { path: "/legislativa", title: "Legislatíva" },
  { path: "/zarybnovanie", title: "Zarybňovanie revírov" },
  { path: "/clenska-schodza", title: "Členská schôdza" },
  { path: "/vybor", title: "Výbor a kontrolná komisia" },
  { path: "/kruzok", title: "Rybársky krúžok" },
  { path: "/ples", title: "Rybársky ples" },
  { path: "/dane", title: "2 % dane" },
  { path: "/straty-a-nalezy", title: "Straty a nálezy" },
  { path: "/historia", title: "História" },
  { path: "/zasady-cookies", title: "Zásady cookies" },
];
