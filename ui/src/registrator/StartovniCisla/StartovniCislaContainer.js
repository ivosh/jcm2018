import { connect } from 'react-redux';
import { getTypyStartCisel } from './startovniCislaReducer';
import { changeOdstartovani } from './StartovniCislaActions';
import StartovniCisla from './StartovniCisla';

const mapStateToProps = state => {
  const { entities: { rocniky } } = state;
  const { registrator: { startovniCisla: { odstartovani } } } = state;

  return { odstartovani, typy: getTypyStartCisel(rocniky) };
};

const mapDispatchToProps = dispatch => ({
  onOdstartovaniChange: () => dispatch(changeOdstartovani())
});

const StartovniCislaContainer = connect(mapStateToProps, mapDispatchToProps)(StartovniCisla);

export default StartovniCislaContainer;
