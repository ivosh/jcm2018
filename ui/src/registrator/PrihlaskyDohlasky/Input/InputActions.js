// eslint-disable-next-line import/prefer-default-export
export const createInputChanged = actionPrefix => (name, event) => ({
  type: `${actionPrefix}_INPUT_CHANGED`,
  name,
  id: event.target.id,
  startovne: event.target.nonce,
  value: event.target.type === 'checkbox' ? event.target.checked : event.target.value
});
