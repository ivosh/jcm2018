import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchOptions } from './prihlaskySearchReducer';
import PrihlaskySearch from './PrihlaskySearch';

const mapStateToProps = ({ entities }) => ({
  options: getSearchOptions(entities),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  const { routeOnSelect } = ownProps;

  return {
    onSelect: (option) => routeOnSelect(option.id),
  };
};

const PrihlaskySearchContainer = connect(mapStateToProps, mapDispatchToProps)(PrihlaskySearch);

PrihlaskySearchContainer.propTypes = {
  routeOnSelect: PropTypes.func.isRequired,
};

export default PrihlaskySearchContainer;
