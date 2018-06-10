import React from 'react';
import renderer from 'react-test-renderer';
import Pokladna from './Pokladna';

const pokladna = {
  total: {
    suma: 37590,
    ucastniku: 175,
    zaloha: {
      count: 73,
      suma: 1460
    },
    typy: {
      hotově: {
        counts: {
          0: 2,
          20: 1,
          30: 4,
          200: 17,
          220: 15,
          250: 23,
          270: 20
        },
        suma: 17990
      },
      převodem: {
        counts: {
          200: 54,
          220: 40
        },
        suma: 19600
      }
    }
  },
  typy: {
    cyklo: {
      suma: 17720,
      ucastniku: 76,
      zaloha: {
        count: 73,
        suma: 1460
      },
      typy: {
        hotově: {
          suma: 8720,
          counts: {
            20: 1,
            220: 15,
            270: 20
          }
        },
        převodem: {
          suma: 9000,
          counts: {
            200: 1,
            220: 40
          }
        }
      }
    },
    koloběžka: {
      suma: 1050,
      ucastniku: 5,
      typy: {
        hotově: {
          suma: 450,
          counts: {
            200: 1,
            250: 1
          }
        },
        převodem: {
          suma: 600,
          counts: {
            200: 3
          }
        }
      }
    },
    maraton: {
      suma: 12250,
      ucastniku: 59,
      typy: {
        hotově: {
          suma: 5250,
          counts: {
            0: 1,
            200: 10,
            250: 13
          }
        },
        převodem: {
          suma: 7000,
          counts: {
            200: 35
          }
        }
      }
    },
    pěší: {
      suma: 120,
      ucastniku: 4,
      typy: {
        hotově: {
          suma: 120,
          counts: {
            30: 4
          }
        }
      }
    },
    půlmaraton: {
      suma: 6450,
      ucastniku: 31,
      typy: {
        hotově: {
          suma: 3450,
          counts: {
            0: 1,
            200: 6,
            250: 9
          }
        },
        převodem: {
          suma: 3000,
          counts: {
            200: 15
          }
        }
      }
    }
  }
};

it('renders', () => {
  const component = renderer.create(<Pokladna pokladna={pokladna} />);
  expect(component.toJSON()).toMatchSnapshot();
});
