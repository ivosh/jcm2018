let nextMezicasId = 0;
export const setHighestMezicasId = highestId => {
  nextMezicasId = highestId + 1;
};

export const addMezicas = duration => {
  if (duration.toJSON) {
    duration = duration.toJSON();
  }

  return {
    type: 'ADD_MEZICAS',
    id: nextMezicasId++,
    duration: duration
  };
};

export const removeMezicas = id => ({
  type: 'REMOVE_MEZICAS',
  id: id
});
