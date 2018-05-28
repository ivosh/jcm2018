import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputContainer from '../Input/InputContainer';
import { inputChanged as genericInputChanged } from './PlatbyActions';
import {
  formatValue,
  inputOptions,
  inputValid,
  isInputEnabled,
  isInputVisible
} from './platbyReducer';

const mapStateToProps = (state, ownProps) => {
  const { actionPrefix, name, reduxName } = ownProps;

  const form = state.registrator[reduxName].platby;
  const [, subName] = name.split('.');
  const rawValue = form[subName];

  return {
    form,
    rawValue,
    formatValue,
    inputChanged: genericInputChanged(actionPrefix),
    inputOptions,
    inputValid,
    isInputEnabled,
    isInputVisible,
    ...ownProps
  };
};

const NovaPlatbaInputContainer = connect(mapStateToProps, {})(InputContainer);

NovaPlatbaInputContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

export default NovaPlatbaInputContainer;
