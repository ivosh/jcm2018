import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { canDrop } from './StartovniCislaActions';
import StartovniCislaDnD from './StartovniCislaDnD';

const mapDispatchToProps = dispatch => ({
  canDrop: canDrop,
  onDrop: obj => {
    console.log('dropped', obj);
  }
});

const StartovniCislaContainer = connect(null, mapDispatchToProps)(StartovniCislaDnD);

StartovniCislaContainer.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StartovniCislaContainer;
