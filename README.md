# The Human Maintenance

**Self-diagnostic ecosystem** – statický web s numerologickými a psychologickými diagnostickými nástrojmi.

---

## 🧭 Prehľad projektu

Tento projekt je **statická webová aplikácia** postavená na čistom HTML, CSS a JavaScripte. Bez frameworkov, bez build procesov, bez backendu.

Obsahuje:
- **Centrálny hub** (`index.html`) s karuselom a jazykovým prepínačom (SK, EN, DE, CZ)
- **6 samostatných diagnostických systémov** v priečinku `systems/`
- **Zdieľané numerologické funkcie** v `js/common-systems.js`
- **Centrálne mapovanie obrázkov** v `js/system-images.js`
- **Responzívny dizajn** prispôsobený pre desktop, tablet aj mobil

---

## 📁 Štruktúra projektu
human-manteca/
├── index.html # Hlavný hub – karusel so všetkými systémami
├── README.md # Tento súbor
│
├── css/
│ ├── base.css # Základné štýly, responzivita, tlačidlá
│ ├── carousel.css # Štýly pre karusel
│ ├── hub.css # Štýly pre hlavnú stránku
│ ├── system.css # Spoločné štýly pre systémy
│ └── variables.css # CSS premenné (farby, typografia)
│
├── js/
│ ├── carousel.js # JavaScript pre karusel (posúvanie, swipe)
│ ├── common-systems.js # Zdieľané numerologické funkcie
│ └── system-images.js # Centrálne mapovanie obrázkov pre systémy
│
├── images/
│ ├── logo-projektu.png # Hlavné logo
│ ├── AnatomiaTiena2.png # Obrázok pre Anatómiu Tieňa
│ ├── pocitovykompas.png # Obrázok pre Emočný kompas
│ ├── integrity.png # Obrázok pre Navigátor Integrity
│ ├── metrix.png # Obrázok pre Live Core & Moon Matrix
│ ├── nebeskykompas.png # Obrázok pre Nebeský kompas (archív)
│ ├── vztahovykompas.png # Obrázok pre Vzťahový kompas
│ └── ZrkadloBytia1.0.png # Obrázok pre Zrkadlo Bytia
│
├── sources/ # Pôvodné HTML súbory (archív, referenčné)
│ ├── anatomia_tiena.html
│ ├── emocny_kompas.html
│ ├── integrita_navigacia.html
│ ├── live_core_moon.html
│ ├── nebesky_kompas.html
│ ├── vstahovy_kompas.html
│ └── zrkadlo_bytia.html
│
└── systems/ # Jednotlivé systémy (každý v samostatnom priečinku)
├── anatomia-tiena/
│ └── index.html
├── emocny-kompas/
│ └── index.html
├── integrita-navigacia/
│ └── index.html
├── live-core-moon/
│ └── index.html
├── nebesky-kompas/
│ └── index.html # (archív, nie je v hub-e)
├── vztahovy-kompas/
│ └── index.html
└── zrkadlo-bytia/
└── index.html

text

---

## 🧮 Zdieľané numerologické funkcie

Všetky systémy používajú spoločné numerologické funkcie z `js/common-systems.js`:

| Funkcia | Popis |
|---------|-------|
| `numerologySum(str)` | Sčíta číslice v reťazci a redukuje na jednociferné číslo (okrem 11, 22, 33) |
| `nameToNumber(name)` | Prevedie meno na číslo podľa numerologickej mapy (podpora diakritiky) |
| `getVowelsSum(name)` | Sčíta iba samohlásky v mene |
| `getConsonantsSum(name)` | Sčíta iba spoluhlásky v mene |
| `getAdjustedDate(y,m,d,offset)` | Posunie dátum o daný počet dní a vráti vo formáte YYYYMMDD |
| `getBirthdayNumber(day)` | Numerologický súčet dňa narodenia |
| `getChallenge(day, month)` | Výzva – numerologický súčet rozdielu dňa a mesiaca |
| `getMaturity(lifePath, destiny)` | Zrelosť – numerologický súčet životnej cesty a osudu |
| `getPersonalYear(day, month, year)` | Osobný rok |
| `getPersonalMonth(personalYear)` | Osobný mesiac |
| `getPersonalDay(personalYear, personalMonth)` | Osobný deň |

