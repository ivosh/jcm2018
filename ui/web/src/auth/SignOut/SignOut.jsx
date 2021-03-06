import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import LoadingIndicator from '../../shared/LoadingIndicator';
import './SignOut.css';

class SignOut extends PureComponent {
  componentDidMount = async () => {
    await this.props.signOut();
  };

  render = () => (
    <div className="SignOut_div">
      <Panel bsStyle="primary" header="Odhlášení z aplikace JCM">
        <div>
          <LoadingIndicator /> Probíhá odhlašování...
        </div>
      </Panel>
    </div>
  );
}

SignOut.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default SignOut;
