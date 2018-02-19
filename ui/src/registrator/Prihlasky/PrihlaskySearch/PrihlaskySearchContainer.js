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

const mergeProps = (stateProps, dispatchProps) => {
  const { entities, options } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    options,
    onSelect: option => dispatch(ucastnikSelected({ ...option, ...entities }))
  };
};

const PrihlaskySearchContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PrihlaskySearch
);

export default PrihlaskySearchContainer;
