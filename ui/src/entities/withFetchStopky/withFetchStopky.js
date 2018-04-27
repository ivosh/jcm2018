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
      const { fetching, fetchStopky, ...rest } = this.props;

      switch (fetching) {
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
    fetching: PropTypes.oneOf(['init', 'fetching', 'done']).isRequired,
    fetchStopky: PropTypes.func.isRequired
  };

  const mapStateToProps = (state, ownProps) => ({
    fetching: state.fetching,
    ...ownProps
  });

  const mapDispatchToProps = dispatch => ({
    fetchStopky: () => dispatch(fetchStopkyAction())
  });

  return connect(mapStateToProps, mapDispatchToProps)(WithFetchStopkyComponent);
};

export default withFetchStopky;
