import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPoznamky } from './poznamkyReducer';
import Poznamky from './Poznamky';

const mapStateToProps = ({ entities }, { id }) => ({ poznamky: getPoznamky({ id, ...entities }) });

const mapDispatchToProps = () => ({});

const PoznamkyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Poznamky);

PoznamkyContainer.propTypes = {
  id: PropTypes.string.isRequired
};

export default PoznamkyContainer;
