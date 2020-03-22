import { API_POHAR_PREDAN } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';

export const POHAR_NAROK = 'nárok';
export const POHAR_NEPREVZATO = 'nepřevzato';
export const POHAR_PREDANO = 'předáno';
export const TYPY_POHARU = [POHAR_NAROK, POHAR_NEPREVZATO, POHAR_PREDANO];

export const createNarokovanePrihlaskouFilterChange = (actionPrefix) => () => ({
  type: `${actionPrefix}_NAROKOVANE_PRIHLASKOU_FILTER_CHANGE`,
});
export const createNarokovaneStartemFilterChange = (actionPrefix) => () => ({
  type: `${actionPrefix}_NAROKOVANE_STARTEM_FILTER_CHANGE`,
});
export const createNeprevzateFilterChange = (actionPrefix) => () => ({
  type: `${actionPrefix}_NEPREVZATE_FILTER_CHANGE`,
});

// :TODO: API podporuje jen nepřevzato -> předáno. Je třeba dodělat i předáno -> nepřevzato.
export const isTypeDraggable = (type) => type === POHAR_NEPREVZATO;
export const isTypeDroppable = (type) => type === POHAR_PREDANO;

export const canDrop = ({ source, destination }) => {
  if (!isTypeDraggable(source.type)) {
    return false;
  }
  if (!isTypeDroppable(destination.type)) {
    return false;
  }
  if (source.id !== destination.id) {
    return false;
  }
  return source.type !== destination.type;
};

const normalize = ({ request }) => ({ request, response: {} });

export const POHAR_PREDAN = 'POHAR_PREDAN';
export const poharPredan = ({ id }) => ({
  [WS_API]: {
    type: POHAR_PREDAN,
    endpoint: API_POHAR_PREDAN,
    normalize,
    request: { id },
    title: 'předávání poháru',
  },
});

export const onDrop = ({ source, destination, dispatch }) => {
  if (source.type === POHAR_NEPREVZATO && destination.type === POHAR_PREDANO) {
    dispatch(poharPredan({ id: source.id }));
    return undefined;
  }

  throw new Error('Nečekaný pohár.');
};

export const createOnDrop = (dispatch) => ({ source, destination }) =>
  onDrop({ source, destination, dispatch });
