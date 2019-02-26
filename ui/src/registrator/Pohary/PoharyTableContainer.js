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
const mapStateToProps = ({ entities, registrator }) => {
  const reduxName = ReduxNames.pohary;
  const pohary = registrator[reduxName];
  const { narokovaneFilter, neprevzateFilter, textFilter } = pohary;

  return {
    actionPrefix: ActionPrefixes.POHARY,
    narokovaneFilter,
    neprevzateFilter,
    pohary: getPoharySorted({ ...entities, ...pohary }),
    reduxName,
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

/* :TODO: Ideally we would say here registrator[reduxName] but this is currently not
   possible with areStatesEqual. Refer to: https://github.com/reduxjs/react-redux/issues/781 */
const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator === next.registrator;

const PoharyTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    areStatesEqual
  }
)(PoharyTable);

export default PoharyTableContainer;
