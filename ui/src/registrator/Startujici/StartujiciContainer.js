import { connect } from 'react-redux';
import { getTypyStartCisel } from './startujiciReducer';
import Startujici from './Startujici';

const mapStateToProps = ({ entities: { rocniky } }) => ({ typy: getTypyStartCisel(rocniky) });

const StartujiciContainer = connect(mapStateToProps, null)(Startujici);

export default StartujiciContainer;
