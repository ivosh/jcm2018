import { connect } from 'react-redux';
import { getPrihlaseni, getOdstartovani } from './startujiciReducer';
import { createVykon, deleteVykon } from './StartujiciActions';
import Startujici from './Startujici';

const mapStateToProps = (state) => ({
  prihlaseni: getPrihlaseni({ ...state.entities }),
  odstartovani: getOdstartovani({ ...state.entities }),
});

const mapDispatchToProps = (dispatch) => ({
  movePrihlasen: (id) => dispatch(createVykon({ id })),
  moveOdstartovan: (id) => dispatch(deleteVykon({ id })),
});

const StartujiciContainer = connect(mapStateToProps, mapDispatchToProps)(Startujici);

export default StartujiciContainer;
