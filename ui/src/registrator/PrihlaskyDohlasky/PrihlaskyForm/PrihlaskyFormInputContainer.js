import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStartCisloTaken } from '../../../shared/StartovniCislaProTyp/startovniCislaProTypReducer';
import InputContainer from '../Input/InputContainer';
import { createInputChanged } from './PrihlaskyFormActions';
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
  const { actionPrefix, name, reduxName, ...restOwnProps } = ownProps;
  const { form } = state.registrator[reduxName];
  const rawValue = getValue({ name, form });

  return {
    actionPrefix,
    form,
    name,
    rawValue,
    reduxName,
    formatValue,
    inputChanged: createInputChanged(actionPrefix),
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
  actionPrefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

export default PrihlaskyFormInputContainer;
