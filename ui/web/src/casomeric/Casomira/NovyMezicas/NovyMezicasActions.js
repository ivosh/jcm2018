export const inputChanged = (typ) => (event) => ({
  type: `NOVY_MEZICAS_INPUT_CHANGED_${typ}`,
  cas: event.target.value,
});

export const hide = (typ) => ({ type: `NOVY_MEZICAS_HIDE_${typ}` });
export const show = (typ) => ({ type: `NOVY_MEZICAS_SHOW_${typ}` });
