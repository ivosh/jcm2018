import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchStopky as fetchStopkyAction } from '../../entities/stopky/stopkyActions';
import LoadingIndicator from '../../shared/LoadingIndicator';

const withFetchStopky = WrappedComponent => {
  class WithFetchStopkyComponent extends PureComponent {
    componentDidMount = () => {
      this.props.fetchStopky();
    };

    render = () => {
      const { fetchingStopky, fetchStopky, ...rest } = this.props;

      switch (fetchingStopky) {
        case 'fetching':
          return (
            <div className="FetchComponent">
              <LoadingIndicator /> Načítám stopky...
            </div>
          );
        case 'done':
          return <WrappedComponent {...rest} />;
        default:
          return <div />;
      }
    };
  }

  WithFetchStopkyComponent.propTypes = {
    fetchingStopky: PropTypes.oneOf(['init', 'fetching', 'done']).isRequired,
    fetchStopky: PropTypes.func.isRequired
  };

  const mapStateToProps = (state, ownProps) => ({
    fetchingStopky: state.fetchingStopky,
    ...ownProps
  });

  const mapDispatchToProps = dispatch => ({
    fetchStopky: () => dispatch(fetchStopkyAction())
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFetchStopkyComponent);
};

export default withFetchStopky;
