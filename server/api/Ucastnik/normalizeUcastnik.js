const normalizeUcastnik = (ucastnik) => {
  const roky = [];
  const ucasti = {};

  if (!ucastnik) {
    return { roky, ucasti };
  }

  ucastnik.ucasti.forEach((ucast) => {
    const { rok, ...ucastBezRoku } = ucast;
    roky.push(rok);
    ucasti[rok] = ucastBezRoku;
  });

  // První element je vždycky nejvyšší rok.
  roky.sort((a, b) => b - a);

  return { pohar: ucastnik.pohar, roky, ucasti };
};

module.exports = normalizeUcastnik;
