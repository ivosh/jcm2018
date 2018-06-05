import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPrihlaseniDohlaseniSorted } from './prihlaseniDohlaseniReducer';
import {
  createDohlaseniFilterChange,
  createPrihlaseniFilterChange
} from './PrihlaseniDohlaseniActions';
import PrihlaseniDohlaseni from './PrihlaseniDohlaseni';

const mapStateToProps = ({ entities, registrator }, { actionPrefix, reduxName, route }) => {
  const props = registrator[reduxName];
  const { dohlaseniFilter, prihlaseniFilter } = props;

  return {
    dohlaseniFilter,
    prihlaseniFilter,
    prihlaseniDohlaseni: getPrihlaseniDohlaseniSorted({ ...entities, ...props }),
    actionPrefix,
    reduxName,
    route
  };
};

const mapDispatchToProps = (dispatch, { actionPrefix }) => ({
  onDohlaseniFilterChange: () => dispatch(createDohlaseniFilterChange(actionPrefix)()),
  onPrihlaseniFilterChange: () => dispatch(createPrihlaseniFilterChange(actionPrefix)())
});

const mergeProps = (stateProps, dispatchProps) => {
  const { dohlaseniFilter, prihlaseniFilter, ...rest } = stateProps;
  const { onDohlaseniFilterChange, onPrihlaseniFilterChange } = dispatchProps;

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
    ...rest
  };
};

const PrihlaseniDohlaseniContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  PrihlaseniDohlaseni
);

PrihlaseniDohlaseniContainer.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export default PrihlaseniDohlaseniContainer;
