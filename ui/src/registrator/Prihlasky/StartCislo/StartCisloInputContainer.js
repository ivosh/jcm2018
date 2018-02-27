import { connect } from 'react-redux';
import { inputChanged } from '../PrihlaskyForm/PrihlaskyFormActions';
import { hide, show } from './StartCisloActions';
import StartCisloInput from './StartCisloInput';

const mapStateToProps = (state, ownProps) => {
  const typ = state.registrator.prihlasky.form.prihlaska.typ || '';
  const { showing } = state.registrator.prihlasky.startCislo;

  return { showing, typ, ...ownProps };
};

const mapDispatchToProps = dispatch => ({
  onHide: () => dispatch(hide()),
  onSelect: startCislo => {
    dispatch(hide());
    dispatch(inputChanged('prihlaska.startCislo', { target: { value: `${startCislo}` } }));
  },
  onShow: () => dispatch(show())
});

const StartCisloInputContainer = connect(mapStateToProps, mapDispatchToProps)(StartCisloInput);

export default StartCisloInputContainer;
