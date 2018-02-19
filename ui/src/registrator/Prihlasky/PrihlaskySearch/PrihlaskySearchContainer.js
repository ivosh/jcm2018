import { connect } from 'react-redux';
import { inputOptions } from '../prihlaskyReducer';
import PrihlaskySearch from './PrihlaskySearch';
import { ucastnikSelected } from '../PrihlaskyActions';

const mapStateToProps = state => {
  const { registrator: { prihlasky } } = state;
  const { entities: { kategorie, rocniky, ucastnici } } = state;

  return {
    options: inputOptions('udaje.prijmeni+prihlaska.kod', prihlasky, rocniky, ucastnici),
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
    onSelect: option => dispatch(ucastnikSelected(option, kategorie, ucastnici))
  };
};

const PrihlaskySearchContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PrihlaskySearch
);

export default PrihlaskySearchContainer;
