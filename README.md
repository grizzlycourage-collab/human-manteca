# Human Manteca

Static numerology and self-diagnostics web project with a central hub and multiple independent systems.

## Project overview

This project is a static HTML/CSS/JS website built without a framework. It includes:

- a home hub with a carousel and language selector
- several independent numerology/self-analysis systems
- shared utility functions for the numerology core
- centralized system image mapping

Main project files:

- [index.html](index.html) – hub page and carousel navigation
- [js/common-systems.js](js/common-systems.js) – shared numerology helpers
- [js/system-images.js](js/system-images.js) – central system-to-image mapping
- [js/carousel.js](js/carousel.js) – carousel behavior
- [css/](css/) – shared styling
- [systems/](systems/) – individual system pages
- [images/](images/) – project graphics

## Shared numerology core

The working codebase keeps a common numerology foundation in [js/common-systems.js](js/common-systems.js). This is the standard shared by most systems, but each system still adds its own final interpretation and output logic.

Base functions:

- numerologySum(str)
  - sums all digits in the string
  - reduces repeatedly while result is greater than 9, except for master numbers 11, 22, 33
- nameToNumber(name)
  - converts letters to numerological values using the project’s Slovak/Czech mapping
  - reduces the final sum using the same rule as above
- getVowelsSum(name)
  - sums vowel values only
- getConsonantsSum(name)
  - sums consonant values only
- getAdjustedDate(year, month, day, daysOffset)
  - shifts a date by a given number of days and returns a compact YYYMMDD value
- getBirthdayNumber(day)
  - numerologySum(String(day))
- getChallenge(day, month)
  - abs(day - month), then numerologySum(String(diff))
- getMaturity(lifePath, destiny)
  - numerologySum(String(lifePath + destiny))
- getPersonalYear(day, month, year)
  - numerologySum(String(day) + String(month) + String(currentYear))
- getPersonalMonth(personalYear)
  - numerologySum(String(personalYear) + String(currentMonth))
- getPersonalDay(personalYear, personalMonth)
  - numerologySum(String(personalYear) + String(personalMonth) + String(currentDay))

Important rule: the project intentionally preserves working behavior. The same helper functions are shared, but not every system is forced into one identical output format.

## System-by-system calculation inventory

### 1) Anatómia Tieňa
File: [systems/anatomia-tiena/index.html](systems/anatomia-tiena/index.html)

Uses the shared numerology core and adds these outputs:

- life path / life path number
- design / destiny-style value
- soul urge from vowels
- personality from consonants
- challenge
- maturity
- personal year / personal month / personal day

This system is a classic life-path profile with shadow interpretation and daily/periodic guidance.

### 2) Zrkadlo Bytia
File: [systems/zrkadlo-bytia/index.html](systems/zrkadlo-bytia/index.html)

This uses the same core logic as the anatomy-style modules:

- numerologySum
- nameToNumber
- vowels / consonants
- personal year / month / day
- challenge
- maturity

Its final output is oriented toward self-reflection, inner truth, and life mirror interpretation rather than a completely different numerical standard.

### 3) Integrita Navigácia
File: [systems/integrita-navigacia/index.html](systems/integrita-navigacia/index.html)

Uses the same numerology foundation and then layers in:

- life path
- destiny / directional value
- soul urge and personality values
- personal year / month / day
- challenge and maturity
- integrity trigger / decoding / redirection logic

This is an action-oriented integrity system; numerically it stays within the shared pattern, but the output is framed as decision and alignment guidance.

### 4) Emočný kompas
File: [systems/emocny-kompas/index.html](systems/emocny-kompas/index.html)

This system includes:

- numerologySum
- nameToNumber
- vowels / consonants
- getBirthdayNumber(day)
- challenge
- maturity
- personal year / month / day
- additional time-based emotional diagnostics based on current date/time

The “emotional compass” is not a distinct numerology formula family; it is the shared core with a more dynamic emotional context layer.

### 5) Live Core & Moon Matrix
File: [systems/live-core-moon/index.html](systems/live-core-moon/index.html)

This is the most extended system. It keeps the same numerology base and adds:

- birthday number
- challenge
- maturity
- personal year / month / day
- moon phase context
- seasonal cycle context
- live core / emotional and energetic synthesis

This system is numerology + lunar + seasonal interpretation, but it remains built on the same foundational calculations.

### 6) Nebeský kompas
File: [systems/nebesky-kompas/index.html](systems/nebesky-kompas/index.html)

Uses:

- numerologySum
- nameToNumber
- vowels / consonants
- birthday number
- challenge
- maturity
- personal year / month / day
- astro/cosmic interpretation layer

It keeps the same foundations but interprets the results through a celestial navigation lens.

### 7) Vzťahový kompas
File: [systems/vztahovy-kompas/index.html](systems/vztahovy-kompas/index.html)

This is the only system that truly works with two people simultaneously.

It computes core values for both persons separately, then combines them for relationship interpretation:

- life path A and B
- destiny A and B
- soul urge A and B
- personality A and B
- challenge A and B
- maturity A and B
- personal year / month / day for each person
- relationship metrics such as chemistry, bond, conflict, karma, work, potential, and overall compatibility

The relationship scores are derived from combined numerological values rather than a different master formula. This is why the system remains unique and should not be flattened into the same output pattern as the others.

## Why there is no single universal standard

The project does not use one single numerology framework for all modules because each system answers a different question:

- life path / shadow analysis
- emotional orientation
- integrity and decision-making
- lunar and live energy context
- relationship compatibility

The technical commonality is the numerology engine, but the interpretation layer is intentionally different per system. This is the current working design and preserving it is the safest approach.

## Home hub and language selector

The home page in [index.html](index.html) includes:

- a carousel with system cards
- language selector buttons in the top area
- consistent card metadata and image mapping via [js/system-images.js](js/system-images.js)
- styling in [css/hub.css](css/hub.css)

## Local development

Serve the folder locally from the project root, for example:

- python3 -m http.server 8000

Then open:

- http://127.0.0.1:8000/

## Notes

- The shared logic is centralized in [js/common-systems.js](js/common-systems.js).
- The system image mapping is centralized in [js/system-images.js](js/system-images.js).
- The project is intentionally designed to preserve the current calculation behavior while standardizing naming and presentation where needed.
- The existing system formulas should be treated as the source of truth unless a specific change request says otherwise.
