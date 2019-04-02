import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrihlaseniDohlaseniSorted } from './prihlaseniDohlaseniReducer';
import {
  createDohlaseniFilterChange,
  createPrihlaseniFilterChange,
  createHidePoznamky,
  createShowPoznamky
} from './PrihlaseniDohlaseniActions';
import PrihlaseniDohlaseni from './PrihlaseniDohlaseni';

const mapStateToProps = ({ entities, registrator }, { actionPrefix, reduxName, route }) => {
  const props = registrator[reduxName];
  const { dohlaseniFilter, prihlaseniFilter, showingPoznamkyFor } = props;

  return {
    dohlaseniFilter,
    prihlaseniFilter,
    prihlaseniDohlaseni: getPrihlaseniDohlaseniSorted({ ...entities, ...props }),
    showingPoznamkyFor,
    actionPrefix,
    reduxName,
    route
  };
};

const mapDispatchToProps = (dispatch, { actionPrefix }) => ({
  onDohlaseniFilterChange: () => dispatch(createDohlaseniFilterChange(actionPrefix)()),
  onPrihlaseniFilterChange: () => dispatch(createPrihlaseniFilterChange(actionPrefix)()),
  hidePoznamky: () => dispatch(createHidePoznamky(actionPrefix)()),
  showPoznamky: id => dispatch(createShowPoznamky(actionPrefix)(id))
});

const mergeProps = (stateProps, dispatchProps) => {
  const {
    dohlaseniFilter,
    prihlaseniFilter,
    prihlaseniDohlaseni,
    showingPoznamkyFor,
    ...restState
  } = stateProps;
  const {
    onDohlaseniFilterChange,
    onPrihlaseniFilterChange,
    hidePoznamky,
    showPoznamky,
    ...restDispatch
  } = dispatchProps;

  const prihlaseniDohlaseniWithActions = prihlaseniDohlaseni.map(({ id, ...rest }) => ({
    id,
    poznamky: {
      id,
      showing: showingPoznamkyFor === id,
      onHide: hidePoznamky,
      onShow: () => showPoznamky(id)
    },
    ...rest
  }));

  return {
    dohlaseniFilter: {
      active: dohlaseniFilter,
      name: 'Dohlášeni',
      onClick: onDohlaseniFilterChange
    },
    prihlaseniFilter: {
      active: prihlaseniFilter,
      name: 'Přihlášeni',
      onClick: onPrihlaseniFilterChange
    },
    prihlaseniDohlaseni: prihlaseniDohlaseniWithActions,
    ...restState,
    ...restDispatch
  };
};

const PrihlaseniDohlaseniContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(PrihlaseniDohlaseni);

PrihlaseniDohlaseniContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export default PrihlaseniDohlaseniContainer;
