import { connect } from 'react-redux';
import { getPrihlaseni, getOdstartovani } from './startujiciReducer';
import { createVykon, deleteVykon } from './StartujiciActions';
import StartujiciDnD from './StartujiciDnD';

const mapStateToProps = state => ({
  prihlaseni: getPrihlaseni({ ...state.entities }),
  odstartovani: getOdstartovani({ ...state.entities })
});

const mapDispatchToProps = dispatch => ({
  movePrihlasen: id => dispatch(createVykon({ id })),
  moveOdstartovan: id => dispatch(deleteVykon({ id }))
});

const StartujiciContainer = connect(mapStateToProps, mapDispatchToProps)(StartujiciDnD);

export default StartujiciContainer;
