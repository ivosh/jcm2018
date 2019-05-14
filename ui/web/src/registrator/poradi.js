import { dokoncenoCasSortMethod } from '../sort';

const computePoradi = ({ data, key }) => {
  const sorted = data.sort(dokoncenoCasSortMethod);

  let index = 0;
  return sorted.map(jeden => {
    const { dokonceno, cas } = jeden;
    if (dokonceno === true && cas) {
      index += 1;
      return { ...jeden, [key]: index };
    }
    return jeden;
  });
};

export const computePoradiProTyp = ({ data, kategorieProRocnik, typKategorie }) => {
  const proTyp = data.filter(({ kategorie }) => kategorie.typ === typKategorie);
  const sAbsPoradim = computePoradi({ data: proTyp, key: 'absPoradi' });

  const serazeni = [];
  kategorieProRocnik.typy[typKategorie].list.forEach(({ id }) => {
    const proKategorii = sAbsPoradim.filter(({ kategorie }) => kategorie.id === id);
    const sRelPoradim = computePoradi({ data: proKategorii, key: 'relPoradi' });
    serazeni.push(...sRelPoradim);
  });

  return serazeni.sort(dokoncenoCasSortMethod);
};

export const computePoradiProVsechny = ({ data, kategorieProRocnik }) => {
  const vsichni = [];

  const vsechnyKategorie = Object.keys(kategorieProRocnik.typy);
  vsechnyKategorie.forEach(typKategorie => {
    vsichni.push(...computePoradiProTyp({ data, kategorieProRocnik, typKategorie }));
  });

  return vsichni;
};
