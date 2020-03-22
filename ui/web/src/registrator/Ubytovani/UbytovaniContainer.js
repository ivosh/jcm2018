import { connect } from 'react-redux';
import { createTextFilterChange } from '../Filterable/FilterableActions';
import { changeUbytovaniFilter, modifyUbytovani } from './UbytovaniActions';
import { getUbytovaniSorted } from './ubytovaniReducer';
import Ubytovani from './Ubytovani';

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator: { ubytovani } }) => {
  const { jenUbytovani, textFilter } = ubytovani;

  return {
    actionPrefix: 'UBYTOVANI',
    jenUbytovani,
    reduxName: 'ubytovani',
    textFilter,
    ubytovani: getUbytovaniSorted({ ...entities, ...ubytovani }),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onAkceSelect: (id, event) => dispatch(modifyUbytovani({ id, modifikace: event.target.value })),
  onTextFilterChange: (text) => dispatch(createTextFilterChange('UBYTOVANI')(text)),
  onUbytovaniChange: () => dispatch(changeUbytovaniFilter()),
});

const mergeProps = (stateProps, dispatchProps) => {
  const { ubytovani } = stateProps;
  const { onAkceSelect, onTextFilterChange, onUbytovaniChange } = dispatchProps;

  const ubytovaniWithActions = ubytovani.map((jeden) => ({
    ...jeden,
    akce: { ...jeden.akce, onSelect: (event) => onAkceSelect(jeden.id, event) },
  }));

  return { ...stateProps, ubytovani: ubytovaniWithActions, onTextFilterChange, onUbytovaniChange };
};

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator.ubytovani === next.registrator.ubytovani;

const UbytovaniContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  areStatesEqual,
})(Ubytovani);

export default UbytovaniContainer;
