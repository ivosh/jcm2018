export const stopkyStart = base => ({
  type: 'STOPKY_START',
  base: base.toJSON ? base.toJSON() : base
});

export const stopkyStop = () => ({
  type: 'STOPKY_STOP'
});
