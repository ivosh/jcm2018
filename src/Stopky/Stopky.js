import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';
import './Stopky.css';
import Displej from './Displej';

const ONE_TICK = 100; // milliseconds

export class Stopky extends Component {
  constructor(props) {
    super(props);
    this.state = { current: new Date() };
  }

  componentDidMount = () => {
    if (this.props.running) {
      this.timerID = setInterval(() => this.tick(), ONE_TICK);
    }
  };

  componentWillUnmount = () => {
    this.stop();
  };

  tick = () => {
    this.setState({ current: new Date() });
  };

  start = () => {
    this.timerID = setInterval(() => this.tick(), ONE_TICK);

    this.props.onStart(new Date());
  };

  mezicas = () => {
    const current = new Date();
    const duration = moment.duration(current.getTime() - this.props.base.getTime());
    this.props.onAddMezicas(duration);
  };

  stop = () => {
    clearInterval(this.timerID);
    this.timerID = null;

    this.props.onStop();
  };

  render = () => {
    const props = this.props;

    let duration = null;
    if (props.base !== null) {
      duration = moment.duration(this.state.current.getTime() - props.base.getTime());
    }

    return (
      <div className="Stopky">
        <div className="Stopky-mezera">
          <Displej duration={duration} />
        </div>
        <div>
          <ButtonToolbar>
            <Button bsStyle="success" disabled={!props.startEnabled} onClick={this.start}>
              Start
            </Button>
            <Button bsStyle="info" disabled={!props.mezicasEnabled} onClick={this.mezicas}>
              Mezičas
            </Button>
            <Button bsStyle="danger" disabled={!props.stopEnabled} onClick={this.stop}>
              Stop
            </Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  };
}

Stopky.propTypes = {
  base: PropTypes.object,
  startEnabled: PropTypes.bool.isRequired,
  mezicasEnabled: PropTypes.bool.isRequired,
  stopEnabled: PropTypes.bool.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onAddMezicas: PropTypes.func.isRequired
};

export default Stopky;
