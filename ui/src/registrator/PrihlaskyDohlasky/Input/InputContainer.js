import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';

const mapStateToProps = state => ({
  rocniky: state.entities.rocniky
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { rocniky } = stateProps;
  const { dispatch } = dispatchProps;
  const {
    form,
    index,
    name,
    rawValue,
    formatValue,
    inputChanged,
    inputRef,
    inputOptions,
    inputValid,
    isInputEnabled,
    isInputVisible,
    ...restOwnProps
  } = ownProps;

  return {
    enabled: isInputEnabled({ name, form, rocniky }),
    name,
    options: inputOptions({ name, form, rocniky }),
    validationState: inputValid({ name, value: rawValue, form, rocniky }),
    value: formatValue({ name, rawValue }),
    visible: isInputVisible({ name, form, rocniky }),
    inputRef: ref => inputRef(index, ref),
    onChange: event => dispatch(inputChanged(name, event)),
    ...restOwnProps
  };
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Input);

InputContainer.propTypes = {
  form: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rawValue: PropTypes.any,
  formatValue: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  inputOptions: PropTypes.func.isRequired,
  inputValid: PropTypes.func.isRequired,
  isInputEnabled: PropTypes.func.isRequired
};

export default InputContainer;
