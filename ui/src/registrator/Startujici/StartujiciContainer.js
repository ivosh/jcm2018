import { connect } from 'react-redux';
import { getTypyStartCisel } from './startujiciReducer';
import { changeOdstartovani } from './StartujiciActions';
import Startujici from './Startujici';

const mapStateToProps = state => {
  const { entities: { rocniky } } = state;
  const { registrator: { startujici: { odstartovani } } } = state;

  return { odstartovani, typy: getTypyStartCisel(rocniky) };
};

const mapDispatchToProps = dispatch => ({
  onOdstartovaniChange: () => dispatch(changeOdstartovani())
});

const StartujiciContainer = connect(mapStateToProps, mapDispatchToProps)(Startujici);

export default StartujiciContainer;
