import { connect } from 'react-redux';
import { textFilterChange } from '../Filterable/FilterableActions';
import { changeUbytovani } from './UbytovaniActions';
import { getUbytovaniSorted } from './ubytovaniReducer';
import Ubytovani from './Ubytovani';

// Don't forget to update areStatesEqual!
const mapStateToProps = ({ entities, registrator: { ubytovani } }) => {
  const { jenUbytovani, textFilter } = ubytovani;

  return {
    actionPrefix: 'UBYTOVANI',
    jenUbytovani,
    reduxName: 'ubytovani',
    textFilter,
    ubytovani: getUbytovaniSorted({ ...entities, ...ubytovani })
  };
};

const mapDispatchToProps = dispatch => ({
  onTextFilterChange: text => dispatch(textFilterChange('UBYTOVANI', text)),
  onUbytovaniChange: () => dispatch(changeUbytovani())
});

const areStatesEqual = (next, prev) =>
  prev.entities === next.entities && prev.registrator.ubytovani === next.registrator.ubytovani;

const UbytovaniContainer = connect(mapStateToProps, mapDispatchToProps, null, {
  areStatesEqual
})(Ubytovani);

export default UbytovaniContainer;
