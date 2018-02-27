import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputContainer from '../Input/InputContainer';
import { inputChanged } from './PrihlaskyFormActions';
import { formatValue, inputOptions, inputValid, isInputEnabled } from './prihlaskyFormReducer';

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
    inputValid,
    isInputEnabled
  };
};

const PrihlaskyFormInputContainer = connect(mapStateToProps)(InputContainer);

PrihlaskyFormInputContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default PrihlaskyFormInputContainer;
