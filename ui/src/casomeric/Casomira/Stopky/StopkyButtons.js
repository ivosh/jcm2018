import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';

class StopkyButtons extends PureComponent {
  render = () => {
    const {
      startEnabled,
      mezicasEnabled,
      stopEnabled,
      onStartClick,
      onMezicasClick,
      onStopClick
    } = this.props;

    /* eslint-disable jsx-a11y/no-access-key */
    return (
      <ButtonToolbar>
        <Button bsStyle="success" disabled={!startEnabled} onClick={onStartClick}>
          Start
        </Button>
        <Button bsStyle="info" disabled={!mezicasEnabled} onClick={onMezicasClick} accessKey="m">
          Mezičas (Alt-m)
        </Button>
        <Button bsStyle="danger" disabled={!stopEnabled} onClick={onStopClick}>
          Stop
        </Button>
      </ButtonToolbar>
    );
    /* eslint-enable jsx-a11y/no-access-key */
  };
}

StopkyButtons.propTypes = {
  startEnabled: PropTypes.bool.isRequired,
  mezicasEnabled: PropTypes.bool.isRequired,
  stopEnabled: PropTypes.bool.isRequired,
  onStartClick: PropTypes.func.isRequired,
  onMezicasClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired
};

export default StopkyButtons;
