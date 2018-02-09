import { connect } from 'react-redux';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { getPrihlaseniSorted } from './prihlaseniReducer';
import Prihlaseni from './Prihlaseni';

const mapStateToProps = ({ entities, registrator }) => {
  const { fetching } = registrator.prihlaseni;

  // Don't forget to update areStatesEqual!
  return {
    prihlaseni: getPrihlaseniSorted({ ...entities, ...registrator.prihlaseni }),
    actionPrefix: 'PRIHLASENI',
    fetching,
    reduxName: 'prihlaseni'
  };
};

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator.prihlaseni === next.registrator.prihlaseni;

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici())
});

const PrihlaseniContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  areStatesEqual
})(Prihlaseni);

export default PrihlaseniContainer;
