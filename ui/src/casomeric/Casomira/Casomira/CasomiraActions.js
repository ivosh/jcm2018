import moment from 'moment';

// eslint-disable-next-line import/prefer-default-export
export const stopkyMezicas = ({ base, now = new Date(), typ } = {}) => ({
  type: 'STOPKY_MEZICAS',
  base,
  duration: moment.duration(now.getTime() - base.getTime()),
  now,
  typ
});
