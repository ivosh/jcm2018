import { connect } from 'react-redux';
import { inputOptions } from './prihlaseniReducer';
import PrihlaseniSearch from './PrihlaseniSearch';
import { inputChanged, ucastnikSelected } from './PrihlaseniActions';

const mapStateToProps = state => {
  const { registrator: { prihlaseni } } = state;
  const { entities: { kategorie, rocniky, ucastnici } } = state;

  return {
    options: inputOptions('udaje.prijmeni+prihlaska.kod', prihlaseni, rocniky, ucastnici),
    kategorie,
    ucastnici
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps) => {
  const { options, kategorie, ucastnici } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    options,
    onChange: value => dispatch(inputChanged('udaje.prijmeni', { target: { value } })),
    onSelect: option => dispatch(ucastnikSelected(option, kategorie, ucastnici))
  };
};

const PrihlaseniSearchContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PrihlaseniSearch
);

export default PrihlaseniSearchContainer;
