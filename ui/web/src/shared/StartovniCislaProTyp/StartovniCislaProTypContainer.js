import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getStartovniCislaProTyp,
  getStartovniCislaProTypVsechna,
} from './startovniCislaProTypReducer';
import StartovniCislaProTyp from './StartovniCislaProTyp';

const mapStateToProps = (state, ownProps) => {
  const { entities } = state;
  const { jenStartujici, odstartovani, typ, Renderer, ...restOwnProps } = ownProps;

  return {
    startovniCisla: jenStartujici
      ? getStartovniCislaProTyp({ odstartovani, typ, ...entities })
      : getStartovniCislaProTypVsechna({ odstartovani, typ, ...entities }),
    typ,
    Renderer,
    ...restOwnProps,
  };
};

const StartovniCislaProTypContainer = connect(mapStateToProps)(StartovniCislaProTyp);

StartovniCislaProTypContainer.propTypes = {
  jenStartujici: PropTypes.bool.isRequired,
  odstartovani: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  Renderer: PropTypes.func.isRequired,
};

export default StartovniCislaProTypContainer;
