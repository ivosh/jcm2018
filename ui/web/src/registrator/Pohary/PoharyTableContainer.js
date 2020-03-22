import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionPrefixes } from '../../constants';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import {
  canDrop,
  createNarokovanePrihlaskouFilterChange,
  createNarokovaneStartemFilterChange,
  createNeprevzateFilterChange,
  createOnDrop,
} from './PoharyActions';
import { getPoharySorted } from './poharyReducer';
import PoharyTable from './PoharyTable';

const jePrihlaskou = (actionPrefix) => actionPrefix === ActionPrefixes.POHARY_PRED_STARTEM;

const remapNarok = (ucastnici, jePrihlaska) =>
  ucastnici.map((ucastnik) => {
    const { pohary } = ucastnik;
    const { narokPrihlaskou, narokStartem, ...rest } = pohary;
    return {
      ...ucastnik,
      pohary: { ...rest, narok: jePrihlaska ? narokPrihlaskou : narokStartem },
    };
  });

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator }, { actionPrefix, reduxName }) => {
  const pohary = registrator[reduxName];
  const {
    narokovanePrihlaskouFilter,
    narokovaneStartemFilter,
    neprevzateFilter,
    textFilter,
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
    textFilter,
  };
};

const mapDispatchToProps = (dispatch, { actionPrefix }) => ({
  canDrop,
  onDrop: createOnDrop(dispatch),
  onNarokovaneFilterChange: () =>
    dispatch(
      jePrihlaskou(actionPrefix)
        ? createNarokovanePrihlaskouFilterChange(actionPrefix)()
        : createNarokovaneStartemFilterChange(actionPrefix)()
    ),
  onNeprevzateFilterChange: () => dispatch(createNeprevzateFilterChange(actionPrefix)()),
  onTextFilterChange: (text) => dispatch(createTextFilterChange(actionPrefix)(text)),
});

/* :TODO: Ideally we would say here registrator[reduxName] but this is currently not
   possible with areStatesEqual. Refer to: https://github.com/reduxjs/react-redux/issues/781 */
const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator === next.registrator;

const PoharyTableContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  areStatesEqual,
})(PoharyTable);

PoharyTable.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
};

export default PoharyTableContainer;
