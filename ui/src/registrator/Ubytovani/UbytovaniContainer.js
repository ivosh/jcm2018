import { connect } from 'react-redux';
import {
  ubytovaniNeprespano,
  ubytovaniOdhlasit,
  ubytovaniPrespano,
  ubytovaniPrihlasit
} from '../../common';
import { textFilterChange } from '../Filterable/FilterableActions';
import { changeUbytovani, saveUbytovani } from './UbytovaniActions';
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
    ubytovani: getUbytovaniSorted({ ...entities, ...ubytovani })
  };
};

const reducers = {
  Nepřespáno: ubytovaniNeprespano,
  Odhlásit: ubytovaniOdhlasit,
  Přespáno: ubytovaniPrespano,
  Přihlásit: ubytovaniPrihlasit
};
const chooseReducer = text => reducers[text] || (() => {});

const mapDispatchToProps = dispatch => ({
  onAkceSelect: (id, event) =>
    dispatch(saveUbytovani({ id, reducer: chooseReducer(event.target.value) })),
  onTextFilterChange: text => dispatch(textFilterChange('UBYTOVANI', text)),
  onUbytovaniChange: () => dispatch(changeUbytovani())
});

const mergeProps = (stateProps, dispatchProps) => {
  const { ubytovani } = stateProps;
  const { onAkceSelect, onTextFilterChange, onUbytovaniChange } = dispatchProps;

  const ubytovaniWithActions = ubytovani.map(jeden => {
    const { id, prihlaseno, prespano } = jeden;

    const akceOptions = [' '];
    akceOptions.push(prihlaseno ? 'Odhlásit' : 'Přihlásit');
    if (!prespano) {
      akceOptions.push('Přespáno');
    }
    if (prespano === true || prespano === undefined) {
      akceOptions.push('Nepřespáno');
    }

    return {
      ...jeden,
      akce: { options: akceOptions, onSelect: event => onAkceSelect(id, event) }
    };
  });

  return { ...stateProps, ubytovani: ubytovaniWithActions, onTextFilterChange, onUbytovaniChange };
};

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator.ubytovani === next.registrator.ubytovani;

const UbytovaniContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps, {
  areStatesEqual
})(Ubytovani);

export default UbytovaniContainer;
