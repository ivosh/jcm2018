import { connect } from 'react-redux';
import { ActionPrefixes, ReduxNames } from '../../constants';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import {
  canDrop,
  narokovanePrihlaskouFilterChange,
  narokovaneStartemFilterChange,
  neprevzateFilterChange,
  createOnDrop
} from './PoharyActions';
import { getPoharySorted } from './poharyReducer';
import PoharyTable from './PoharyTable';

const actionPrefix = ActionPrefixes.POHARY;

const remapNarok = (ucastnici, jePrihlaskou) =>
  ucastnici.map(ucastnik => {
    const { pohary } = ucastnik;
    const { narokPrihlaskou, narokStartem, ...rest } = pohary;
    return {
      ...ucastnik,
      pohary: { ...rest, narok: jePrihlaskou ? narokPrihlaskou : narokStartem }
    };
  });

const jePrihlaskou = arg => arg === ActionPrefixes.POHARY;

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator }) => {
  const reduxName = ReduxNames.pohary;
  const pohary = registrator[reduxName];
  const {
    narokovanePrihlaskouFilter,
    narokovaneStartemFilter,
    neprevzateFilter,
    textFilter
  } = pohary;

  const narokovaneFilter = jePrihlaskou(actionPrefix)
    ? narokovanePrihlaskouFilter
    : narokovaneStartemFilter;
  const poharovi = remapNarok(
    getPoharySorted({ ...entities, ...pohary }),
    jePrihlaskou(actionPrefix)
  );

  return {
    actionPrefix,
    narokovaneFilter,
    neprevzateFilter,
    pohary: poharovi,
    popisek: jePrihlaskou(actionPrefix) ? 'se na něj přihlásili' : 'odstartovali',
    reduxName,
    textFilter
  };
};

const mapDispatchToProps = dispatch => ({
  canDrop,
  onDrop: createOnDrop(dispatch),
  onNarokovaneFilterChange: () =>
    dispatch(
      jePrihlaskou(actionPrefix)
        ? narokovanePrihlaskouFilterChange()
        : narokovaneStartemFilterChange()
    ),
  onNeprevzateFilterChange: () => dispatch(neprevzateFilterChange()),
  onTextFilterChange: text => dispatch(createTextFilterChange(actionPrefix)(text))
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
