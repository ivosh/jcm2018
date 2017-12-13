import { connect } from 'react-redux';
import UcastniciDigestResponsive from './UcastniciDigestResponsive';
import { fetchUcastnici } from '../../Ucastnici/UcastniciActions';
import { getUcastniciDigestSorted } from '../../Ucastnici/ucastniciReducer';

const mapStateToProps = ({ ucastnici }) => ({
  ucastnici: getUcastniciDigestSorted(ucastnici)
});

const mapDispatchToProps = dispatch => ({
  fetchUcastnici: () => {
    dispatch(fetchUcastnici());
  }
});

const UcastniciDigestContainer = connect(mapStateToProps, mapDispatchToProps)(
  UcastniciDigestResponsive
);

export default UcastniciDigestContainer;
