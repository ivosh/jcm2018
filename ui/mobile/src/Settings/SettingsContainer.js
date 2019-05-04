import { connect } from 'react-redux';
import Settings from './Settings';

const mapStateToProps = ({ connected }) => ({ connected });

export default connect(
  mapStateToProps,
  null
)(Settings);
