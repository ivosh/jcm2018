export const stopkyStart = ({ now = new Date(), typ }) => ({ type: 'STOPKY_START', now, typ });
export const stopkyStop = ({ now = new Date(), typ }) => ({ type: 'STOPKY_STOP', now, typ });

// step is in milliseconds
export const stopkyAdd = ({ step, typ }) => ({ type: 'STOPKY_ADD', step, typ });
export const stopkySub = ({ step, typ }) => ({ type: 'STOPKY_SUB', step, typ });
