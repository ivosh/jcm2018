import { novaPlatbaValid } from './platbyReducer';

export const addPlatba = ({ castka, datum, typ, poznamka }) => ({
  type: 'PRIHLASKY_ADD_PLATBA',
  platba: {
    castka: parseInt(castka, 10),
    datum,
    typ,
    poznamka
  }
});

export const reset = () => ({ type: 'NOVA_PLATBA_RESET' });
const validate = () => ({ type: 'NOVA_PLATBA_VALIDATE' });

export const addValidatedPlatba = () => async (dispatch, getState) => {
  await dispatch(validate());

  const { registrator: { prihlasky: { platby: novaPlatba } } } = getState();
  if (!novaPlatbaValid(novaPlatba)) {
    return;
  }

  dispatch(addPlatba(novaPlatba));
  dispatch(reset());
};

export const removePlatba = idx => ({ type: 'PRIHLASKY_REMOVE_PLATBA', idx });
