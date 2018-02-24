// eslint-disable-next-line import/prefer-default-export
export const inputChanged = (actionPrefix, name, event) => ({
  type: `${actionPrefix}_INPUT_CHANGED`,
  name,
  id: event.target.id,
  value: event.target.value
});
