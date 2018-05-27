import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inputChanged } from '../PrihlaskyForm/PrihlaskyFormActions';
import { hide, show } from './StartCisloActions';
import StartCisloInput from './StartCisloInput';

const mapStateToProps = (state, ownProps) => {
  const { reduxName } = ownProps;

  const typ = state.registrator[reduxName].form.prihlaska.typ || '';
  const { showing } = state.registrator[reduxName].startCislo;

  return { showing, typ, ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { actionPrefix } = ownProps;

  return {
    onHide: () => dispatch(hide(actionPrefix)()),
    onSelect: startCislo => {
      dispatch(hide(actionPrefix)());
      dispatch(inputChanged('prihlaska.startCislo', { target: { value: `${startCislo}` } }));
    },
    onShow: () => dispatch(show(actionPrefix)())
  };
};

const StartCisloInputContainer = connect(mapStateToProps, mapDispatchToProps)(StartCisloInput);

StartCisloInputContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

export default StartCisloInputContainer;
