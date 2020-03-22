'use strict';

/* This file is present two times in the project repository:
   - common/common.test.js in CommonJS format (understood by Node JS)
   - ui/src/common.test.js in ES6 format (as required by create-react-app scripts)

   When Node.JS supports MJS modules formats natively, this could be just a single file.
 */

const {
  UBYTOVANI_NEPRESPANO,
  UBYTOVANI_ODHLASIT,
  UBYTOVANI_PRESPANO,
  UBYTOVANI_PRIHLASIT,
  findKategorie,
  ubytovaniModifications,
} = require('./common');

it('findKategorie() - ročník neexistuje', () => {
  const rocniky = {};
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'maraton',
    pohlavi: 'muž',
    narozeni: { rok: 1956 },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - typ kategorie neexistuje', () => {
  const rocniky = { 2018: { kategorie: { půlmaraton: {} } } };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'maraton',
    pohlavi: 'muž',
    narozeni: { rok: 1956 },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - nevyplněné pohlaví', () => {
  const rocniky = { 2018: { kategorie: { půlmaraton: {} } } };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'maraton',
    pohlavi: undefined,
    narozeni: { rok: 1956 },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - nevyplněné narození', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        půlmaraton: {
          žena: [
            { id: '1234', vek: { min: 40, max: 49 } },
            { id: '2345', vek: { min: 50, max: 59 } },
            { id: '3456', vek: { min: 59, max: 60 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'půlmaraton',
    pohlavi: 'žena',
    narozeni: { den: undefined, mesic: undefined, rok: undefined },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - jedna kategorie pro typ', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: { pěší: { id: '1234', typ: 'pěší' } },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'pěší',
    pohlavi: 'muž',
    narozeni: { rok: 1956 },
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - pohlaví neexistuje', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: { půlmaraton: { žena: [] } },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'půlmaraton',
    pohlavi: 'muž',
    narozeni: { rok: 1956 },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - jedna kategorie pro pohlaví', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        koloběžka: {
          muž: [{ id: '1234', typ: 'koloběžka', pohlavi: 'muž', vek: { min: 18, max: 150 } }],
          žena: [{ id: '3456', typ: 'koloběžka', pohlavi: 'žena', vek: { min: 18, max: 150 } }],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'koloběžka',
    pohlavi: 'žena',
    narozeni: { rok: 1956 },
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - nejmladší věková kategorie', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        půlmaraton: {
          muž: [
            { id: '1234', vek: { min: 30, max: 39 } },
            { id: '2345', vek: { min: 40, max: 49 } },
            { id: '3456', vek: { min: 50, max: 59 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'půlmaraton',
    pohlavi: 'muž',
    narozeni: { rok: 1999 },
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - nejstarší věková kategorie', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        půlmaraton: {
          muž: [
            { id: '1234', vek: { min: 40, max: 49 } },
            { id: '2345', vek: { min: 50, max: 59 } },
            { id: '3456', vek: { min: 59, max: 60 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'půlmaraton',
    pohlavi: 'muž',
    narozeni: { rok: 1958 },
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - správná věková kategorie', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        půlmaraton: {
          muž: [
            { id: '1234', vek: { min: 40, max: 49 } },
            { id: '2345', vek: { min: 50, max: 59 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'půlmaraton',
    pohlavi: 'muž',
    narozeni: { rok: 1968 },
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - mladistvý pro maraton/věk', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        maraton: {
          muž: [
            { id: '1234', pohlavi: 'muž', vek: { min: 18, max: 29 } },
            { id: '2345', pohlavi: 'muž', vek: { min: 30, max: 39 } },
            { id: '3456', pohlavi: 'muž', vek: { min: 40, max: 49 } },
            { id: '4567', pohlavi: 'muž', vek: { min: 50, max: 59 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'maraton',
    pohlavi: 'muž',
    narozeni: { rok: 2001 },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - mladistvá pro koloběžku', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        koloběžka: {
          muž: [{ id: '1234', pohlavi: 'muž', vek: { min: 18, max: 150 } }],
          žena: [{ id: '2345', pohlavi: 'žena', vek: { min: 18, max: 150 } }],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'koloběžka',
    pohlavi: 'žena',
    narozeni: { rok: 2002 },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - junior a cyklo přesný věk - mladistvý', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        cyklo: {
          muž: [
            { id: '1234', pohlavi: 'muž', vek: { min: 16, max: 17, presne: true } },
            { id: '2345', pohlavi: 'muž', vek: { min: 18, max: 29 } },
            { id: '3456', pohlavi: 'muž', vek: { min: 30, max: 39 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'cyklo',
    pohlavi: 'muž',
    narozeni: { rok: 2001 },
  });
  expect(nalezeno.kategorie).toBeNull();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - junior a cyklo přesný věk - mladistvý s potvrzením', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        cyklo: {
          muž: [
            { id: '1234', pohlavi: 'muž', vek: { min: 16, max: 17, presne: true } },
            { id: '2345', pohlavi: 'muž', vek: { min: 18, max: 29 } },
            { id: '3456', pohlavi: 'muž', vek: { min: 30, max: 39 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'cyklo',
    pohlavi: 'muž',
    narozeni: { rok: 2001 },
    mladistvyPotvrzen: true,
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - junior a cyklo přesný věk - mladistvý s potvrzením - těsně před hranicí', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        cyklo: {
          muž: [
            { id: '1234', pohlavi: 'muž', vek: { min: 16, max: 17, presne: true } },
            { id: '2345', pohlavi: 'muž', vek: { min: 18, max: 29 } },
            { id: '3456', pohlavi: 'muž', vek: { min: 30, max: 39 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'cyklo',
    pohlavi: 'muž',
    narozeni: { rok: 2000, mesic: 6, den: 8 },
    mladistvyPotvrzen: true,
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - junior a cyklo přesný věk - mladistvý - těsně na hranici', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        cyklo: {
          muž: [
            { id: '1234', pohlavi: 'muž', vek: { min: 16, max: 17, presne: true } },
            { id: '2345', pohlavi: 'muž', vek: { min: 18, max: 29 } },
            { id: '3456', pohlavi: 'muž', vek: { min: 30, max: 39 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'cyklo',
    pohlavi: 'muž',
    narozeni: { rok: 2000, mesic: 6, den: 9 },
    mladistvyPotvrzen: true,
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('findKategorie() - junior a cyklo přesný věk - mladistvý - těsně za hranicí', () => {
  const rocniky = {
    2018: {
      datum: new Date(Date.UTC(2018, 5, 9, 0, 0, 0)).toJSON(),
      kategorie: {
        cyklo: {
          muž: [
            { id: '1234', pohlavi: 'muž', vek: { min: 16, max: 17, presne: true } },
            { id: '2345', pohlavi: 'muž', vek: { min: 18, max: 29 } },
            { id: '3456', pohlavi: 'muž', vek: { min: 30, max: 39 } },
          ],
        },
      },
    },
  };
  const nalezeno = findKategorie(rocniky, {
    rok: 2018,
    typ: 'cyklo',
    pohlavi: 'muž',
    narozeni: { rok: 2000, mesic: 6, den: 10 },
    mladistvyPotvrzen: true,
  });
  expect(nalezeno.kategorie).toBeTruthy();
  expect(nalezeno).toMatchSnapshot();
});

it('přihlásit ubytování - default', () => {
  const stateBefore = undefined;
  const stateAfter = { pátek: { prihlaseno: true } };
  expect(
    ubytovaniModifications[UBYTOVANI_PRIHLASIT]({ den: 'pátek', ubytovani: stateBefore })
  ).toEqual(stateAfter);
});

it('ubytování přespáno - default', () => {
  const stateBefore = undefined;
  const stateAfter = { pátek: { prespano: true } };
  expect(
    ubytovaniModifications[UBYTOVANI_PRESPANO]({ den: 'pátek', ubytovani: stateBefore })
  ).toEqual(stateAfter);
});

it('ubytování nepřespáno - default', () => {
  const stateBefore = undefined;
  const stateAfter = { pátek: { prespano: false } };
  expect(
    ubytovaniModifications[UBYTOVANI_NEPRESPANO]({ den: 'pátek', ubytovani: stateBefore })
  ).toEqual(stateAfter);
});

it('ubytování nepřespáno - přihlášeno', () => {
  const stateBefore = { sobota: { prihlaseno: true } };
  const stateAfter = { sobota: { prihlaseno: true, prespano: false } };
  expect(
    ubytovaniModifications[UBYTOVANI_NEPRESPANO]({ den: 'sobota', ubytovani: stateBefore })
  ).toEqual(stateAfter);
});

it('odhlásit ubytování - default', () => {
  const stateBefore = undefined;
  const stateAfter = {};
  expect(
    ubytovaniModifications[UBYTOVANI_ODHLASIT]({ den: 'pátek', ubytovani: stateBefore })
  ).toEqual(stateAfter);
});

it('odhlásit ubytování - přihlášeno', () => {
  const stateBefore = { pátek: { prihlaseno: true } };
  const stateAfter = {};
  expect(
    ubytovaniModifications[UBYTOVANI_ODHLASIT]({ den: 'pátek', ubytovani: stateBefore })
  ).toEqual(stateAfter);
});