---

## 🧩 Prehľad systémov

| # | Systém | Popis |
|---|--------|-------|
| 01 | **Anatómia Tieňa** | Mapa nevedomých vzorcov, spúšťačov a obranných mechanizmov. |
| 02 | **Emočný kompas** | Orientácia v aktuálnom emočnom poli – porovnáva pocity teraz a pred 3 minútami. |
| 03 | **Vzťahový kompas** | Dynamika medzi dvoma ľuďmi – kompatibilita, napätia, karmické prepojenie. |
| 04 | **Navigátor Integrity** | Diagnostika súladu medzi hodnotami, slovami a činmi. |
| 05 | **Live Core & Moon Matrix** | Živý prehľad energetického jadra, mesačných cyklov a sezón. |
| 06 | **Zrkadlo Bytia** | Celostný odraz aktuálneho stavu bytia – 8 častí od detstva po budúcnosť. |

> **Poznámka:** Systém **Nebeský kompas** existuje v priečinku `systems/nebesky-kompas/`, ale **nie je zobrazený v hlavnom hub-e** (bol odstránený podľa požiadavky).

---

## 🚀 Lokálny vývoj

### 1. Spustenie servera

```bash
python3 -m http.server 8000
2. Otvorenie v prehliadači
text
http://localhost:8000
3. Prístup k jednotlivým systémom
Systém	URL
Anatómia Tieňa	/systems/anatomia-tiena/
Emočný kompas	/systems/emocny-kompas/
Vzťahový kompas	/systems/vztahovy-kompas/
Navigátor Integrity	/systems/integrita-navigacia/
Live Core & Moon	/systems/live-core-moon/
Zrkadlo Bytia	/systems/zrkadlo-bytia/
🎨 Dizajn a responzivita
Desktop (> 1024px): Karusel zobrazuje 4 karty naraz.

Tablet (768–1024px): Karusel zobrazuje 2 karty naraz.

Mobile (< 768px): Karusel zobrazuje 1 kartu naraz.

Všetky systémy sú plne responzívne:

Formuláre sa na mobile roztiahnu na celú šírku.

Tlačidlá sú dostatočne veľké na pohodlné kliknutie.

Selecty (Deň, Mesiac, Rok) sú čitateľné a použiteľné.

🌐 Jazyková podpora
Každý systém podporuje 4 jazyky:

SK – slovenčina

EN – angličtina

DE – nemčina

CZ – čeština

Jazyk sa prepína pomocou tlačidiel v hornej časti každého systému.

📝 Poznámky k vývojovému zámeru
Projekt nemá jeden univerzálny numerologický štandard – každý systém odpovedá na inú otázku:

Anatómia Tieňa → životná cesta a tieňové vzorce

Emočný kompas → aktuálny emocionálny stav

Vzťahový kompas → kompatibilita dvoch ľudí

Integrita → súlad slov a činov

Live Core → energetické a mesačné cykly

Zrkadlo Bytia → celostný odraz bytia

Technickým základom je numerologický engine, ale interpretačná vrstva je zámerne odlišná pre každý systém. Tento prístup je zachovaný a je považovaný za súčasť návrhu.

📦 Stav projektu
Položka	Stav
Centrálny hub	✅ Funkčný, karusel zobrazuje 6 systémov
Všetky systémy	✅ Funkčné na desktop, tablet aj mobile
Responzivita	✅ Plne implementovaná
Zdieľané numerologické funkcie	✅ Centralizované v common-systems.js
Tlačidlo Späť dole	✅ Vo všetkých systémoch
Nebeský kompas	✅ Odstránený z hubu (archív)
Vzťahový kompas	✅ Viditeľný na desktope na 3. mieste
Jazyková podpora	✅ 4 jazyky vo všetkých systémoch
🤝 Licencia
Tento projekt je súkromný / interný. Pre viac informácií kontaktuj autora.

