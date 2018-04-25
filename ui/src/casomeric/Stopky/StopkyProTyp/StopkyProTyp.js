import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Button, ButtonToolbar, Panel } from 'react-bootstrap';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import RunningDisplej from '../../Displej/RunningDisplej';
import Cudly from '../Cudl/Cudly';
import './StopkyProTyp.css';

class StopkyProTyp extends PureComponent {
  constructor(props) {
    super(props);

    this.displej = React.createRef();
  }

  start = () => {
    this.displej.current.startTimer();
    this.props.onStart();
  };

  stop = () => {
    this.displej.current.stopTimer();
    this.props.onStop();
  };

  render = () => {
    const { base, delta, running, startEnabled, stopEnabled, typ, onAdd, onSub } = this.props;

    return (
      <Panel className={`StopkyProTyp__panel--${typ}`} header={<PopisekKategorie typ={typ} />}>
        <div className="StopkyProTyp__div">
          <Cudly popisky={['+10', '+1', '+10', '+1', '+10', '+1', '+10', '+1']} funcs={onAdd} />
          <RunningDisplej base={base} delta={delta} running={running} ref={this.displej} />
          <Cudly popisky={['-10', '-1', '-10', '-1', '-10', '-1', '-10', '-1']} funcs={onSub} />
        </div>
        <ButtonToolbar className="StopkyProTyp__buttons">
          <Button bsStyle="success" disabled={!startEnabled} onClick={this.start}>
            Start
          </Button>
          <Button bsStyle="danger" disabled={!stopEnabled} onClick={this.stop}>
            Stop
          </Button>
        </ButtonToolbar>
      </Panel>
    );
  };
}

StopkyProTyp.propTypes = {
  base: PropTypes.instanceOf(Date),
  delta: momentPropTypes.momentDurationObj,
  running: PropTypes.bool.isRequired,
  startEnabled: PropTypes.bool.isRequired,
  stopEnabled: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  onAdd: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
  onSub: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired
};

export default StopkyProTyp;
