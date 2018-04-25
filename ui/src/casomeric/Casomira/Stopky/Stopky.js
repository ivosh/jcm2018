import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import RunningDisplej from '../../Displej/RunningDisplej';
import './Stopky.css';

class Stopky extends PureComponent {
  mezicas = () => {
    const current = new Date();
    const duration = moment.duration(current.getTime() - this.props.base.getTime());
    this.props.onAddMezicas(duration);
  };

  render = () => {
    const { base, delta, running, mezicasEnabled } = this.props;

    /* eslint-disable jsx-a11y/no-access-key */
    return (
      <div className="Stopky">
        <div className="Stopky-mezera">
          <RunningDisplej base={base} delta={delta} running={running} />
        </div>
        <div>
          <Button bsStyle="info" disabled={!mezicasEnabled} onClick={this.mezicas} accessKey="m">
            Mezičas (Alt-m)
          </Button>
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/no-access-key */
  };
}

Stopky.propTypes = {
  base: PropTypes.instanceOf(Date),
  delta: momentPropTypes.momentDurationObj,
  running: PropTypes.bool.isRequired,
  mezicasEnabled: PropTypes.bool.isRequired,
  onAddMezicas: PropTypes.func.isRequired
};

export default Stopky;
