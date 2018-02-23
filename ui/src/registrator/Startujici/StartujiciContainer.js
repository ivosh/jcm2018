import { connect } from 'react-redux';
import { getTypyStartCisel } from './startujiciReducer';
import { changeOdstartovani } from './StartujiciActions';
import Startujici from './Startujici';

const mapStateToProps = ({ entities: { rocniky } }) => ({ typy: getTypyStartCisel(rocniky) });

const mapDispatchToProps = dispatch => ({
  onOdstartovaniChange: () => dispatch(changeOdstartovani())
});

const StartujiciContainer = connect(mapStateToProps, mapDispatchToProps)(Startujici);

export default StartujiciContainer;
