import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputContainer from '../Input/InputContainer';
import { inputChanged } from './PlatbyActions';
import { formatValue, inputOptions, inputValid, isInputEnabled } from './platbyReducer';

const mapStateToProps = state => ({
  form: state.registrator.prihlasky.platby
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { form } = stateProps;
  const { index, inline, name, popisek, Formatter, Type, inputRef } = ownProps;
  const [, subName] = name.split('.');
  const rawValue = form[subName];

  return {
    form,
    index,
    inline,
    name,
    popisek,
    rawValue,
    Formatter,
    Type,
    formatValue,
    inputChanged,
    inputOptions,
    inputValid,
    isInputEnabled,
    inputRef
  };
};

const PlatbyInputContainer = connect(mapStateToProps, null, mergeProps)(InputContainer);

PlatbyInputContainer.propTypes = {
  index: PropTypes.number.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  Formatter: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  inputRef: PropTypes.func.isRequired
};

export default PlatbyInputContainer;
