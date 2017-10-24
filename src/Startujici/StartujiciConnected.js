import { connect } from 'react-redux';
import Startujici from './Startujici';

const mapStateToProps = state => ({
  startujici: state.startujici.sort((a, b) => {
    return a.cislo - b.cislo;
  })
});

export default connect(mapStateToProps, null)(Startujici);