import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { canDrop, createDropAction } from './StartovniCislaActions';
import StartovniCisla from './StartovniCisla';

const mapDispatchToProps = dispatch => ({
  canDrop,
  onDrop: dropResult => {
    dispatch(createDropAction(dropResult));
    return undefined;
  }
});

const StartovniCislaContainer = connect(null, mapDispatchToProps)(StartovniCisla);

StartovniCislaContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StartovniCislaContainer;
