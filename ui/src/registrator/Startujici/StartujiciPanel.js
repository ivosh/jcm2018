import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import JedenStartujici from './JedenStartujici';
import './StartujiciPanel.css';

class StartujiciPanel extends Component {
  render = () => {
    const { bsStyle, popisek, seznam } = this.props;

    return (
      <Panel bsStyle={bsStyle} header={popisek}>
        <div className="StartujiciPanel__grid">
          <div className="StartujiciPanel__header">příjmení</div>
          <div className="StartujiciPanel__leftHeader">jméno</div>
          <div className="StartujiciPanel__middleHeader">narození</div>
          <div className="StartujiciPanel__middleHeader">kategorie</div>
          <div className="StartujiciPanel__header">číslo</div>
          {seznam.map(jeden => <JedenStartujici key={jeden.id} {...jeden} />)}
        </div>
      </Panel>
    );
  };
}

StartujiciPanel.propTypes = {
  bsStyle: PropTypes.string.isRequired,
  popisek: PropTypes.any.isRequired,
  seznam: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        rok: PropTypes.number.isRequired
      }).isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired
      }).isRequired,
      startCislo: PropTypes.number
    })
  ).isRequired
};

// :TODO: When decorators are supported by babel in ES7, do: @DragDropContext(HTML5Backend)
export default DragDropContext(HTML5Backend)(StartujiciPanel);
