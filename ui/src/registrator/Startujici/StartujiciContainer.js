import { connect } from 'react-redux';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import { getTypyStartCisel } from './startujiciReducer';
import Startujici from './Startujici';

const mapStateToProps = state => {
  const { entities: { rocniky }, registrator: { startujici: { fetching } } } = state;
  const typy = getTypyStartCisel(rocniky);

  return { fetching, typy };
};

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => dispatch(fetchUcastnici())
});

const StartujiciContainer = connect(mapStateToProps, mapDispatchToProps)(Startujici);

export default StartujiciContainer;
