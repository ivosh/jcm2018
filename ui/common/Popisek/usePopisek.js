const usePopisek = ({ pohlavi, showTyp, vek, zkratka }) => {
  const renderObrazekTypu = !!showTyp;
  const renderTextTypu = showTyp && (!pohlavi && !vek);
  const renderPohlavi = !!pohlavi;
  const renderVek = !!vek;
  const renderZkratka = !!zkratka;
  const renderMezera = showTyp && (renderTextTypu || renderPohlavi || renderVek);

  return {
    renderObrazekTypu,
    renderMezera,
    renderTextTypu,
    renderPohlavi,
    renderVek,
    renderZkratka
  };
};

export default usePopisek;
