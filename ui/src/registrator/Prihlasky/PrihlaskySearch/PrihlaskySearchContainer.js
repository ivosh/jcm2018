import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSearchOptions } from './prihlaskySearchReducer';
import PrihlaskySearch from './PrihlaskySearch';
import { ucastnikSelected } from '../PrihlaskyActions';

const mapStateToProps = state => {
  const { entities } = state;

  return {
    entities,
    options: getSearchOptions(entities)
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { entities, options } = stateProps;
  const { dispatch } = dispatchProps;
  const { routeOnSelect } = ownProps;

  return {
    options,
    onSelect: async option => {
      await dispatch(ucastnikSelected({ ...option, ...entities }));
      routeOnSelect(option.id);
    }
  };
};

const PrihlaskySearchContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PrihlaskySearch
);

PrihlaskySearchContainer.propTypes = {
  routeOnSelect: PropTypes.func.isRequired
};

export default PrihlaskySearchContainer;
