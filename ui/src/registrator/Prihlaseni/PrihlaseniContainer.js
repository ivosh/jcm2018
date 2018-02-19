import { connect } from 'react-redux';
import { getPrihlaseniSorted } from './prihlaseniReducer';
import Prihlaseni from './Prihlaseni';

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator }) => ({
  prihlaseni: getPrihlaseniSorted({ ...entities, ...registrator.prihlaseni }),
  actionPrefix: 'PRIHLASENI',
  reduxName: 'prihlaseni'
});

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator.prihlaseni === next.registrator.prihlaseni;

const PrihlaseniContainer = connect(mapStateToProps, null, null, {
  areStatesEqual
})(Prihlaseni);

export default PrihlaseniContainer;
