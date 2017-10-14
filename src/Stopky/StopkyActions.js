export const stopkyStart = base => {
  return {
    type: 'STOPKY_START',
    base: base
  };
};

export const stopkyStop = () => {
  return {
    type: 'STOPKY_STOP'
  };
};
