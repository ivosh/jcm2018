import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { Button, ButtonToolbar, Panel } from 'react-bootstrap';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import RunningDisplej from '../../Displej/RunningDisplej';
import Cudly from '../Cudl/Cudly';
import Rozdily from '../Rozdil/Rozdily';
import './StopkyProTyp.css';

class StopkyProTyp extends PureComponent {
  constructor(props) {
    super(props);

    this.displej = React.createRef();
  }

  reset = () => this.props.onReset();

  start = () => {
    this.displej.current.startTimer();
    this.props.onStart();
  };

  stop = () => {
    this.displej.current.stopTimer();
    this.props.onStop();
  };

  render = () => {
    const { base, cudly, delta, rozdily, running, startEnabled, stopEnabled, typ } = this.props;

    return (
      <Panel className={`StopkyProTyp__panel--${typ}`} header={<PopisekKategorie typ={typ} />}>
        <div className="StopkyProTyp__div">
          <Cudly cudly={cudly.slice(0, 8)} />
          <RunningDisplej base={base} delta={delta} running={running} ref={this.displej} />
          <Cudly cudly={cudly.slice(8, 16)} />
        </div>
        <ButtonToolbar className="StopkyProTyp__buttons">
          <Button bsStyle="success" disabled={!startEnabled} onClick={this.start}>
            Start
          </Button>
          <Button bsStyle="warning" disabled={!stopEnabled} onClick={this.stop}>
            Stop
          </Button>
          <Button bsStyle="danger" className="StopkyProTyp__reset-button" onClick={this.reset}>
            Reset
          </Button>
        </ButtonToolbar>
        <div className="StopkyProTyp__rozdily">
          <div className="StopkyProTyp__rozdily--nadpis">Rozdíly:</div>
          <Rozdily rozdily={rozdily} />
        </div>
      </Panel>
    );
  };
}

StopkyProTyp.propTypes = {
  base: PropTypes.instanceOf(Date),
  cudly: PropTypes.arrayOf(
    PropTypes.shape({
      popisek: PropTypes.string.isRequired,
      step: PropTypes.number.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  delta: momentPropTypes.momentDurationObj,
  rozdily: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rozdil: PropTypes.shape({
        hours: PropTypes.string.isRequired,
        mins: PropTypes.string.isRequired,
        secs: PropTypes.string.isRequired,
        subsecs: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  running: PropTypes.bool.isRequired,
  startEnabled: PropTypes.bool.isRequired,
  stopEnabled: PropTypes.bool.isRequired,
  typ: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired
};

StopkyProTyp.defaultProps = {
  base: undefined,
  delta: undefined
};

export default StopkyProTyp;
