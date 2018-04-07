import { connect } from 'react-redux';
import { getPrihlaseni, getOdstartovani } from './startujiciReducer';
import Startujici from './Startujici';

const mapStateToProps = state => {
  const { entities } = state;

  return {
    prihlaseni: getPrihlaseni({ ...entities }),
    odstartovani: getOdstartovani({ ...entities })
  };
};

const StartujiciContainer = connect(mapStateToProps, null)(Startujici);

export default StartujiciContainer;
