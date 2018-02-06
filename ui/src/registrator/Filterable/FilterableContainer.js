import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { kategorieVykonuFilterChange, textFilterChange } from './FilterableActions';
import Filterable from './Filterable';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { actionPrefix, reduxName, numberOfItems } = ownProps;
  const { kategorieVykonuFilter, textFilter } = stateProps.registrator[reduxName];
  const { dispatch } = dispatchProps;

  return {
    kategorieVykonuFilter,
    numberOfItems,
    textFilter,
    onTextFilterChange: text => dispatch(textFilterChange(actionPrefix, text)),
    onKategorieVykonuFilterChange: typKategorie =>
      dispatch(kategorieVykonuFilterChange(actionPrefix, typKategorie))
  };
};

const FilterableContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Filterable);

FilterableContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  numberOfItems: PropTypes.number.isRequired
};

export default FilterableContainer;
