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

  componentDidMount() {
    if (this.props.running) {
      this.timerID = setInterval(() => this.tick(), ONE_TICK);
    }
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
    const props = this.props;

    let duration = null;
    if (props.base !== null) {
      duration = moment.duration(this.state.current.getTime() - props.base.getTime());
    }

    return (
      <div className="StopkyView">
        <div className="StopkyView-mezera">
          <Displej duration={duration} />
        </div>
        <div>
          <Button bsStyle="success" disabled={props.startDisabled} onClick={() => this.start()}>
            Start
          </Button>{' '}
          <Button bsStyle="danger" disabled={props.stopDisabled} onClick={() => this.stop()}>
            Stop
          </Button>
        </div>
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
