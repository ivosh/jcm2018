import { connect } from 'react-redux';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import { narokovaneFilterChange, neprevzateFilterChange } from './PoharActions';
import { getPoharySorted } from './poharReducer';
import Pohar from './Pohar';

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator: { pohar } }) => {
  const { narokovaneFilter, neprevzateFilter, textFilter } = pohar;

  return {
    actionPrefix: 'POHAR',
    narokovaneFilter,
    neprevzateFilter,
    pohary: getPoharySorted({ ...entities, ...pohar }),
    reduxName: 'pohar',
    textFilter
  };
};

const mapDispatchToProps = dispatch => ({
  onNarokovaneFilterChange: () => dispatch(narokovaneFilterChange()),
  onNeprevzateFilterChange: () => dispatch(neprevzateFilterChange()),
  onTextFilterChange: text => dispatch(createTextFilterChange('POHAR')(text))
});

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator.pohar === next.registrator.pohar;

const PoharContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatesEqual
  }
)(Pohar);

export default PoharContainer;
