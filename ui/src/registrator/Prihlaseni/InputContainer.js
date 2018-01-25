import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import { inputChanged } from './PrihlaseniActions';
import { formatValue, inputOptions, inputValid } from './prihlaseniReducer';

const mapStateToProps = state => ({
  prihlaseni: state.registrator.prihlaseni,
  rocniky: state.entities.rocniky,
  ucastnici: state.entities.ucastnici
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { prihlaseni, rocniky, ucastnici } = stateProps;
  const { inline, name, popisek, Type } = ownProps;
  const [section, subName] = name.split('.');
  const rawValue = stateProps.prihlaseni[section][subName];

  return {
    inline,
    name,
    popisek,
    Type,
    value: formatValue(name, rawValue),
    options: inputOptions(name, prihlaseni, rocniky, ucastnici),
    validationState: inputValid(name, rawValue, prihlaseni),
    onChange: event => dispatchProps.dispatch(inputChanged(name, event))
  };
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Input);

InputContainer.propTypes = {
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node])
};

export default InputContainer;
