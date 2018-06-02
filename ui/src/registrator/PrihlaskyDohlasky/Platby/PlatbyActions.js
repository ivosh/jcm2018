import { getDatumKonani } from '../../../entities/rocniky/rocnikyReducer';
import { createInputChanged as genericCreateInputChanged } from '../Input/InputActions';
import { formValid } from './platbyReducer';

export const createInputChanged = actionPrefix =>
  genericCreateInputChanged(`${actionPrefix}_NOVA_PLATBA`);

export const createAddPlatba = actionPrefix => ({ castka, datum, typ, poznamka }) => ({
  type: `${actionPrefix}_ADD_PLATBA`,
  platba: {
    castka: parseInt(castka, 10),
    datum,
    typ,
    poznamka
  }
});

export const createReset = ({ actionPrefix, jePrihlaskou = actionPrefix === 'PRIHLASKY' }) => ({
  rocniky
}) => {
  if (jePrihlaskou) {
    return { type: `${actionPrefix}_NOVA_PLATBA_RESET` };
  }
  return { type: `${actionPrefix}_NOVA_PLATBA_RESET`, datumKonani: getDatumKonani({ rocniky }) };
};

export const createValidate = actionPrefix => () => ({
  type: `${actionPrefix}_NOVA_PLATBA_VALIDATE`
});

export const createAddValidatedPlatba = (actionPrefix, reduxName) => () => async (
  dispatch,
  getState
) => {
  await dispatch(createValidate(actionPrefix)());

  const {
    entities: { rocniky },
    registrator: {
      [reduxName]: { platby: form }
    }
  } = getState();
  if (!formValid({ form })) {
    return;
  }

  dispatch(createAddPlatba(actionPrefix)(form));
  dispatch(createReset({ actionPrefix })({ rocniky }));
};

export const createRemovePlatba = actionPrefix => idx => ({
  type: `${actionPrefix}_REMOVE_PLATBA`,
  idx
});

export const createExpandNovaPlatba = actionPrefix => () => ({
  type: `${actionPrefix}_NOVA_PLATBA_EXPAND`
});
