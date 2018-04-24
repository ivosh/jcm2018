export const stopkyStart = ({ base, typ }) => ({
  type: 'STOPKY_START',
  base: base.toJSON ? base.toJSON() : base,
  typ
});
export const stopkyStop = ({ typ }) => ({ type: 'STOPKY_STOP', typ });

// step is in milliseconds
export const stopkyAdd = ({ step, typ }) => ({ type: 'STOPKY_ADD', step, typ });
export const stopkySub = ({ step, typ }) => ({ type: 'STOPKY_SUB', step, typ });
