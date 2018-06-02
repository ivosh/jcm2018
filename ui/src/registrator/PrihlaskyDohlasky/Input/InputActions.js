// eslint-disable-next-line import/prefer-default-export
export const createInputChanged = actionPrefix => (name, event) => {
  const action = {
    type: `${actionPrefix}_INPUT_CHANGED`,
    name,
    id: event.target.id,
    value: event.target.type === 'checkbox' ? event.target.checked : event.target.value
  };

  if (event.target.nonce) {
    const startovne = parseInt(event.target.nonce, 10);
    if (!Number.isNaN(startovne)) {
      action.startovne = startovne;
    }
  }

  return action;
};
