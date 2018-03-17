import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputContainer from '../Input/InputContainer';
import { inputChanged } from './PlatbyActions';
import {
  formatValue,
  inputOptions,
  inputValid,
  isInputEnabled,
  isInputVisible
} from './platbyReducer';

const mapStateToProps = (state, ownProps) => {
  const form = state.registrator.prihlasky.platby;
  const { name } = ownProps;
  const [, subName] = name.split('.');
  const rawValue = form[subName];

  return {
    form,
    rawValue,
    formatValue,
    inputChanged,
    inputOptions,
    inputValid,
    isInputEnabled,
    isInputVisible,
    ...ownProps
  };
};

const PlatbyInputContainer = connect(mapStateToProps, {})(InputContainer);

PlatbyInputContainer.propTypes = {
  name: PropTypes.string.isRequired
};

export default PlatbyInputContainer;
