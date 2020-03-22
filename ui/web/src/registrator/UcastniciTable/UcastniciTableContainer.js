import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withResponsive from '../../shared/withResponsive/withResponsive';
import { createSortDirChange } from './UcastniciTableActions';
import UcastniciTable from './UcastniciTable';

const mapStateToProps = (state, ownProps) => {
  const { reduxName, ...rest } = ownProps;
  const { sortColumn, sortDir } = state.registrator[reduxName];

  return {
    ...rest,
    sortColumn,
    sortDir,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { actionPrefix } = ownProps;

  return {
    onSortDirChange: (sortCol) => dispatch(createSortDirChange(actionPrefix)(sortCol)),
  };
};

const UcastniciTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(withResponsive(UcastniciTable));

// columns+data+fixedColumnCount+rowHeight are simply passed through to UcastniciTable
UcastniciTableContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
};

export default UcastniciTableContainer;
