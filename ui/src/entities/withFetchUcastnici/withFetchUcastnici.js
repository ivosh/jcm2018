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
      const { fetchingUcastnici, fetchUcastnici, ...rest } = this.props;

      switch (fetchingUcastnici) {
        case 'fetching':
          return (
            <div className="FetchComponent">
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
    fetchingUcastnici: PropTypes.oneOf(['init', 'fetching', 'done']).isRequired,
    fetchUcastnici: PropTypes.func.isRequired
  };

  const mapStateToProps = (state, ownProps) => ({
    fetchingUcastnici: state.fetchingUcastnici,
    ...ownProps
  });

  const mapDispatchToProps = dispatch => ({
    fetchUcastnici: () => dispatch(fetchUcastniciAction())
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFetchUcastniciComponent);
};

export default withFetchUcastnici;
