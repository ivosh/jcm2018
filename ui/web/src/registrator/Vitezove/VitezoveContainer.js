import { connect } from 'react-redux';
import { TYPY_KATEGORII_VYHODNOCOVANE } from '../../constants';
import { getKategorieProTyp } from '../../entities/rocniky/rocnikyReducer';
import { getVitezove } from './vitezoveReducer';
import { kategorieFilterChange, kategorieSubFilterChange } from './VitezoveActions';
import Vitezove from './Vitezove';

const mapStateToProps = ({ entities, registrator: { vitezove } }) => {
  const { kategorieFilter, kategorieSubFilter } = vitezove;

  const kategorieFilters = TYPY_KATEGORII_VYHODNOCOVANE;
  const kategorieFiltersActive = kategorieFilters.map(typ => {
    const active = typ === kategorieFilter;
    const visible = active || kategorieFilter === '';
    return { typ, active, visible };
  });
  const kategorieFiltersActiveVisible = kategorieFiltersActive.filter(({ visible }) => visible);

  const kategorieSubFiltersVisible = kategorieFilter !== '';
  const kategorieSubFilters =
    kategorieFilter === '' ? [] : getKategorieProTyp({ ...entities, typ: kategorieFilter }).list;
  const kategorieSubFiltersActive = kategorieSubFilters.map(jedna => {
    const active = kategorieSubFilter === jedna.id;
    return { ...jedna, active };
  });

  return {
    kategorieFilters: kategorieFiltersActiveVisible,
    kategorieSubFiltersVisible,
    kategorieSubFilters: kategorieSubFiltersActive,
    vitezove: getVitezove({ ...vitezove, ...entities })
  };
};

const mapDispatchToProps = dispatch => ({
  onKategorieFilterChange: typ => dispatch(kategorieFilterChange(typ)),
  onKategorieSubFilterChange: kategorie => dispatch(kategorieSubFilterChange(kategorie))
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

const VitezoveContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Vitezove);

export default VitezoveContainer;
