import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrihlaseniDohlaseniSorted } from './prihlaseniDohlaseniReducer';
import {
  createDohlaseniFilterChange,
  createPrihlaseniFilterChange,
  createHideAkceMenu,
  createShowAkceMenu
} from './PrihlaseniDohlaseniActions';
import PrihlaseniDohlaseni from './PrihlaseniDohlaseni';

const mapStateToProps = ({ entities, registrator }, { actionPrefix, reduxName, route }) => {
  const props = registrator[reduxName];
  const { dohlaseniFilter, prihlaseniFilter, showingAkceMenuFor } = props;

  return {
    dohlaseniFilter,
    prihlaseniFilter,
    prihlaseniDohlaseni: getPrihlaseniDohlaseniSorted({ ...entities, ...props }),
    showingAkceMenuFor,
    actionPrefix,
    reduxName,
    route
  };
};

const mapDispatchToProps = (dispatch, { actionPrefix }) => ({
  onDohlaseniFilterChange: () => dispatch(createDohlaseniFilterChange(actionPrefix)()),
  onPrihlaseniFilterChange: () => dispatch(createPrihlaseniFilterChange(actionPrefix)()),
  hideAkceMenu: () => dispatch(createHideAkceMenu(actionPrefix)()),
  showAkceMenu: id => dispatch(createShowAkceMenu(actionPrefix)(id))
});

const mergeProps = (stateProps, dispatchProps) => {
  const {
    dohlaseniFilter,
    prihlaseniFilter,
    prihlaseniDohlaseni,
    showingAkceMenuFor,
    ...restState
  } = stateProps;
  const {
    onDohlaseniFilterChange,
    onPrihlaseniFilterChange,
    hideAkceMenu,
    showAkceMenu,
    ...restDispatch
  } = dispatchProps;

  const prihlaseniDohlaseniWithActions = prihlaseniDohlaseni.map(
    ({ id, nejakaPoznamka, ...rest }) => ({
      id,
      akceMenu: {
        id,
        nejakaPoznamka,
        showing: showingAkceMenuFor === id,
        onHide: hideAkceMenu,
        onShow: () => showAkceMenu(id)
      },
      ...rest
    })
  );

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
