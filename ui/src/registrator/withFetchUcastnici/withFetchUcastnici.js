import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUcastnici } from '../../entities/ucastnici/ucastniciActions';
import LoadingIndicator from '../../shared/LoadingIndicator';

const withFetchUcastnici = WrappedComponent => {
  class WithFetchUcastniciComponent extends PureComponent {
    componentDidMount = () => {
      this.props.fetchUcastnici();
    };

    render = () => {
      const { fetching } = this.props;
      if (fetching) {
        return (
          <div className="PrihlaskyForm_div">
            <LoadingIndicator /> Načítám účastníky...
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    };
  }

  WithFetchUcastniciComponent.propTypes = {
    fetching: PropTypes.bool.isRequired,
    fetchUcastnici: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    fetching: state.fetching
  });

  const mapDispatchToProps = dispatch => ({
    fetchUcastnici: () => dispatch(fetchUcastnici())
  });

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps
  });

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(WithFetchUcastniciComponent);
};

export default withFetchUcastnici;
