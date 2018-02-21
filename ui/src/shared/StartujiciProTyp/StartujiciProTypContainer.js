import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStartCislaProTyp, getStartujiciProTyp } from './startujiciProTypReducer';
import StartujiciProTyp from './StartujiciProTyp';

const mapStateToProps = (state, ownProps) => {
  const { entities } = state;
  const { jenStartujici, prihlasky, typ, renderer } = ownProps;

  return {
    startujici: jenStartujici
      ? getStartujiciProTyp({ prihlasky, typ, ...entities })
      : getStartCislaProTyp({ prihlasky, typ, ...entities }),
    renderer
  };
};

const StartujiciProTypContainer = connect(mapStateToProps)(StartujiciProTyp);

StartujiciProTypContainer.propTypes = {
  jenStartujici: PropTypes.bool.isRequired,
  prihlasky: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  renderer: PropTypes.func.isRequired
};

export default StartujiciProTypContainer;
