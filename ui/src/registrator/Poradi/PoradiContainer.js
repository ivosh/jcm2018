import { connect } from 'react-redux';
import { TYPY_KATEGORII } from '../../constants';
import { getKategorieProTyp } from '../../entities/rocniky/rocnikyReducer';
import {
  createKategorieFilterChange,
  createTextFilterChange
} from '../Filterable/FilterableActions';
import { getPoradiSorted } from './poradiReducer';
import { kategorieSubFilterChange } from './PoradiActions';
import Poradi from './Poradi';

const actionPrefix = 'PORADI';
const reduxName = 'poradi';

const mapStateToProps = ({ entities, registrator: { poradi } }) => {
  const { kategorieFilter, kategorieSubFilter, textFilter } = poradi;

  const kategorieFilters = TYPY_KATEGORII;
  const kategorieFiltersActive = kategorieFilters.map(typ => {
    const active = typ === kategorieFilter;
    const visible = active || kategorieFilter === '';
    return { typ, active, visible };
  });
  const kategorieFiltersActiveVisible = kategorieFiltersActive.filter(({ visible }) => visible);

  const kategorieSubFiltersVisible = kategorieFilter !== '';
  const kategorieSubFilters =
    kategorieFilter === '' ? [] : getKategorieProTyp({ ...entities, typ: kategorieFilter });
  const kategorieSubFiltersActive = kategorieSubFilters.map(jedna => {
    const active = kategorieSubFilter === jedna.id;
    return { ...jedna, active };
  });

  return {
    actionPrefix,
    kategorieFilters: kategorieFiltersActiveVisible,
    kategorieSubFiltersVisible,
    kategorieSubFilters: kategorieSubFiltersActive,
    poradi: getPoradiSorted({ ...poradi, ...entities }),
    reduxName,
    textFilter
  };
};

const mapDispatchToProps = dispatch => ({
  onKategorieFilterChange: typ => dispatch(createKategorieFilterChange(actionPrefix)(typ)),
  onKategorieSubFilterChange: kategorie => dispatch(kategorieSubFilterChange(kategorie)),
  onTextFilterChange: text => dispatch(createTextFilterChange(actionPrefix)(text))
});

const mergeProps = (stateProps, dispatchProps) => {
  const { kategorieFilters, kategorieSubFilters, ...restOfStateProps } = stateProps;
  const {
    onKategorieFilterChange,
    onKategorieSubFilterChange,
    ...restOfDispatchProps
  } = dispatchProps;

  const kategorieFiltersAction = kategorieFilters.map(jedna => ({
    ...jedna,
    onClick: () => onKategorieFilterChange(jedna.typ)
  }));

  const kategorieSubFiltersAction = kategorieSubFilters.map(jedna => ({
    ...jedna,
    onClick: () => onKategorieSubFilterChange(jedna.id)
  }));

  return {
    ...restOfStateProps,
    ...restOfDispatchProps,
    kategorieFilters: kategorieFiltersAction,
    kategorieSubFilters: kategorieSubFiltersAction
  };
};

const PoradiContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Poradi);

export default PoradiContainer;
