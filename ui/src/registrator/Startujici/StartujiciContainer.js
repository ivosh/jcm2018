import { connect } from 'react-redux';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import Startujici from './Startujici';

const mapStateToProps = state => {
  const { registrator: { startujici: { fetching } } } = state;

  return { fetching };
};

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici())
});

const StartujiciContainer = connect(mapStateToProps, mapDispatchToProps)(Startujici);

export default StartujiciContainer;
