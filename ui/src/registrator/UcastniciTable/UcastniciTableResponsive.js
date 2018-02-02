import Dimensions from 'react-dimensions';
import UcastniciTable from './UcastniciTable';

const UcastniciTableResponsive = Dimensions({
  getHeight: () => window.innerHeight - 130 // filter row
})(UcastniciTable);

export default UcastniciTableResponsive;
