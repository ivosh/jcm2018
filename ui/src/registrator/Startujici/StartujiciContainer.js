import { connect } from 'react-redux';
import { getPrihlaseni, getOdstartovani } from './startujiciReducer';
import Startujici from './Startujici';

const mapStateToProps = state => ({
  prihlaseni: getPrihlaseni({ ...state.entities }),
  odstartovani: getOdstartovani({ ...state.entities })
});

const StartujiciContainer = connect(mapStateToProps, null)(Startujici);

export default StartujiciContainer;
