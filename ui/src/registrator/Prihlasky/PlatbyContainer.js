import { connect } from 'react-redux';
import { predepsaneStartovne, provedenePlatby } from '../platby';
import Platby from './Platby';
import { addValidatedPlatba, removePlatba } from './PrihlaskyActions';

const mapStateToProps = state => {
  const {
    registrator: { prihlasky: { prihlaska, platby } },
    entities: { kategorie, rocniky }
  } = state;

  return {
    predepsano: predepsaneStartovne({ kategorie, prihlaska, rocniky }),
    provedeno: provedenePlatby(platby)
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
