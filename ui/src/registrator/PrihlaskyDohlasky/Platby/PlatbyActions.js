import { inputChanged as genericInputChanged } from '../Input/InputActions';
import { formValid } from './platbyReducer';

export const inputChanged = genericInputChanged('NOVA_PLATBA');

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

  const {
    registrator: {
      prihlasky: { platby: form }
    }
  } = getState();
  if (!formValid({ form })) {
    return;
  }

  dispatch(addPlatba(form));
  dispatch(reset());
};

export const removePlatba = idx => ({ type: 'PRIHLASKY_REMOVE_PLATBA', idx });

export const expandNovaPlatba = () => ({ type: 'NOVA_PLATBA_EXPAND' });
