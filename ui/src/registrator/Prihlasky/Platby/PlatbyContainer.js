import { connect } from 'react-redux';
import { predepsaneStartovne, provedenePlatby } from '../../platby';
import { addValidatedPlatba, expandNovaPlatba, removePlatba } from './PlatbyActions';
import Platby from './Platby';

const mapStateToProps = state => {
  const {
    registrator: {
      prihlasky: {
        form: { prihlaska, platby },
        platby: { novaPlatbaMinified }
      }
    },
    entities: { kategorie, rocniky }
  } = state;

  const predepsano = predepsaneStartovne({ kategorie, prihlaska, rocniky });
  const provedeno = provedenePlatby(platby);

  return {
    novaPlatbaMinified:
      provedeno.suma < predepsano.suma || provedeno.suma === 0 ? false : novaPlatbaMinified,
    predepsano,
    provedeno
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch(addValidatedPlatba()),
  onExpand: () => dispatch(expandNovaPlatba()),
  onRemove: idx => dispatch(removePlatba(idx))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { provedeno } = stateProps;
  const { onAdd, onExpand, onRemove } = dispatchProps;

  const platby = provedeno.platby.map((platba, index) => ({
    ...platba,
    onRemove: () => onRemove(index)
  }));

  return {
    ...stateProps,
    ...ownProps,
    provedeno: { ...provedeno, platby },
    onAdd,
    onExpand
  };
};

const PlatbyContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Platby);

export default PlatbyContainer;
