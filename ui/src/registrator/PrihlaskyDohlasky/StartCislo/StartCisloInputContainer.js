import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inputChanged } from '../PrihlaskyForm/PrihlaskyFormActions';
import { createHide, createShow } from './StartCisloActions';
import StartCisloInput from './StartCisloInput';

const mapStateToProps = (state, ownProps) => {
  const { reduxName } = ownProps;

  const {
    ucastnikId: vybraneId,
    prihlaska: { startCislo: vybraneStartCislo, typ = '' }
  } = state.registrator[reduxName].form;
  const { showing } = state.registrator[reduxName].startCislo;

  return { showing, vybraneId, vybraneStartCislo, typ, ...ownProps };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { actionPrefix } = ownProps;

  return {
    onHide: () => dispatch(createHide(actionPrefix)()),
    onSelect: startCislo => {
      dispatch(createHide(actionPrefix)());
      dispatch(inputChanged('prihlaska.startCislo', { target: { value: `${startCislo}` } }));
    },
    onShow: () => dispatch(createShow(actionPrefix)())
  };
};

const StartCisloInputContainer = connect(mapStateToProps, mapDispatchToProps)(StartCisloInput);

StartCisloInputContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

export default StartCisloInputContainer;
