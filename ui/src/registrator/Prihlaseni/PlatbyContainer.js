import { connect } from 'react-redux';
import Platby from './Platby';
import { addValidatedPlatba, removePlatba } from './PrihlaseniActions';
import { platby, predepsaneStartovne } from './prihlaseniReducer';

const mapStateToProps = state => {
  const { registrator: { prihlaseni }, entities: { rocniky } } = state;

  return {
    prihlaseni,
    platby: platby(prihlaseni),
    predepsano: predepsaneStartovne(prihlaseni, rocniky)
  };
};

const mapDispatchToProps = dispatch => ({
  onAdd: () => dispatch(addValidatedPlatba()),
  onRemove: idx => dispatch(removePlatba(idx))
});

const PlatbyContainer = connect(mapStateToProps, mapDispatchToProps)(Platby);

export default PlatbyContainer;
