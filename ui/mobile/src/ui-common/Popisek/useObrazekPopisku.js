import cyklo from './cyklo.png';
import kolobezka from './kolobezka.png';
import maraton from './maraton.png';
import muz from './muz.png';
import pesi from './pesi.png';
import pulmaraton from './pulmaraton.png';
import zena from './zena.png';

const computeSize = ({ goodRatio, size, sizePercentage }) =>
  Math.round((size * sizePercentage) / 100 / goodRatio);

export const useObrazekPohlavi = ({ pohlavi, sizePercentage }) => {
  const pohlaviToImg = {
    muž: muz,
    žena: zena
  };

  const goodRatio = 1.78;
  const source = pohlaviToImg[pohlavi];
  const width = computeSize({ goodRatio, size: 50, sizePercentage });
  const height = computeSize({ goodRatio, size: 50, sizePercentage });

  return { source, width, height };
};

export const useObrazekTypu = ({ sizePercentage, typ }) => {
  const typToImg = {
    cyklo,
    koloběžka: kolobezka,
    maraton,
    pěší: pesi,
    půlmaraton: pulmaraton
  };

  const goodRatio = 1.66;
  const typToImageWidth = {
    cyklo: 50,
    koloběžka: 50,
    maraton: 50,
    pěší: 50,
    půlmaraton: 70
  };

  const source = typToImg[typ];
  const width = computeSize({ goodRatio, size: typToImageWidth[typ], sizePercentage });
  const height = computeSize({ goodRatio, size: 50, sizePercentage });

  return { source, width, height };
};
