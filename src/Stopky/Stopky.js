import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import './Stopky.css';
import { stopkyStart, stopkyStop } from './StopkyActions';
import Displej from './Displej';

const ONE_TICK = 100; // milliseconds

class Stopky extends Component {
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

    const { store } = this.context;
    store.dispatch(stopkyStart(new Date()));
  }

  stop() {
    clearInterval(this.timerID);
    this.timerID = null;

    const { store } = this.context;
    store.dispatch(stopkyStop());
  }

  render = () => {
    const { store } = this.context;
    const state = store.getState();

    let duration = null;
    if (state.base !== null) {
      duration = moment.duration(this.state.current.getTime() - state.base.getTime());
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

Stopky.contextTypes = {
  store: PropTypes.object
};

export default Stopky;
