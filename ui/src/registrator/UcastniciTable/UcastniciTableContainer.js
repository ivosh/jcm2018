import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sortDirChange } from './UcastniciTableActions';
import UcastniciTable from './UcastniciTable';

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { actionPrefix, reduxName, ...rest } = ownProps;
  const { sortColumn, sortDir } = stateProps.registrator[reduxName];
  const { dispatch } = dispatchProps;

  return {
    ...rest,
    sortColumn,
    sortDir,
    onSortDirChange: sortCol => dispatch(sortDirChange(actionPrefix, sortCol))
  };
};

const UcastniciTableContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  UcastniciTable
);

// columns+data+fixedColumnCount+rowHeight are simply passed through to UcastniciTable
UcastniciTableContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

export default UcastniciTableContainer;
