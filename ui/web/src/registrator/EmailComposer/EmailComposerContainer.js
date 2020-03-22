import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendEmail } from './EmailComposerActions';
import EmailComposer from './EmailComposer';

const mapDispatchToProps = (dispatch, ownProps) => ({
  onSubmit: (props) => dispatch(sendEmail(props)),
  ...ownProps,
});

const EmailComposerContainer = connect(null, mapDispatchToProps)(EmailComposer);

EmailComposerContainer.propTypes = {
  mailTo: PropTypes.string,
  subject: PropTypes.string,
  body: PropTypes.string,
};

EmailComposerContainer.defaultProps = {
  mailTo: '',
  subject: '',
  body: '',
};

export default EmailComposerContainer;
