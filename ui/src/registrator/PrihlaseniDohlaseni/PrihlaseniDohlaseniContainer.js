import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrihlaseniDohlaseniSorted } from './prihlaseniDohlaseniReducer';
import PrihlaseniDohlaseni from './PrihlaseniDohlaseni';

const mapStateToProps = ({ entities, registrator }, { actionPrefix, reduxName }) => ({
  prihlaseniDohlaseni: getPrihlaseniDohlaseniSorted({ ...entities, ...registrator[reduxName] }),
  actionPrefix,
  reduxName
});

const PrihlaseniDohlaseniContainer = connect(mapStateToProps, {})(PrihlaseniDohlaseni);

PrihlaseniDohlaseniContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired
};

export default PrihlaseniDohlaseniContainer;