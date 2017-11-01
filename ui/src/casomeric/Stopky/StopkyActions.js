export const stopkyStart = base => {
  if (base.toJSON) {
    base = base.toJSON();
  }

  return {
    type: 'STOPKY_START',
    base: base
  };
};

export const stopkyStop = () => ({
  type: 'STOPKY_STOP'
});
