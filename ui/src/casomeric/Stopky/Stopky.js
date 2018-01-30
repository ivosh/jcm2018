import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import StopkyButtons from './StopkyButtons';
import StopkyDisplej from './StopkyDisplej';
import './Stopky.css';

class Stopky extends PureComponent {
  start = () => {
    this.displej.startTimer();
    this.props.onStart(new Date());
  };

  mezicas = () => {
    const current = new Date();
    const duration = moment.duration(current.getTime() - this.props.base.getTime());
    this.props.onAddMezicas(duration);
  };

  stop = () => {
    this.displej.stopTimer();
    this.props.onStop();
  };

  render = () => {
    const { base, running, startEnabled, mezicasEnabled, stopEnabled } = this.props;

    /* eslint-disable jsx-a11y/no-access-key */
    return (
      <div className="Stopky">
        <div className="Stopky-mezera">
          <StopkyDisplej
            base={base}
            running={running}
            ref={displej => {
              this.displej = displej;
            }}
          />
        </div>
        <div>
          <StopkyButtons
            startEnabled={startEnabled}
            mezicasEnabled={mezicasEnabled}
            stopEnabled={stopEnabled}
            onStartClick={this.start}
            onMezicasClick={this.mezicas}
            onStopClick={this.stop}
          />
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-access-key */
  };
}

Stopky.propTypes = {
  base: PropTypes.instanceOf(Date),
  running: PropTypes.bool.isRequired,
  startEnabled: PropTypes.bool.isRequired,
  mezicasEnabled: PropTypes.bool.isRequired,
  stopEnabled: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onAddMezicas: PropTypes.func.isRequired
};

export default Stopky;
