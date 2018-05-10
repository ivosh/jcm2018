import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { canDrop } from './StartovniCislaActions';
import StartovniCisla from './StartovniCisla';

const mapDispatchToProps = dispatch => ({
  canDrop,
  onDrop: obj => {
    console.log('dropped', obj);
  }
});

const StartovniCislaContainer = connect(null, mapDispatchToProps)(StartovniCisla);

StartovniCislaContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StartovniCislaContainer;
