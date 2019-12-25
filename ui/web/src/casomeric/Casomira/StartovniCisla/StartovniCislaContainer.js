import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stopkyInsertMezicas } from '../../Stopky/StopkyProTyp/StopkyProTypActions';
import { canDrop, createDropAction } from './StartovniCislaActions';
import StartovniCisla from './StartovniCisla';

const mapDispatchToProps = (dispatch, ownProps) => {
  const { typ } = ownProps;

  return {
    canDrop,
    onDrop: dropResult => {
      dispatch(createDropAction(dropResult));
      if (dropResult.source.cas) {
        dispatch(stopkyInsertMezicas({ cas: dropResult.source.cas, typ }));
      }
      return undefined;
    }
  };
};

const StartovniCislaContainer = connect(null, mapDispatchToProps)(StartovniCisla);

StartovniCislaContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StartovniCislaContainer;
