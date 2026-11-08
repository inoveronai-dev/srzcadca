# Open items – SRZ MO Čadca website

## Pred spustením (ešte neaktívne)

- Nastaviť `NEXT_PUBLIC_HIDE_PLACEHOLDERS=true` pred launchom – skryje riadky s `[doplniť` (default `false` na review).

## Stále doplniť

- Hospodár revíru Kysuca č. 3 – chýba.
- Termíny predaja povolení 2027 – podľa oznamu Rady SRZ / výboru (v importe je len infoplagát PDF, bez konkrétnych dátumov predaja v MO).
- Krúžok – kedy a kde sa stretáva, kontakt na vedúceho (WP stránka `/rybarsky-kruzok` obsahuje len archív pretekov, nie rozvrh).
- [Overiť ceny na rok 2027] – cenník je zatiaľ označený ako Cenník 2026.
- Klubinský potok – telefón hospodára „902482604“ je neúplný.

## Rozpory na pôvodnom webe

- **Bystrica č. 1a:** na stránke revíru `3-0380-5-1`, v miestnom poriadku `3-0380-5-4` (**použité: `3-0380-5-4` z miestneho poriadku – overiť**).
- **Klubinský potok (3-0392-4-2):** v miestnom poriadku má popis skopírovaný z Capkovho potoka.
- **Miestny poriadok:** „Platný od 01. 01. 2024“ vs. „s účinnosťou od 1. 1. 2023“, PDF je označené 2023.
- **Liaheň:** na stránke liahne „postavená v 80. rokoch“, v histórii „1947: Liaheň v Čadci – časť Rieka“.

## Import / media

- **Stav (2026-11-07):** import dokončený – **193** postov, **29** stránok, **6** portfolio (revíry). Presmerovania: `content/redirects.json` (načítané v `next.config.ts`). Súhrn: `content/import-summary.json`.
- Stiahnuté súbory: 41 nových (+ 127 už existujúcich / skip).
- **Nepodarilo sa stiahnuť:** ~527 unikátnych súborov (veľa WP size variantov) – zoznam v `content/failed-media.txt`. Dominantne staršie galérie a brigádne fotky 2020–2022, plus časť MVIMG z 2026/02. Markdown text je importovaný; chýbajúce obrázky ukazujú broken `/uploads/...` alebo pôvodné URL.
- Odporúčanie: `SKIP_MEDIA=0 node scripts/import-wp.mjs` s lepším sieťovým prístupom / retry len pre `failed-media.txt` (najprv full-size bez `-WxH`).

## WordPress stránky mimo menu (nebudované)

Tieto stránky na pôvodnom webe existujú, ale nie sú v navigácii – podľa zadania sa **nestavali**:

- `/rezervacie` – rezervácie (formulár / info o rezerváciách)
- `/podnety-a-pripomienky` – podnety a pripomienky
- `/ulovky-na-reviroch-mo` – úlovky na revíroch MO
