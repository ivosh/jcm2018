/* Mock implementation of js-uuid for MezicasyActions.js. */

let id = 0;

const uuid = {
  v4: () => {
    return id++;
  }
};

export default uuid;