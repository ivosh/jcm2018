import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createKategorieFilterChange, createTextFilterChange } from './FilterableActions';
import Filterable from './Filterable';

const mapStateToProps = (state, ownProps) => {
  const { reduxName, numberOfItems } = ownProps;
  const { kategorieFilter, textFilter } = state.registrator[reduxName];

  return { kategorieFilter, numberOfItems, textFilter };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { actionPrefix } = ownProps;

  return {
    onTextFilterChange: text => dispatch(createTextFilterChange(actionPrefix)(text)),
    onKategorieFilterChange: typKategorie =>
      dispatch(createKategorieFilterChange(actionPrefix)(typKategorie))
  };
};

const FilterableContainer = connect(mapStateToProps, mapDispatchToProps)(Filterable);

FilterableContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  numberOfItems: PropTypes.number.isRequired
};

export default FilterableContainer;
