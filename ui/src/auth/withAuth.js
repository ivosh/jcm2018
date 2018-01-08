import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* Causes WrappedComponent to be redirected to `/signin` if there is no `this.props.authenticated`
   available. Tacks on `?next=` query param with the `window.location` which the sign in page
   can redirect user back to on successful authentication. */
const withAuth = WrappedComponent => {
  class WithAuthComponent extends Component {
    /* :TODO: investigage
    constructor (props) {
      super(props);

      // On the client redirect right away to the sign in page.
      if (process.browser && !props.authenticated) {
        this.props.history.push('/signin?next=' + encodeURI(window.location))
      }
    }
    */

    componentWillMount = () => {
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    };

    componentWillUpdate = nextProps => {
      if (!nextProps.authenticated) {
        this.props.history.push('/signin');
      }
    };

    /* :TODO: investigage
    componentWillReceiveProps = nextProps => {
      // On the client redirect to the sign in page if the session gets signed out in another tab.
      if (process.browser && !nextProps.authenticated) {
        this.props.history.push('/signin?next=' + encodeURI(window.location))
      }
    };
    */

    render = () => <WrappedComponent {...this.props} />;
  }

  WithAuthComponent.propTypes = {
    authenticated: PropTypes.bool,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
  });

  return connect(mapStateToProps)(WithAuthComponent);
};

export default withAuth;
