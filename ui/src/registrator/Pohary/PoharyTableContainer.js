import { connect } from 'react-redux';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import { narokovaneFilterChange, neprevzateFilterChange } from './PoharyActions';
import { getPoharySorted } from './poharyReducer';
import PoharyTable from './PoharyTable';

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator: { pohary } }) => {
  const { narokovaneFilter, neprevzateFilter, textFilter } = pohary;

  return {
    actionPrefix: 'POHARY',
    narokovaneFilter,
    neprevzateFilter,
    pohary: getPoharySorted({ ...entities, ...pohary }),
    reduxName: 'pohary',
    textFilter
  };
};

const mapDispatchToProps = dispatch => ({
  onNarokovaneFilterChange: () => dispatch(narokovaneFilterChange()),
  onNeprevzateFilterChange: () => dispatch(neprevzateFilterChange()),
  onTextFilterChange: text => dispatch(createTextFilterChange('POHARY')(text))
});

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator.pohary === next.registrator.pohary;

const PoharyTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatesEqual
  }
)(PoharyTable);

export default PoharyTableContainer;
