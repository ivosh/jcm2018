import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { kategorieFilterChange, textFilterChange } from './FilterableActions';
import Filterable from './Filterable';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { actionPrefix, reduxName, numberOfItems } = ownProps;
  const { kategorieFilter, textFilter } = stateProps.registrator[reduxName];
  const { dispatch } = dispatchProps;

  return {
    kategorieFilter,
    numberOfItems,
    textFilter,
    onTextFilterChange: text => dispatch(textFilterChange(actionPrefix, text)),
    onKategorieFilterChange: typKategorie =>
      dispatch(kategorieFilterChange(actionPrefix, typKategorie))
  };
};

const FilterableContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Filterable);

FilterableContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  numberOfItems: PropTypes.number.isRequired
};

export default FilterableContainer;
