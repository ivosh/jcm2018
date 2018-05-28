import { inputChanged as genericInputChanged } from '../Input/InputActions';
import { formValid } from './platbyReducer';

export const inputChanged = actionPrefix => genericInputChanged(`${actionPrefix}_NOVA_PLATBA`);

export const addPlatba = actionPrefix => ({ castka, datum, typ, poznamka }) => ({
  type: `${actionPrefix}_ADD_PLATBA`,
  platba: {
    castka: parseInt(castka, 10),
    datum,
    typ,
    poznamka
  }
});

export const reset = actionPrefix => () => ({ type: `${actionPrefix}_NOVA_PLATBA_RESET` });
const validate = actionPrefix => () => ({ type: `${actionPrefix}_NOVA_PLATBA_VALIDATE` });

export const addValidatedPlatba = (actionPrefix, reduxName) => () => async (dispatch, getState) => {
  await dispatch(validate(actionPrefix)());

  const {
    registrator: {
      [reduxName]: { platby: form }
    }
  } = getState();
  if (!formValid({ form })) {
    return;
  }

  dispatch(addPlatba(actionPrefix)(form));
  dispatch(reset(actionPrefix)());
};

export const removePlatba = actionPrefix => idx => ({ type: `${actionPrefix}_REMOVE_PLATBA`, idx });

export const expandNovaPlatba = actionPrefix => () => ({
  type: `${actionPrefix}_NOVA_PLATBA_EXPAND`
});
