import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import withResponsive from '../../../shared/withResponsive/withResponsive';
import { getUcastiProRok } from '../../../entities/ucastnici/ucastniciReducer';
import { getMezicasy, getStopkyByTyp } from '../../Stopky/StopkyProTyp/stopkyProTypReducer';
import { saveStopky, stopkyRemoveMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import Mezicasy from './Mezicasy';

const mapStateToProps = (state, ownProps) => {
  const { typ } = ownProps;
  const stopky = getStopkyByTyp({ state, typ });
  const ucasti = getUcastiProRok({ ...state.entities });

  const mezicasy = getMezicasy({ stopky, ucasti, kategorie: state.entities.kategorie });
  const populated = mezicasy.map(mezicas => {
    const { cas, ...rest } = mezicas;
    return { ...rest, cas: moment.duration(cas) };
  });

  return { mezicasy: populated, typ };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    onStopkyRemoveMezicas: ({ cas }) =>
      dispatch(saveStopky({ action: stopkyRemoveMezicas({ cas }), typ }))
  };
};

const mergeProps = (stateProps, dispatchProps) => {
  const { mezicasy, ...restOfStateProps } = stateProps;
  const { onStopkyRemoveMezicas, onUcastnikRemoveCas, ...restOfDispatchProps } = dispatchProps;

  const populated = mezicasy.map(mezicas => {
    const { id, cas } = mezicas;
    return {
      ...mezicas,
      onEdit: () => {},
      onRemove: id ? () => onUcastnikRemoveCas({ id }) : () => onStopkyRemoveMezicas({ cas })
    };
  });

  return {
    ...restOfStateProps,
    mezicasy: populated,
    ...restOfDispatchProps
  };
};

const MezicasyResponsive = withResponsive(Mezicasy, { disableWidth: true });

const MezicasyContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  MezicasyResponsive
);

MezicasyContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default MezicasyContainer;
