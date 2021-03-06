import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { predepsaneStartovne, provedenePlatby } from '../../platby';
import {
  createAddValidatedPlatba,
  createExpandNovaPlatba,
  createRemovePlatba,
} from './PlatbyActions';
import Platby from './Platby';

const mapStateToProps = (state, ownProps) => {
  const { reduxName } = ownProps;

  const {
    registrator: {
      [reduxName]: {
        form: { platby, prihlaska },
        platby: { novaPlatbaMinified },
      },
    },
    entities,
  } = state;

  const predepsano = predepsaneStartovne({ ...entities, platby, prihlaska });
  const provedeno = provedenePlatby(platby);

  return {
    novaPlatbaMinified:
      provedeno.suma < predepsano.suma || provedeno.suma === 0 ? false : novaPlatbaMinified,
    predepsano,
    provedeno,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { actionPrefix, reduxName } = ownProps;

  return {
    onAdd: () => dispatch(createAddValidatedPlatba(actionPrefix, reduxName)()),
    onExpand: () => dispatch(createExpandNovaPlatba(actionPrefix)()),
    onRemove: (idx) => dispatch(createRemovePlatba(actionPrefix)(idx)),
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { provedeno } = stateProps;
  const { onAdd, onExpand, onRemove } = dispatchProps;

  const platby = provedeno.platby.map((platba, index) => ({
    ...platba,
    onRemove: () => onRemove(index),
  }));

  return {
    ...stateProps,
    ...ownProps,
    provedeno: { ...provedeno, platby },
    onAdd,
    onExpand,
  };
};

const PlatbyContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Platby);

PlatbyContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
};

export default PlatbyContainer;
