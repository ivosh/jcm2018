import { connect } from 'react-redux';
import { ActionPrefixes, ReduxNames } from '../../constants';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import {
  canDrop,
  narokovaneFilterChange,
  neprevzateFilterChange,
  createOnDrop
} from './PoharyActions';
import { getPoharySorted } from './poharyReducer';
import PoharyTable from './PoharyTable';

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator: { pohary } }) => {
  const { narokovaneFilter, neprevzateFilter, textFilter } = pohary;

  return {
    actionPrefix: ActionPrefixes.POHARY,
    narokovaneFilter,
    neprevzateFilter,
    pohary: getPoharySorted({ ...entities, ...pohary }),
    reduxName: ReduxNames.pohary,
    textFilter
  };
};

const mapDispatchToProps = dispatch => ({
  canDrop,
  onDrop: createOnDrop(dispatch),
  onNarokovaneFilterChange: () => dispatch(narokovaneFilterChange()),
  onNeprevzateFilterChange: () => dispatch(neprevzateFilterChange()),
  onTextFilterChange: text => dispatch(createTextFilterChange(ActionPrefixes.POHARY)(text))
});

const PoharyTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoharyTable);

export default PoharyTableContainer;
