import { connect } from 'react-redux';
import Platby from './Platby';
import { addValidatedPlatba, removePlatba } from './PrihlaseniActions';
import { provedenePlatby, predepsaneStartovne } from './prihlaseniReducer';

const mapStateToProps = state => {
  const { registrator: { prihlaseni }, entities: { rocniky } } = state;

  return {
    prihlaseni,
    predepsano: predepsaneStartovne(prihlaseni, rocniky),
    provedeno: provedenePlatby(prihlaseni)
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch(addValidatedPlatba()),
  onRemove: idx => dispatch(removePlatba(idx))
});

const PlatbyContainer = connect(mapStateToProps, mapDispatchToProps)(Platby);

export default PlatbyContainer;
