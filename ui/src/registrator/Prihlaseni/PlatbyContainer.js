import { connect } from 'react-redux';
import Platby from './Platby';
import { addValidatedPlatba, removePlatba } from './PrihlaseniActions';
import { provedenePlatby, predepsaneStartovne } from './prihlaseniReducer';

const mapStateToProps = state => {
  const { registrator: { prihlaseni }, entities: { rocniky } } = state;

  return {
    predepsano: predepsaneStartovne(prihlaseni, rocniky),
    provedeno: provedenePlatby(prihlaseni)
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch(addValidatedPlatba()),
  onRemove: idx => dispatch(removePlatba(idx))
});

const mergeProps = (stateProps, dispatchProps) => {
  const { provedeno } = stateProps;
  const { onAdd, onRemove } = dispatchProps;

  const platby = provedeno.platby.map((platba, index) => ({
    ...platba,
    onRemove: () => onRemove(index)
  }));

  return {
    ...stateProps,
    provedeno: { ...provedeno, platby },
    onAdd
  };
};

const PlatbyContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Platby);

export default PlatbyContainer;
