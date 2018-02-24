// eslint-disable-next-line import/prefer-default-export
export const inputChanged = (name, event) => ({
  type: 'PRIHLASKY_INPUT_CHANGED',
  name,
  id: event.target.id,
  value: event.target.value
});
