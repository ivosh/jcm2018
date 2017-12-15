import Dimensions from 'react-dimensions';
import UcastniciDigestContainer from './UcastniciDigestContainer';

const UcastniciDigestResponsive = Dimensions({
  getHeight: () => window.innerHeight - 120,
  getWidth: () => window.innerWidth - 100
})(UcastniciDigestContainer);

export default UcastniciDigestResponsive;
