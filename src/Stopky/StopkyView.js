import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import './StopkyView.css';
import Displej from './Displej';

const ONE_TICK = 100; // milliseconds

export class StopkyView extends Component {
  constructor(props) {
    super(props);
    this.state = { current: new Date() };
  }

  componentWillUnmount() {
    this.stop();
  }

  tick() {
    this.setState({ current: new Date() });
  }

  start() {
    this.timerID = setInterval(() => this.tick(), ONE_TICK);

    this.props.startAction(new Date());
  }

  stop() {
    clearInterval(this.timerID);
    this.timerID = null;

    this.props.stopAction();
  }

  render = () => {
    let duration = null;
    if (this.props.base !== null) {
      duration = moment.duration(this.state.current.getTime() - this.props.base.getTime());
    }

    return (
      <div className="Stopky">
        <Displej duration={duration} />
        <Button bsStyle="success" onClick={() => this.start()}>
          Start
        </Button>
        <Button bsStyle="danger" onClick={() => this.stop()}>
          Stop
        </Button>
      </div>
    );
  };
}

StopkyView.propTypes = {
  base: PropTypes.object,
  startAction: PropTypes.func.isRequired,
  stopAction: PropTypes.func.isRequired
};

export default StopkyView;
