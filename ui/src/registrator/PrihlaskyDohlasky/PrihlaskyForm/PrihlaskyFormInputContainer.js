import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStartCisloTaken } from '../../../shared/StartovniCislaProTyp/startovniCislaProTypReducer';
import InputContainer from '../Input/InputContainer';
import { inputChanged } from './PrihlaskyFormActions';
import {
  formatValue,
  getValue,
  inputOptions,
  inputValid,
  isInputEnabled,
  isInputVisible
} from './prihlaskyFormReducer';

const startCisloValid = ({ typ, kategorie, ucastnici }) => ({ name, value, form }) => {
  const validationState = inputValid({ name, value, form });
  if (validationState === 'success') {
    if (
      isStartCisloTaken({
        id: form.ucastnikId,
        odstartovani: false,
        startCislo: value,
        typ,
        kategorie,
        ucastnici
      })
    ) {
      return 'warning';
    }
  }
  return validationState;
};

const mapStateToProps = (state, ownProps) => {
  const { form } = state.registrator.prihlasky;
  const { name, ...restOwnProps } = ownProps;
  const rawValue = getValue({ name, form });

  return {
    form,
    name,
    rawValue,
    formatValue,
    inputChanged,
    inputOptions,
    inputValid:
      name === 'prihlaska.startCislo'
        ? startCisloValid({ typ: form.prihlaska.typ, ...state.entities })
        : inputValid,
    isInputEnabled,
    isInputVisible,
    ...restOwnProps
  };
};

const PrihlaskyFormInputContainer = connect(mapStateToProps, {})(InputContainer);

PrihlaskyFormInputContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default PrihlaskyFormInputContainer;