import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { narozeniToStr } from '../../Util';
import Input from './Input';
import { inputChanged } from './PrihlaseniActions';
import { datumValid, inputValid, radioInputValues } from './prihlaseniReducer';

const mapStateToProps = state => ({
  prihlaseni: state.registrator.prihlaseni
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { name, popisek, Type } = ownProps;
  const [section, subName] = name.split('.');
  let value = stateProps.prihlaseni[section][subName];

  switch (name) {
    case 'udaje.narozeni':
      value = narozeniToStr(value);
      break;
    case 'prihlaska.datum':
      value = datumValid(value) ? moment.utc(value).format('D. M. YYYY') : value;
      break;
    default:
      break;
  }

  return {
    name,
    popisek: popisek || name,
    Type,
    value: value || '',
    values: radioInputValues(name),
    validationState: inputValid(name, value, stateProps.prihlaseni),
    onChange: event => dispatchProps.dispatch(inputChanged(name, event))
  };
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Input);

InputContainer.propTypes = {
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string,
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node])
};

export default InputContainer;
