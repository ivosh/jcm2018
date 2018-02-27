import { connect } from 'react-redux';
import { hide, show } from './StartCisloActions';
import StartCisloInput from './StartCisloInput';

const mapStateToProps = (state, ownProps) => {
  const { showing } = state.registrator.prihlasky.startCislo;

  return { showing, ...ownProps };
};

const mapDispatchToProps = dispatch => ({
  onHide: () => dispatch(hide()),
  onShow: () => dispatch(show())
});

const StartCisloInputContainer = connect(mapStateToProps, mapDispatchToProps)(StartCisloInput);

export default StartCisloInputContainer;
