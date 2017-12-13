import Dimensions from 'react-dimensions';
import UcastniciDigestContainer from './UcastniciDigestContainer';

const UcastniciDigestResponsive = Dimensions({
  getHeight: () => window.innerHeight - 100,
  getWidth: () => window.innerWidth - 100,
  containerStyle: {
    paddingLeft: '30px',
    paddingRight: '50px'
  }
})(UcastniciDigestContainer);

export default UcastniciDigestResponsive;
