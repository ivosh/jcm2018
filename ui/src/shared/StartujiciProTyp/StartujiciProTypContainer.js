import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  decorareStartujici,
  getStartCislaProTyp,
  getStartujiciProTyp
} from './startujiciProTypReducer';
import StartujiciProTyp from './StartujiciProTyp';

const mapStateToProps = state => state;

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { entities } = stateProps;
  const { jenStartujici, prihlasky, typ, onClick } = ownProps;

  const startujici = jenStartujici
    ? getStartujiciProTyp({ prihlasky, typ, ...entities })
    : getStartCislaProTyp({ prihlasky, typ, ...entities });

  const decorated = jenStartujici
    ? decorareStartujici(startujici, () => true, onClick)
    : decorareStartujici(startujici, jedenStartujici => !jedenStartujici.id, onClick);
  return {
    startujici: decorated
  };
};

const StartujiciProTypContainer = connect(mapStateToProps, null, mergeProps)(StartujiciProTyp);

StartujiciProTypContainer.propTypes = {
  jenStartujici: PropTypes.bool.isRequired,
  prihlasky: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default StartujiciProTypContainer;
