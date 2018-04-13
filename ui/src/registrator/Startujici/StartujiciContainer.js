import { connect } from 'react-redux';
import { getPrihlaseni, getOdstartovani } from './startujiciReducer';
import { createVykon } from './StartujiciActions';
import Startujici from './Startujici';

const mapStateToProps = state => ({
  prihlaseni: getPrihlaseni({ ...state.entities }),
  odstartovani: getOdstartovani({ ...state.entities })
});

const mapDispatchToProps = dispatch => ({
  dropPrihlasen: id => dispatch(createVykon({ id }))
});

const StartujiciContainer = connect(mapStateToProps, mapDispatchToProps)(Startujici);

export default StartujiciContainer;
