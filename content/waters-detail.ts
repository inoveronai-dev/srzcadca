/** Structured revír data from miestny poriadok + portfolio pages. */

export type WaterGroupItem = {
  name: string;
  number?: string;
  description?: string;
  wardenName?: string;
  wardenPhone?: string;
  href?: string;
};

export type WaterGroup = {
  title: string;
  items: WaterGroupItem[];
};

export const waterGroups: WaterGroup[] = [
  {
    title: "Kaprové vody",
    items: [
      {
        name: "VN Milošová",
        number: "3-3440-1-1",
        description: "Vodná plocha cca 3 ha, postavená v roku 1987.",
        wardenName: "Milan Krkoška ml.",
        wardenPhone: "0907 633 033",
        href: "/reviry/vn-milosova",
      },
      {
        name: "Rybník Svrčinovec",
        number: "3-3520-1-1",
        description: "Bočná vodná nádrž pri obci Svrčinovec, cca 2 ha.",
        wardenName: "Peter Krkoška",
        wardenPhone: "0914 215 465",
        href: "/reviry/rybnik-svrcinovec",
      },
      {
        name: "Rybník Čierne",
        number: "3-0530-1-1",
        description: "Bočná vodná nádrž v obci Čierne, cca 1 ha.",
        wardenName: "Roman Mikula",
        wardenPhone: "0908 563 111",
        href: "/reviry/rybnik-cierne",
      },
      {
        name: "Kysuca č. 3",
        number: "3-1850-1-1",
        description:
          "Od ústia Bystrice v Krásne nad Kysucou po ústie potoka Olešnianka.",
        wardenName: "[doplniť]",
        href: "/reviry/kysuca-c-3",
      },
    ],
  },
  {
    title: "Pstruhové vody",
    items: [
      {
        name: "Revíry pstruhové (9 úsekov)",
        description: "Vychylovka, Oščadnica, Raková, Čadečanka, Trstená a ďalšie.",
        wardenName: "podľa úseku",
        href: "/reviry/reviry-pstruhove",
      },
    ],
  },
  {
    title: "Lipňové vody",
    items: [
      {
        name: "Revíry lipňové (3 úseky)",
        description: "Čierňanka č. 1, Bystrica č. 1a (CHAP) a Bystrica č. 1b.",
        wardenName: "podľa úseku",
        href: "/reviry/reviry-lipnove",
      },
      {
        name: "Bystrica č. 1a (CHAP)",
        number: "3-0380-5-4",
        description: "Číslo podľa miestneho poriadku (pozri OPEN_ITEMS – rozpory).",
      },
    ],
  },
  {
    title: "Chovné potoky – lov zakázaný",
    items: [
      {
        name: "Chovné potoky",
        description:
          "Zoznam a popis podľa Miestneho rybárskeho poriadku – lov je zakázaný.",
      },
    ],
  },
];

export const waterSlugs = [
  "vn-milosova",
  "rybnik-svrcinovec",
  "rybnik-cierne",
  "kysuca-c-3",
  "reviry-pstruhove",
  "reviry-lipnove",
] as const;
