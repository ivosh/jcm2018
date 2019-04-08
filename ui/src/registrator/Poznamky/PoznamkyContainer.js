import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPoznamky } from './poznamkyReducer';
import {
  addPoznamka,
  deletePoznamka as deletePoznamkaAction,
  modifyPoznamka as modifyPoznamkaAction
} from './PoznamkyActions';
import Poznamky from './Poznamky';

const mapStateToProps = ({ entities }, { id }) => ({
  id,
  poznamky: getPoznamky({ id, ...entities })
});

const mapDispatchToProps = (dispatch, { id }) => ({
  addPoznamka: event => dispatch(addPoznamka({ id, poznamka: { text: event.target.value } })),
  deletePoznamka: index => dispatch(deletePoznamkaAction({ id, index })),
  modifyPoznamka: index => poznamka => dispatch(modifyPoznamkaAction({ id, index, poznamka }))
});

const mergeProps = (
  { poznamky, ...stateProps },
  { deletePoznamka, modifyPoznamka, ...dispatchProps }
) => ({
  poznamky: poznamky.map((poznamka, index) => ({
    ...poznamka,
    deletePoznamka: () => deletePoznamka(index),
    modifyPoznamka: event =>
      modifyPoznamka(index)({ datum: poznamka.datum, text: event.target.value })
  })),
  ...stateProps,
  ...dispatchProps
});

const PoznamkyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Poznamky);

PoznamkyContainer.propTypes = {
  id: PropTypes.string.isRequired
};

export default PoznamkyContainer;
