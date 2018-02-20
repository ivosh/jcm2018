import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUcastnici as fetchUcastniciAction } from '../../entities/ucastnici/ucastniciActions';
import LoadingIndicator from '../../shared/LoadingIndicator';

const withFetchUcastnici = WrappedComponent => {
  class WithFetchUcastniciComponent extends PureComponent {
    componentDidMount = () => {
      this.props.fetchUcastnici();
    };

    render = () => {
      const { fetching, fetchUcastnici, ...rest } = this.props;

      switch (fetching) {
        case 'fetching':
          return (
            <div className="PrihlaskyForm_div">
              <LoadingIndicator /> Načítám účastníky...
            </div>
          );
        case 'done':
          return <WrappedComponent {...rest} />;
        default:
          return <div />;
      }
    };
  }

  WithFetchUcastniciComponent.propTypes = {
    fetching: PropTypes.oneOf(['init', 'fetching', 'done']).isRequired,
    fetchUcastnici: PropTypes.func.isRequired
  };

  const mapStateToProps = (state, ownProps) => ({
    fetching: state.fetching,
    ...ownProps
  });

  const mapDispatchToProps = dispatch => ({
    fetchUcastnici: () => dispatch(fetchUcastniciAction())
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFetchUcastniciComponent);
};

export default withFetchUcastnici;
