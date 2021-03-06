export const TYPY_KATEGORII = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka', 'pěší'];
export const TYPY_KATEGORII_VYHODNOCOVANE = ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'];

export const AKTUALNI_ROK = 2020;

export const STOPKY_ONE_TICK = 10; // milliseconds

export const TIMESYNC_INITIAL_BURST_DELAY = 1000; // 1 second
export const TIMESYNC_OPERATIONAL_DELAY = 10000; // 10 seconds
export const TIMESYNC_LAST_SAMPLES = 5;

export const PRIHLASKY_SAVE_MODAL_TIMEOUT = 2 * 1000; // 2 seconds

export const ActionPrefixes = {
  DOHLASENI: 'DOHLASENI',
  DOHLASKY: 'DOHLASKY',
  POHARY_PO_STARTU: 'POHARY_PO_STARTU',
  POHARY_PRED_STARTEM: 'POHARY_PRED_STARTEM',
  PORADI: 'PORADI',
  PRIHLASENI: 'PRIHLASENI',
  PRIHLASKY: 'PRIHLASKY',
};

export const DragTypes = {
  POHAR: 'pohár',
  STARTOVNI_CISLO: 'startovniCislo',
  STARTUJICI_PRIHLASEN: 'startujiciPrihlasen',
  STARTUJICI_ODSTARTOVAN: 'startujiciOdstartovan',
};

export const ReduxNames = {
  dohlaseni: 'dohlaseni',
  dohlasky: 'dohlasky',
  poharyPoStartu: 'poharyPoStartu',
  poharyPredStartem: 'poharyPredStartem',
  poradi: 'poradi',
  prihlaseni: 'prihlaseni',
  prihlasky: 'prihlasky',
};
