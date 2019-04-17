export const AKTUALNI_DATUM_KONANI = '2019-06-08T00:00:00.000Z';

// Reflects state.entities after normalization.
const state = {
  entities: {
    kategorie: {
      '5a587e1a051c181132cf83a7': {
        id: '5a587e1a051c181132cf83a7',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 18, max: 30 }
      },
      '5a587e1a051c181132cf83a8': {
        id: '5a587e1a051c181132cf83a8',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 31, max: 40 }
      },
      '5a587e1a051c181132cf83a9': {
        id: '5a587e1a051c181132cf83a9',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 41, max: 150 }
      },
      '5a587e1a051c181132cf83aa': {
        id: '5a587e1a051c181132cf83aa',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 30 }
      },
      '5a587e1a051c181132cf83ab': {
        id: '5a587e1a051c181132cf83ab',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 31, max: 40 }
      },
      '5a587e1a051c181132cf83ac': {
        id: '5a587e1a051c181132cf83ac',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 41, max: 150 }
      },
      '5a587e1a051c181132cf83ae': { id: '5a587e1a051c181132cf83ae', typ: 'cyklo' },
      '5a587e1a051c181132cf83b1': { id: '5a587e1a051c181132cf83b1', typ: 'pěší' },
      '5a587e1a051c181132cf83b3': {
        id: '5a587e1a051c181132cf83b3',
        typ: 'cyklo',
        pohlavi: 'muž',
        vek: { min: 18, max: 35 }
      },
      '5a587e1a051c181132cf83b4': {
        id: '5a587e1a051c181132cf83b4',
        typ: 'cyklo',
        pohlavi: 'muž',
        vek: { min: 36, max: 150 }
      },
      '5a587e1a051c181132cf83b5': {
        id: '5a587e1a051c181132cf83b5',
        typ: 'cyklo',
        pohlavi: 'žena',
        vek: { min: 18, max: 35 }
      },
      '5a587e1a051c181132cf83b6': {
        id: '5a587e1a051c181132cf83b6',
        typ: 'cyklo',
        pohlavi: 'žena',
        vek: { min: 36, max: 150 }
      },
      '5a587e1a051c181132cf83b8': {
        id: '5a587e1a051c181132cf83b8',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 18, max: 39 }
      },
      '5a587e1a051c181132cf83b9': {
        id: '5a587e1a051c181132cf83b9',
        typ: 'cyklo',
        pohlavi: 'muž',
        vek: { min: 36, max: 45 }
      },
      '5a587e1a051c181132cf83ba': {
        id: '5a587e1a051c181132cf83ba',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 40, max: 49 }
      },
      '5a587e1a051c181132cf83bb': {
        id: '5a587e1a051c181132cf83bb',
        typ: 'cyklo',
        pohlavi: 'muž',
        vek: { min: 46, max: 150 }
      },
      '5a587e1a051c181132cf83bc': {
        id: '5a587e1a051c181132cf83bc',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 50, max: 59 }
      },
      '5a587e1a051c181132cf83bd': {
        id: '5a587e1a051c181132cf83bd',
        typ: 'cyklo',
        pohlavi: 'žena',
        vek: { min: 36, max: 45 }
      },
      '5a587e1a051c181132cf83be': {
        id: '5a587e1a051c181132cf83be',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 60, max: 150 }
      },
      '5a587e1a051c181132cf83bf': {
        id: '5a587e1a051c181132cf83bf',
        typ: 'cyklo',
        pohlavi: 'žena',
        vek: { min: 46, max: 150 }
      },
      '5a587e1a051c181132cf83c0': {
        id: '5a587e1a051c181132cf83c0',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      '5a587e1a051c181132cf83c1': {
        id: '5a587e1a051c181132cf83c1',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 40, max: 49 }
      },
      '5a587e1a051c181132cf83c2': {
        id: '5a587e1a051c181132cf83c2',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 50, max: 59 }
      },
      '5a587e1a051c181132cf83c3': {
        id: '5a587e1a051c181132cf83c3',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 60, max: 150 }
      },
      '5a587e1b051c181132cf83c8': {
        id: '5a587e1b051c181132cf83c8',
        typ: 'cyklo',
        vek: { min: 16, max: 17, presne: true }
      },
      '5a587e1b051c181132cf83cf': {
        id: '5a587e1b051c181132cf83cf',
        typ: 'koloběžka',
        pohlavi: 'muž',
        vek: { min: 18, max: 150 }
      },
      '5a587e1b051c181132cf83d0': {
        id: '5a587e1b051c181132cf83d0',
        typ: 'koloběžka',
        pohlavi: 'žena',
        vek: { min: 18, max: 150 }
      },
      '5a587e1b051c181132cf83d3': {
        id: '5a587e1b051c181132cf83d3',
        typ: 'půlmaraton',
        pohlavi: 'muž',
        vek: { min: 18, max: 39 }
      },
      '5a587e1b051c181132cf83d4': {
        id: '5a587e1b051c181132cf83d4',
        typ: 'půlmaraton',
        pohlavi: 'muž',
        vek: { min: 40, max: 49 }
      },
      '5a587e1b051c181132cf83d5': {
        id: '5a587e1b051c181132cf83d5',
        typ: 'půlmaraton',
        pohlavi: 'muž',
        vek: { min: 50, max: 59 }
      },
      '5a587e1b051c181132cf83d6': {
        id: '5a587e1b051c181132cf83d6',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 60, max: 69 }
      },
      '5a587e1b051c181132cf83d7': {
        id: '5a587e1b051c181132cf83d7',
        typ: 'půlmaraton',
        pohlavi: 'muž',
        vek: { min: 60, max: 150 }
      },
      '5a587e1b051c181132cf83d8': {
        id: '5a587e1b051c181132cf83d8',
        typ: 'maraton',
        pohlavi: 'muž',
        vek: { min: 70, max: 150 }
      },
      '5a587e1b051c181132cf83d9': {
        id: '5a587e1b051c181132cf83d9',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 18, max: 39 }
      },
      '5a587e1b051c181132cf83da': {
        id: '5a587e1b051c181132cf83da',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 40, max: 49 }
      },
      '5a587e1b051c181132cf83db': {
        id: '5a587e1b051c181132cf83db',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 50, max: 59 }
      },
      '5a587e1b051c181132cf83dc': {
        id: '5a587e1b051c181132cf83dc',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 60, max: 69 }
      },
      '5a587e1b051c181132cf83dd': {
        id: '5a587e1b051c181132cf83dd',
        typ: 'půlmaraton',
        pohlavi: 'žena',
        vek: { min: 60, max: 150 }
      },
      '5a587e1b051c181132cf83de': {
        id: '5a587e1b051c181132cf83de',
        typ: 'maraton',
        pohlavi: 'žena',
        vek: { min: 70, max: 150 }
      }
    },
    rocniky: {
      roky: [
        2001,
        2002,
        2003,
        2004,
        2005,
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019
      ],
      byRoky: {
        2001: {
          id: '5a587e1a051c181132cf83ad',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83a7',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83a8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83a9',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83aa',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ab',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ac',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['1-150'] }
            }
          },
          datum: '2001-06-09T00:00:00.000Z'
        },
        2002: {
          id: '5a587e1a051c181132cf83af',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83a7',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83a8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83a9',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83aa',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ab',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ac',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['1-150'] }
            },
            cyklo: {
              id: '5a587e1a051c181132cf83ae',
              typ: 'cyklo',
              zkratka: 'C',
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['51-200'] }
            }
          },
          datum: '2002-06-08T00:00:00.000Z'
        },
        2003: {
          id: '5a587e1a051c181132cf83b0',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83a7',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83a8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83a9',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83aa',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ab',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ac',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['41-190'] }
            },
            cyklo: {
              id: '5a587e1a051c181132cf83ae',
              typ: 'cyklo',
              zkratka: 'C',
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['71-220'] }
            }
          },
          datum: '2003-06-07T00:00:00.000Z'
        },
        2004: {
          id: '5a587e1a051c181132cf83b2',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83a7',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83a8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83a9',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83aa',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ab',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ac',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['1-150'] }
            },
            cyklo: {
              id: '5a587e1a051c181132cf83ae',
              typ: 'cyklo',
              zkratka: 'C',
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['41-190'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2004-06-05T00:00:00.000Z'
        },
        2005: {
          id: '5a587e1a051c181132cf83b7',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83a7',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83a8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83a9',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83aa',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 30 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ab',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 31, max: 40 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83ac',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 41, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['1-150'] }
            },
            cyklo: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b4',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 150 },
                  zkratka: '2M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83b6',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 150 },
                  zkratka: '2Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 95 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2005-06-04T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2006: {
          id: '5a587e1a051c181132cf83c4',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 110 },
              startCisla: { rozsahy: ['1-150'] }
            },
            cyklo: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 110 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2006-06-10T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2007: {
          id: '5a587e1a051c181132cf83c5',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 110 },
              startCisla: { rozsahy: ['51-200'] }
            },
            cyklo: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 110 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2007-06-09T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 40 }, sobota: { poplatek: 40 } }
        },
        2008: {
          id: '5a587e1a051c181132cf83c6',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 110 },
              startCisla: { rozsahy: ['1-150'] }
            },
            cyklo: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 95, naMiste: 110 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2008-06-07T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2009: {
          id: '5a587e1a051c181132cf83c7',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['45-194'] }
            },
            cyklo: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2009-06-13T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2010: {
          id: '5a587e1b051c181132cf83c9',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['1-150'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2010-06-12T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2011: {
          id: '5a587e1b051c181132cf83ca',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '5Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['51-200'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2011-06-11T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2012: {
          id: '5a587e1b051c181132cf83cb',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['1-150'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 120, naMiste: 140 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2012-06-09T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2013: {
          id: '5a587e1b051c181132cf83cc',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 130, naMiste: 150 },
              startCisla: {
                rozsahy: [
                  '60-100',
                  '40-49',
                  '20',
                  '24-25',
                  '34',
                  '21-23',
                  '26-33',
                  '35-39',
                  '50-59',
                  '160',
                  '195-196',
                  '199'
                ]
              }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 130, naMiste: 150 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2013-06-08T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 30 } }
        },
        2014: {
          id: '5a587e1b051c181132cf83cd',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 130, naMiste: 150 },
              startCisla: { rozsahy: ['1-100'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 130, naMiste: 150 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2014-06-14T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 50 } }
        },
        2015: {
          id: '5a587e1b051c181132cf83ce',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 130, naMiste: 150 },
              startCisla: { rozsahy: ['1-100'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 130, naMiste: 150 },
              startCisla: { rozsahy: ['1-150'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2015-06-13T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 50 } }
        },
        2016: {
          id: '5a587e1b051c181132cf83d1',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 140, naMiste: 190 },
              startCisla: { rozsahy: ['40-100', '24', '30', '35', '37-39'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 140, naMiste: 190 },
              startCisla: { rozsahy: ['1-140'] }
            },
            koloběžka: {
              muž: [
                {
                  id: '5a587e1b051c181132cf83cf',
                  pohlavi: 'muž',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1M'
                }
              ],
              žena: [
                {
                  id: '5a587e1b051c181132cf83d0',
                  pohlavi: 'žena',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1Ž'
                }
              ],
              startovne: { predem: 140, naMiste: 190 },
              startCisla: { rozsahy: ['100-102'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2016-06-11T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 50 } }
        },
        2017: {
          id: '5a587e1b051c181132cf83d2',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1a051c181132cf83be',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c3',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 150, naMiste: 200 },
              startCisla: { rozsahy: ['1-100'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 150, naMiste: 200 },
              startCisla: { rozsahy: ['1-150'] }
            },
            koloběžka: {
              muž: [
                {
                  id: '5a587e1b051c181132cf83cf',
                  pohlavi: 'muž',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1M'
                }
              ],
              žena: [
                {
                  id: '5a587e1b051c181132cf83d0',
                  pohlavi: 'žena',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1Ž'
                }
              ],
              startovne: { predem: 150, naMiste: 200 },
              startCisla: { rozsahy: ['90-100'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 25, naMiste: 25 }
            }
          },
          datum: '2017-06-10T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 50 } }
        },
        2018: {
          id: '5a587e1b051c181132cf83df',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1b051c181132cf83d6',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 69 },
                  zkratka: '4M'
                },
                {
                  id: '5a587e1b051c181132cf83d8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 70, max: 150 },
                  zkratka: '5M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1b051c181132cf83dc',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 69 },
                  zkratka: '4Ž'
                },
                {
                  id: '5a587e1b051c181132cf83de',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 70, max: 150 },
                  zkratka: '5Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250 },
              startCisla: { barva: 'cervena', rozsahy: ['1-100'] }
            },
            půlmaraton: {
              muž: [
                {
                  id: '5a587e1b051c181132cf83d3',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1b051c181132cf83d4',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1b051c181132cf83d5',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1b051c181132cf83d7',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1b051c181132cf83d9',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1b051c181132cf83da',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1b051c181132cf83db',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1b051c181132cf83dd',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250 },
              startCisla: { barva: 'cerna', rozsahy: ['1-100'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250, zaloha: 20 },
              startCisla: { rozsahy: ['1-150'] }
            },
            koloběžka: {
              muž: [
                {
                  id: '5a587e1b051c181132cf83cf',
                  pohlavi: 'muž',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1M'
                }
              ],
              žena: [
                {
                  id: '5a587e1b051c181132cf83d0',
                  pohlavi: 'žena',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250 },
              startCisla: { rozsahy: ['100-90'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 30, naMiste: 30 }
            }
          },
          datum: '2018-06-09T00:00:00.000Z',
          ubytovani: { pátek: { poplatek: 50 } }
        },
        2019: {
          id: '5b587e1b451c131132cf83df',
          kategorie: {
            maraton: {
              muž: [
                {
                  id: '5a587e1a051c181132cf83b8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83ba',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bc',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1b051c181132cf83d6',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 60, max: 69 },
                  zkratka: '4M'
                },
                {
                  id: '5a587e1b051c181132cf83d8',
                  pohlavi: 'muž',
                  typ: 'maraton',
                  vek: { min: 70, max: 150 },
                  zkratka: '5M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83c0',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c1',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83c2',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1b051c181132cf83dc',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 60, max: 69 },
                  zkratka: '4Ž'
                },
                {
                  id: '5a587e1b051c181132cf83de',
                  pohlavi: 'žena',
                  typ: 'maraton',
                  vek: { min: 70, max: 150 },
                  zkratka: '5Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250 },
              startCisla: { barva: 'cervena', rozsahy: ['1-100'] }
            },
            půlmaraton: {
              muž: [
                {
                  id: '5a587e1b051c181132cf83d3',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1b051c181132cf83d4',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1b051c181132cf83d5',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3M'
                },
                {
                  id: '5a587e1b051c181132cf83d7',
                  pohlavi: 'muž',
                  typ: 'půlmaraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4M'
                }
              ],
              žena: [
                {
                  id: '5a587e1b051c181132cf83d9',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 18, max: 39 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1b051c181132cf83da',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 40, max: 49 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1b051c181132cf83db',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 50, max: 59 },
                  zkratka: '3Ž'
                },
                {
                  id: '5a587e1b051c181132cf83dd',
                  pohlavi: 'žena',
                  typ: 'půlmaraton',
                  vek: { min: 60, max: 150 },
                  zkratka: '4Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250 },
              startCisla: { barva: 'cerna', rozsahy: ['1-100'] }
            },
            cyklo: {
              id: '5a587e1b051c181132cf83c8',
              typ: 'cyklo',
              vek: { min: 16, max: 17, presne: true },
              muž: [
                {
                  id: '5a587e1a051c181132cf83b3',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1M'
                },
                {
                  id: '5a587e1a051c181132cf83b9',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2M'
                },
                {
                  id: '5a587e1a051c181132cf83bb',
                  pohlavi: 'muž',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3M'
                }
              ],
              žena: [
                {
                  id: '5a587e1a051c181132cf83b5',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 18, max: 35 },
                  zkratka: '1Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bd',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 36, max: 45 },
                  zkratka: '2Ž'
                },
                {
                  id: '5a587e1a051c181132cf83bf',
                  pohlavi: 'žena',
                  typ: 'cyklo',
                  vek: { min: 46, max: 150 },
                  zkratka: '3Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250, zaloha: 20 },
              startCisla: { rozsahy: ['1-150'] }
            },
            koloběžka: {
              muž: [
                {
                  id: '5a587e1b051c181132cf83cf',
                  pohlavi: 'muž',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1M'
                }
              ],
              žena: [
                {
                  id: '5a587e1b051c181132cf83d0',
                  pohlavi: 'žena',
                  typ: 'koloběžka',
                  vek: { min: 18, max: 150 },
                  zkratka: '1Ž'
                }
              ],
              startovne: { predem: 200, naMiste: 250 },
              startCisla: { rozsahy: ['100-90'] }
            },
            pěší: {
              id: '5a587e1a051c181132cf83b1',
              typ: 'pěší',
              zkratka: 'P',
              startovne: { predem: 30, naMiste: 30 }
            }
          },
          datum: AKTUALNI_DATUM_KONANI,
          ubytovani: { pátek: { poplatek: 50 } }
        }
      }
    },
    ucastnici: {
      allIds: [
        '6f09b1fd371dec1e99b7e1c9',
        '5a09b1fd371dec1e99b7e1c9',
        '7a09b1fd371dec1e99b7e142',
        '8344bc71dec1e99b7e1d01e',
        'f5c88400190a4bed88c76736'
      ],
      byIds: {
        '6f09b1fd371dec1e99b7e1c9': {
          roky: [2016, 2014, 2013, 2012, 2011, 2010],
          2016: {
            udaje: {
              prijmeni: 'Sukdoláková',
              jmeno: 'Martina',
              narozeni: { rok: 1963, mesic: 12, den: 7 },
              pohlavi: 'žena',
              obec: 'Zlín',
              stat: 'Česká republika'
            },
            prihlaska: {
              datum: '2016-06-11T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83c2' // maraton
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83c2', // maraton
              startCislo: 11,
              dokonceno: true,
              cas: 'PT3H42M32.6S'
            }
          },
          2014: {
            udaje: {
              prijmeni: 'Sukdoláková',
              jmeno: 'Martina',
              narozeni: { rok: 1963, mesic: 12, den: 7 },
              pohlavi: 'žena',
              obec: 'Zlín',
              stat: 'Česká republika'
            },
            prihlaska: {
              datum: '2014-06-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83c2' // maraton
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83c2', // maraton
              startCislo: 11,
              dokonceno: false
            }
          },
          2013: {
            udaje: {
              prijmeni: 'Sukdoláková',
              jmeno: 'Martina',
              narozeni: { rok: 1963, mesic: 12, den: 7 },
              pohlavi: 'žena',
              obec: 'Zlín',
              stat: 'Česká republika'
            },
            prihlaska: {
              datum: '2013-06-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83c2' // maraton
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83c2', // maraton
              startCislo: 11,
              dokonceno: true,
              cas: 'PT3H42M32.6S'
            }
          },
          2012: {
            udaje: {
              prijmeni: 'Sukdoláková',
              jmeno: 'Martina',
              narozeni: { rok: 1963, mesic: 12, den: 7 },
              pohlavi: 'žena',
              obec: 'Zlín',
              stat: 'Česká republika'
            },
            prihlaska: {
              datum: '2012-06-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83c2' // maraton
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83c2', // maraton
              startCislo: 11,
              dokonceno: true,
              cas: 'PT3H42M32.6S'
            }
          },
          2011: {
            udaje: {
              prijmeni: 'Sukdoláková',
              jmeno: 'Martina',
              narozeni: { rok: 1963, mesic: 12, den: 7 },
              pohlavi: 'žena',
              obec: 'Zlín',
              stat: 'Česká republika'
            },
            prihlaska: {
              datum: '2011-06-11T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83c2' // maraton
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83c2', // maraton
              startCislo: 11,
              dokonceno: true,
              cas: 'PT3H42M32.6S'
            }
          },
          2010: {
            udaje: {
              prijmeni: 'Sukdoláková',
              jmeno: 'Martina',
              narozeni: { rok: 1963, mesic: 12, den: 7 },
              pohlavi: 'žena',
              obec: 'Zlín',
              stat: 'Česká republika'
            },
            prihlaska: {
              datum: '2010-06-11T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83c2' // maraton
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83c2', // maraton
              startCislo: 11,
              dokonceno: true,
              cas: 'PT3H42M32.6S'
            }
          }
        },
        '5a09b1fd371dec1e99b7e1c9': {
          roky: [2019, 2018, 2017],
          2019: {
            udaje: {
              prijmeni: 'Balabák',
              jmeno: 'Roman',
              narozeni: { rok: 1956 },
              pohlavi: 'muž',
              obec: 'Ostrava 2',
              stat: 'Česká republika'
            },
            platby: [{ castka: 250, datum: AKTUALNI_DATUM_KONANI, typ: 'hotově' }],
            prihlaska: {
              datum: AKTUALNI_DATUM_KONANI,
              kategorie: '5a587e1b051c181132cf83d7', // půlmaraton
              startCislo: 17,
              kod: '10728864'
            },
            vykon: {
              kategorie: '5a587e1b051c181132cf83d7', // půlmaraton
              startCislo: 15,
              dokonceno: false
            },
            ubytovani: { pátek: { prihlaseno: true, prespano: true } }
          },
          2018: {
            udaje: {
              prijmeni: 'Balabák',
              jmeno: 'Roman',
              narozeni: { rok: 1956 },
              pohlavi: 'muž',
              obec: 'Ostrava 2',
              stat: 'Česká republika'
            },
            platby: [{ castka: 250, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }],
            prihlaska: {
              datum: '2018-06-09T00:00:00.000Z',
              kategorie: '5a587e1b051c181132cf83d7', // půlmaraton
              startCislo: 17,
              kod: '10728864'
            },
            vykon: {
              kategorie: '5a587e1b051c181132cf83d7', // půlmaraton
              startCislo: 15,
              dokonceno: false
            },
            ubytovani: { pátek: { prihlaseno: true, prespano: true } }
          },
          2017: {
            udaje: {
              prijmeni: 'Balabák',
              jmeno: 'Roman',
              narozeni: { rok: 1958 },
              pohlavi: 'muž',
              obec: 'Ostrava 1',
              stat: 'Česká republika'
            },
            prihlaska: {
              datum: '2017-04-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83bc', // maraton
              kod: '10728863'
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83bc', // maraton
              startCislo: 34,
              dokonceno: true,
              cas: 'PT1H25M32.6S'
            }
          }
        },
        '7a09b1fd371dec1e99b7e142': {
          roky: [2019, 2018],
          2019: {
            udaje: {
              prijmeni: 'Zralá',
              jmeno: 'Hana',
              narozeni: { rok: 1999, mesic: 7, den: 25 },
              pohlavi: 'žena',
              obec: 'Bučovice',
              psc: '654 21',
              stat: 'Česká republika',
              klub: 'SK Nudle',
              email: 'zrala.kl@s.cz'
            },
            platby: [
              { castka: 100, datum: '2019-05-13T00:00:00.000Z', typ: 'převodem' },
              { castka: 80, datum: AKTUALNI_DATUM_KONANI, typ: 'hotově' }
            ],
            prihlaska: {
              datum: '2019-05-12T00:00:00.000Z',
              kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
              startCislo: 10,
              kod: 'abc023skd204mvs345'
            },
            vykon: {
              kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
              startCislo: 11,
              dokonceno: true,
              cas: 'PT2H06M32.6S'
            },
            ubytovani: { pátek: { prihlaseno: true } },
            poznamky: [{ datum: '2019-05-12T00:00:00.000Z', text: 'přihlášena zraněná' }]
          },
          2018: {
            udaje: {
              prijmeni: 'Zralá',
              jmeno: 'Hana',
              narozeni: { rok: 1999, mesic: 7, den: 25 },
              pohlavi: 'žena',
              obec: 'Bučovice',
              psc: '654 21',
              stat: 'Česká republika',
              klub: 'SK Nudle',
              email: 'zrala.kl@s.cz'
            },
            platby: [
              { castka: 100, datum: '2018-05-13T00:00:00.000Z', typ: 'převodem' },
              { castka: 80, datum: '2018-06-09T00:00:00.000Z', typ: 'hotově' }
            ],
            prihlaska: {
              datum: '2018-05-12T00:00:00.000Z',
              kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
              startCislo: 10,
              kod: 'abc023skd204mvs345'
            },
            vykon: {
              kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
              startCislo: 11,
              dokonceno: true,
              cas: 'PT2H06M32.6S'
            },
            ubytovani: { pátek: { prihlaseno: true } }
          }
        },
        '8344bc71dec1e99b7e1d01e': {
          roky: [2019, 2018],
          2019: {
            udaje: {
              prijmeni: 'Kyselová',
              jmeno: 'Slavěna',
              narozeni: { den: 13, mesic: 8, rok: 2001 },
              obec: 'Aš',
              email: 'sks@por.cz'
            },
            platby: [],
            prihlaska: {
              datum: AKTUALNI_DATUM_KONANI,
              kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
              startCislo: 15,
              kod: '0234jsdj0jdaklsd',
              startovnePoSleve: 0
            },
            poznamky: [
              { datum: AKTUALNI_DATUM_KONANI, text: 'přihlášena na startu' },
              { datum: AKTUALNI_DATUM_KONANI, text: 'poběží s vodičem' },
              {
                datum: '2019-05-21T08:53:49.154Z',
                text:
                  'jedna moc super dlouhá poznámka\r\nkterá pokračuje na dalších a dalších\r\nřádcích dle libosti\r\naž do nekonečna'
              }
            ]
          },
          2018: {
            udaje: {
              prijmeni: 'Kyselová',
              jmeno: 'Slavěna',
              narozeni: { den: 13, mesic: 8, rok: 2001 },
              obec: 'Aš',
              email: 'sks@por.cz'
            },
            platby: [],
            prihlaska: {
              datum: '2018-06-09T00:00:00.000Z',
              kategorie: '5a587e1b051c181132cf83d9', // půlmaraton
              startCislo: 15,
              kod: '0234jsdj0jdaklsd',
              startovnePoSleve: 0
            }
          }
        },
        f5c88400190a4bed88c76736: {
          roky: [2019, 2018, 2017, 2015, 2014],
          2019: {
            udaje: {
              prijmeni: 'Smalt',
              jmeno: 'Josef',
              narozeni: { rok: 2001, mesic: 7, den: 25 },
              pohlavi: 'muž',
              obec: 'Králův Dvůr',
              psc: '735 97',
              stat: 'Česká republika'
            },
            platby: [{ castka: 200, datum: '2019-05-13T00:00:00.000Z', typ: 'převodem' }],
            prihlaska: {
              datum: '2019-05-17T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 15,
              kod: 'rcc023skd204mvs345'
            }
          },
          2018: {
            udaje: {
              prijmeni: 'Smalt',
              jmeno: 'Josef',
              narozeni: { rok: 2001, mesic: 7, den: 25 },
              pohlavi: 'muž',
              obec: 'Králův Dvůr',
              psc: '735 97',
              stat: 'Česká republika'
            },
            platby: [{ castka: 200, datum: '2018-05-01T00:00:00.000Z', typ: 'převodem' }],
            prihlaska: {
              datum: '2018-05-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 7
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 7,
              dokonceno: true,
              cas: 'PT2H06M32.6S'
            }
          },
          2017: {
            udaje: {
              prijmeni: 'Smalt',
              jmeno: 'Josef',
              narozeni: { rok: 2001, mesic: 7, den: 25 },
              pohlavi: 'muž',
              obec: 'Králův Dvůr',
              psc: '735 97',
              stat: 'Česká republika'
            },
            platby: [{ castka: 200, datum: '2017-05-01T00:00:00.000Z', typ: 'převodem' }],
            prihlaska: {
              datum: '2017-05-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 13
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 13,
              dokonceno: true,
              cas: 'PT2H06M32.6S'
            }
          },
          2015: {
            udaje: {
              prijmeni: 'Smalt',
              jmeno: 'Josef',
              narozeni: { rok: 2001, mesic: 7, den: 25 },
              pohlavi: 'muž',
              obec: 'Králův Dvůr',
              psc: '735 97',
              stat: 'Česká republika'
            },
            platby: [{ castka: 200, datum: '2015-05-01T00:00:00.000Z', typ: 'převodem' }],
            prihlaska: {
              datum: '2015-05-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 21
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 21,
              dokonceno: true,
              cas: 'PT2H06M32.6S'
            }
          },
          2014: {
            udaje: {
              prijmeni: 'Smalt',
              jmeno: 'Josef',
              narozeni: { rok: 2001, mesic: 7, den: 25 },
              pohlavi: 'muž',
              obec: 'Králův Dvůr',
              psc: '735 97',
              stat: 'Česká republika'
            },
            platby: [{ castka: 200, datum: '2014-05-01T00:00:00.000Z', typ: 'převodem' }],
            prihlaska: {
              datum: '2014-05-01T00:00:00.000Z',
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 4
            },
            vykon: {
              kategorie: '5a587e1a051c181132cf83b8', // maraton
              startCislo: 4,
              dokonceno: true,
              cas: 'PT2H06M32.6S'
            }
          }
        }
      }
    }
  }
};

export default state;