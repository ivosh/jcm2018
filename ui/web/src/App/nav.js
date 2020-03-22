const PRED_STARTEM = 'před startem';
const NA_STARTU = 'na startu';
const PO_STARTU = 'po startu';

const navs = {
  ucastnici: {
    key: '2.1',
    glyph: 'list',
    menu: PRED_STARTEM,
    name: 'Účastníci',
    path: '/ucastnici',
  },
  prihlasky: {
    key: '2.2',
    glyph: 'edit',
    menu: PRED_STARTEM,
    name: 'Přihlášky',
    path: '/prihlasky',
  },
  prihlaseni: {
    key: '2.3',
    glyph: 'list-alt',
    menu: PRED_STARTEM,
    name: 'Přihlášeni',
    path: '/prihlaseni',
  },
  ubytovani: {
    key: '2.4',
    glyph: 'bed',
    menu: PRED_STARTEM,
    name: 'Ubytovaní',
    path: '/ubytovani',
  },
  poharyPredStartem: {
    key: '2.5',
    glyph: 'glass',
    menu: PRED_STARTEM,
    name: 'Poháry',
    path: '/pohary-pred-startem',
  },
  dohlasky: {
    key: '3.1',
    glyph: 'edit',
    menu: NA_STARTU,
    name: 'Dohlášky',
    path: '/dohlasky',
  },
  dohlaseni: {
    key: '3.2',
    glyph: 'list-alt',
    menu: NA_STARTU,
    name: 'Dohlášeni',
    path: '/dohlaseni',
  },
  startujici: {
    key: '3.3',
    glyph: 'road',
    menu: NA_STARTU,
    name: 'Startující',
    path: '/startujici',
  },
  'startovni-cisla': {
    key: '4.1',
    glyph: 'sound-5-1',
    menu: PO_STARTU,
    name: 'Startovní čísla',
    path: '/startovni-cisla',
  },
  stopky: {
    key: '4.2',
    glyph: 'random',
    menu: PO_STARTU,
    name: 'Stopky',
    path: '/stopky',
  },
  casomira: {
    key: '4.3',
    glyph: 'time',
    menu: PO_STARTU,
    name: 'Časomíra',
    path: '/casomira',
  },
  poradi: {
    key: '4.4',
    glyph: 'star',
    menu: PO_STARTU,
    name: 'Pořadí',
    path: '/poradi',
  },
  vitezove: {
    key: '4.5',
    glyph: 'gift',
    menu: PO_STARTU,
    name: 'Vítězové',
    path: '/vitezove',
  },
  poharyPoStartu: {
    key: '4.6',
    glyph: 'glass',
    menu: PO_STARTU,
    name: 'Poháry',
    path: '/pohary-po-startu',
  },
  pokladna: {
    key: '4.7',
    glyph: 'piggy-bank',
    menu: PO_STARTU,
    name: 'Pokladna',
    path: '/pokladna',
  },
  vysledky: {
    key: '4.8',
    glyph: 'flag',
    menu: PO_STARTU,
    name: 'Výsledky',
    path: '/vysledky',
  },
  main: {
    key: '1',
    glyph: 'home',
    menu: 'main',
    name: 'Domů',
    path: '/',
  },
};

export const navsForMenu = ({ menu }) =>
  Object.values(navs)
    .filter((nav) => nav.menu === menu)
    .sort((a, b) => a.key.localeCompare(b.key));

export const navForRoute = ({ route }) =>
  Object.values(navs).find((nav) => route.startsWith(nav.path));

export const navMenus = [
  { key: 1, glyph: 'edit', name: PRED_STARTEM },
  { key: 2, glyph: 'road', name: NA_STARTU },
  { key: 3, glyph: 'time', name: PO_STARTU },
];
