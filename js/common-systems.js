// ================================================================
// COMMON SYSTEMS – numerologické funkcie pre všetky systémy
// ================================================================

(function() {
    'use strict';

    const pageKey = (window.location.pathname.match(/\/systems\/([^/]+)\/index\.html$/) || [,'hub'])[1] || 'hub';
    const debugState = window.__HM_DEBUG__ || (window.__HM_DEBUG__ = { entries: [] });
    const debug = {
        add(eventName, payload) {
            const entry = {
                time: new Date().toISOString(),
                page: pageKey,
                event: eventName,
                payload: payload || null
            };
            debugState.entries.push(entry);
            console.log('[HM DEBUG]', eventName, payload || '');
            return entry;
        },
        get() {
            return [...debugState.entries];
        },
        clear() {
            debugState.entries = [];
        }
    };
    window.__HM_DEBUG__ = debugState;
    window.__HM_LOG__ = function(eventName, payload) {
        return debug.add(eventName, payload);
    };
    window.__HM_TRACK_SYSTEM_USAGE__ = function(systemKey, nextCount) {
        const key = systemKey || pageKey;
        const counters = window.__HM_SYSTEM_USAGE__ || (window.__HM_SYSTEM_USAGE__ = {});
        const value = typeof nextCount === 'number' ? nextCount : (counters[key] || 0) + 1;
        counters[key] = value;
        debug.add('system usage updated', { key, count: value, url: location.pathname });
        return value;
    };

    debug.add('common systems initialized', {
        path: window.location.pathname,
        url: window.location.href,
        pageKey: pageKey
    });

    window.addEventListener('error', (event) => {
        debug.add('window error', {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno
        });
    });

    window.addEventListener('unhandledrejection', (event) => {
        debug.add('unhandledrejection', {
            reason: event.reason && event.reason.message ? event.reason.message : String(event.reason)
        });
    });

    function numerologySum(str) {
        let sum = 0;
        for (let ch of str) {
            let d = parseInt(ch);
            if (!isNaN(d)) sum += d;
        }
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = String(sum).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return sum;
    }

    function nameToNumber(name) {
        const map = {
            'a': 1, 'á': 1, 'ä': 1, 'b': 2, 'c': 3, 'č': 3, 'd': 4, 'ď': 4,
            'e': 5, 'é': 5, 'ě': 5, 'f': 6, 'g': 7, 'h': 8, 'ch': 8, 'i': 9,
            'í': 9, 'j': 1, 'k': 2, 'l': 3, 'm': 4, 'n': 5, 'ň': 5, 'o': 6,
            'ó': 6, 'ô': 6, 'p': 7, 'q': 8, 'r': 9, 'ř': 9, 's': 1, 'š': 1,
            't': 2, 'ť': 2, 'u': 3, 'ú': 3, 'ů': 3, 'v': 4, 'w': 5, 'x': 6,
            'y': 7, 'ý': 7, 'z': 8, 'ž': 8
        };
        let clean = name.toLowerCase().replace(/[^a-záäčďéěíňóôřšťúůýž]/g, '');
        let sum = 0;
        for (let ch of clean) {
            if (map[ch]) sum += map[ch];
        }
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = String(sum).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return sum;
    }

    function getVowelsSum(name) {
        const vowels = 'aeiouyáäéíóôúý';
        let sum = 0;
        let clean = name.toLowerCase().replace(/[^a-záäčďéěíňóôřšťúůýž]/g, '');
        for (let ch of clean) {
            if (vowels.includes(ch)) {
                const map = {
                    'a': 1, 'á': 1, 'ä': 1, 'e': 5, 'é': 5, 'ě': 5,
                    'i': 9, 'í': 9, 'o': 6, 'ó': 6, 'ô': 6, 'u': 3,
                    'ú': 3, 'ů': 3, 'y': 7, 'ý': 7
                };
                sum += map[ch] || 0;
            }
        }
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = String(sum).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return sum;
    }

    function getConsonantsSum(name) {
        const vowels = 'aeiouyáäéíóôúý';
        let sum = 0;
        let clean = name.toLowerCase().replace(/[^a-záäčďéěíňóôřšťúůýž]/g, '');
        for (let ch of clean) {
            if (!vowels.includes(ch)) {
                const map = {
                    'b': 2, 'c': 3, 'č': 3, 'd': 4, 'ď': 4, 'f': 6,
                    'g': 7, 'h': 8, 'ch': 8, 'j': 1, 'k': 2, 'l': 3,
                    'm': 4, 'n': 5, 'ň': 5, 'p': 7, 'q': 8, 'r': 9,
                    'ř': 9, 's': 1, 'š': 1, 't': 2, 'ť': 2, 'v': 4,
                    'w': 5, 'x': 6, 'z': 8, 'ž': 8
                };
                sum += map[ch] || 0;
            }
        }
        while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
            sum = String(sum).split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
        }
        return sum;
    }

    function getAdjustedDate(year, month, day, daysOffset) {
        const d = new Date(year, month - 1, day);
        d.setDate(d.getDate() + daysOffset);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${y}${m}${dd}`;
    }

    function getBirthdayNumber(day) {
        return numerologySum(String(day));
    }

    function getChallenge(day, month) {
        const diff = Math.abs(parseInt(day) - parseInt(month));
        return numerologySum(String(diff));
    }

    function getMaturity(lifePath, destiny) {
        return numerologySum(String(lifePath + destiny));
    }

    function getPersonalYear(day, month, year) {
        const currentYear = new Date().getFullYear();
        return numerologySum(String(day) + String(month) + String(currentYear));
    }

    function getPersonalMonth(personalYear) {
        const currentMonth = new Date().getMonth() + 1;
        return numerologySum(String(personalYear) + String(currentMonth));
    }

    function getPersonalDay(personalYear, personalMonth) {
        const currentDay = new Date().getDate();
        return numerologySum(String(personalYear) + String(personalMonth) + String(currentDay));
    }

    window.CommonSystems = {
        numerologySum: numerologySum,
        nameToNumber: nameToNumber,
        getVowelsSum: getVowelsSum,
        getConsonantsSum: getConsonantsSum,
        getAdjustedDate: getAdjustedDate,
        getBirthdayNumber: getBirthdayNumber,
        getChallenge: getChallenge,
        getMaturity: getMaturity,
        getPersonalYear: getPersonalYear,
        getPersonalMonth: getPersonalMonth,
        getPersonalDay: getPersonalDay
    };

})();
