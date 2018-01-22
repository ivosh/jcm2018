import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import { inputChanged } from './PrihlaseniActions';
import { formatValue, inputValid, radioInputOptions } from './prihlaseniReducer';

const mapStateToProps = state => ({
  prihlaseni: state.registrator.prihlaseni,
  rocniky: state.entities.rocniky
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { inline, name, popisek, Type } = ownProps;
  const [section, subName] = name.split('.');
  const rawValue = stateProps.prihlaseni[section][subName];

  return {
    inline,
    name,
    popisek: popisek || name,
    Type,
    value: formatValue(name, rawValue),
    options: radioInputOptions(name, stateProps.prihlaseni, stateProps.rocniky),
    validationState: inputValid(name, rawValue, stateProps.prihlaseni),
    onChange: event => dispatchProps.dispatch(inputChanged(name, event))
  };
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Input);

InputContainer.propTypes = {
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string,
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node])
};

export default InputContainer;
