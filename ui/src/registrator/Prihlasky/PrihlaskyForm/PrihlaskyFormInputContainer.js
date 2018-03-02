import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isStartCisloTaken } from '../../../shared/StartujiciProTyp/startujiciProTypReducer';
import InputContainer from '../Input/InputContainer';
import { inputChanged } from './PrihlaskyFormActions';
import { formatValue, inputOptions, inputValid, isInputEnabled } from './prihlaskyFormReducer';

const startCisloValid = ({ typ, kategorie, ucastnici }) => (name, rawValue, form) => {
  const validationState = inputValid(name, rawValue, form);
  if (validationState === 'success') {
    if (
      isStartCisloTaken({ odstartovani: false, startCislo: rawValue, typ, kategorie, ucastnici })
    ) {
      return 'warning';
    }
  }
  return validationState;
};

const mapStateToProps = (state, ownProps) => {
  const { form } = state.registrator.prihlasky;
  const { name } = ownProps;
  const [section, subName] = name.split('.');
  const rawValue = form[section][subName];

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
    isInputEnabled
  };
};

const PrihlaskyFormInputContainer = connect(mapStateToProps)(InputContainer);

PrihlaskyFormInputContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default PrihlaskyFormInputContainer;
