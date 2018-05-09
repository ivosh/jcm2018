import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { dokoncenoArr, dokoncenoStr } from '../../../Util';
import Legenda from '../../../shared/StartovniCislaProTyp/Legenda';
import StartovniCislaProTypContainer from '../../../shared/StartovniCislaProTyp/StartovniCislaProTypContainer';
import DraggableStartovniCislo from './DraggableStartovniCislo';
import './StartovniCisla.css';

const legenda = () =>
  dokoncenoArr.map(dokonceno => ({
    name: dokoncenoStr(dokonceno)[0],
    popisek: dokoncenoStr(dokonceno)[1]
  }));

class StartovniCisla extends PureComponent {
  render = () => {
    const { typ } = this.props;

    return (
      <div className="StartovniCisla-casomeric">
        <StartovniCislaProTypContainer
          jenStartujici={true}
          odstartovani={true}
          typ={typ}
          Renderer={DraggableStartovniCislo}
        />
        <div className="StartovniCisla-casomeric__legenda">
          <Legenda legenda={legenda()} />
        </div>
      </div>
    );
  };
}

StartovniCisla.propTypes = {
  typ: PropTypes.string.isRequired
};

export default StartovniCisla;
