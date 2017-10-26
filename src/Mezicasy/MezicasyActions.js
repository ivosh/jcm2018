import uuid from 'js-uuid';

export const addMezicas = duration => ({
  type: 'ADD_MEZICAS',
  id: uuid.v4(),
  duration: duration
});

export const removeMezicas = id => ({
  type: 'REMOVE_MEZICAS',
  id: id
});
