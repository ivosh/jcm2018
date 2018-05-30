const navs = {
  ucastnici: {
    key: '2.1',
    glyph: 'list',
    menu: 'před startem',
    name: 'Účastníci',
    path: '/ucastnici'
  },
  prihlasky: {
    key: '2.2',
    glyph: 'edit',
    menu: 'před startem',
    name: 'Přihlášky',
    path: '/prihlasky'
  },
  prihlaseni: {
    key: '2.3',
    glyph: 'list-alt',
    menu: 'před startem',
    name: 'Přihlášeni',
    path: '/prihlaseni'
  },
  ubytovani: {
    key: '2.4',
    glyph: 'bed',
    menu: 'před startem',
    name: 'Ubytovaní',
    path: '/ubytovani'
  },
  dohlasky: {
    key: '3.1',
    glyph: 'edit',
    menu: 'na startu',
    name: 'Dohlášky',
    path: '/dohlasky'
  },
  startujici: {
    key: '3.2',
    glyph: 'road',
    menu: 'na startu',
    name: 'Startující',
    path: '/startujici'
  },
  'startovni-cisla': {
    key: '4.1',
    glyph: 'sound-5-1',
    menu: 'po startu',
    name: 'Startovní čísla',
    path: '/startovni-cisla'
  },
  stopky: {
    key: '4.2',
    glyph: 'random',
    menu: 'po startu',
    name: 'Stopky',
    path: '/stopky'
  },
  casomira: {
    key: '4.3',
    glyph: 'time',
    menu: 'po startu',
    name: 'Časomíra',
    path: '/casomira'
  },
  main: {
    key: '1',
    glyph: 'home',
    menu: 'main',
    name: 'Domů',
    path: '/'
  }
};

export const navsForMenu = ({ menu }) =>
  Object.values(navs)
    .filter(nav => nav.menu === menu)
    .sort((a, b) => a.key.localeCompare(b.key));

export const navForRoute = ({ route }) =>
  Object.values(navs).find(nav => route.startsWith(nav.path));

export const navMenus = [
  { key: 1, glyph: 'edit', name: 'před startem' },
  { key: 2, glyph: 'road', name: 'na startu' },
  { key: 3, glyph: 'time', name: 'po startu' }
];
