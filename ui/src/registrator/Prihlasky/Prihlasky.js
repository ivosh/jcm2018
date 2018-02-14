import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Glyphicon, Grid, Modal, Panel } from 'react-bootstrap';
import HideableError from '../../shared/HideableError';
import LoadingButton from '../../shared/LoadingButton';
import LoadingIndicator from '../../shared/LoadingIndicator';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import InputContainer from './InputContainer';
import PlatbyContainer from './PlatbyContainer';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import PrihlaskySearchContainer from './PrihlaskySearchContainer';
import './Prihlasky.css';

class Prihlasky extends PureComponent {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  handleKeyPress = ({ event, index }) => {
    if (event.which === 13) {
      event.preventDefault();

      const inputCandidates = this.inputs.slice(index + 1);
      const next = inputCandidates.find(input => !input.disabled);
      if (next) {
        next.focus();
      } else {
        this.inputs[0].focus();
      }
    }
  };

  handleReset = event => {
    event.preventDefault();
    this.props.onReset();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  inputRef = (index, ref) => {
    if (!this.inputs) {
      this.inputs = [];
    }
    if (ref) {
      const oldRef = this.inputs[index];
      if (oldRef) {
        oldRef.onkeypress = null;
      }
      this.inputs[index] = ref;
      this.inputs[index].onkeypress = event => this.handleKeyPress({ event, index });
    }
  };

  render = () => {
    const {
      errorCode,
      errorMessage,
      showError,
      fetching,
      saved,
      saving,
      existujiciUcastnik,
      onHideError,
      onHideModal
    } = this.props;

    if (fetching) {
      return (
        <div>
          <LoadingIndicator /> Načítám účastníky...
        </div>
      );
    }

    return (
      <div className="Prihlasky_div">
        <Modal show={saved} onHide={onHideModal} bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title>V pořádku</Modal.Title>
          </Modal.Header>
          <Modal.Body>V pořádku uloženo</Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={onHideModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Grid fluid>
          {!existujiciUcastnik && <PrihlaskySearchContainer />}
          <Form
            horizontal
            onSubmit={this.handleSubmit}
            autoComplete="off"
            className="Prihlasky_form"
          >
            <Col sm={4}>
              <Panel bsStyle="primary" header="Údaje">
                <InputContainer
                  index={0}
                  inputRef={this.inputRef}
                  name="udaje.prijmeni"
                  popisek="příjmení"
                  Type={TextInput}
                />
                <InputContainer
                  index={1}
                  inputRef={this.inputRef}
                  name="udaje.jmeno"
                  popisek="jméno"
                  Type={TextInput}
                />
                <InputContainer
                  index={2}
                  inputRef={this.inputRef}
                  name="udaje.narozeni"
                  popisek="narození"
                  Type={TextInput}
                />
                <InputContainer
                  index={3}
                  inputRef={this.inputRef}
                  name="udaje.pohlavi"
                  popisek="pohlaví"
                  Type={RadioInput}
                  inline={true}
                />
                <InputContainer
                  index={4}
                  inputRef={this.inputRef}
                  name="udaje.adresa"
                  popisek="adresa"
                  Type={TextInput}
                />
                <InputContainer
                  index={5}
                  inputRef={this.inputRef}
                  name="udaje.obec"
                  popisek="obec"
                  Type={TextInput}
                />
                <InputContainer
                  index={6}
                  inputRef={this.inputRef}
                  name="udaje.psc"
                  popisek="PSČ"
                  Type={TextInput}
                />
                <InputContainer
                  index={7}
                  inputRef={this.inputRef}
                  name="udaje.stat"
                  popisek="stát"
                  Type={TextInput}
                />
                <InputContainer
                  index={8}
                  inputRef={this.inputRef}
                  name="udaje.klub"
                  popisek="klub"
                  Type={TextInput}
                />
                <InputContainer
                  index={9}
                  inputRef={this.inputRef}
                  name="udaje.email"
                  popisek="email"
                  Type={TextInput}
                />
                <InputContainer
                  index={10}
                  inputRef={this.inputRef}
                  name="udaje.telefon"
                  popisek="telefon"
                  Type={TextInput}
                />
              </Panel>
            </Col>
            <Col sm={4}>
              <Panel bsStyle="primary" header="Přihláška">
                <InputContainer
                  index={11}
                  inputRef={this.inputRef}
                  name="prihlaska.datum"
                  popisek="datum"
                  Type={TextInput}
                />
                <InputContainer
                  index={12}
                  inputRef={this.inputRef}
                  name="prihlaska.typ"
                  popisek="kategorie"
                  Type={RadioInput}
                  Formatter={PopisekKategorie}
                />
                <InputContainer
                  index={13}
                  inputRef={this.inputRef}
                  name="prihlaska.startCislo"
                  popisek="číslo"
                  Type={TextInput}
                />
                <InputContainer
                  index={14}
                  inputRef={this.inputRef}
                  name="prihlaska.kod"
                  popisek="kód"
                  Type={TextInput}
                />
              </Panel>
              <LoadingButton
                type="submit"
                bsStyle="success"
                loading={saving}
                loadingText="Probíhá ukládání..."
              >
                <Glyphicon glyph="save" />{' '}
                {`Uložit ${existujiciUcastnik ? 'stávajícího' : 'nového'}
                účastníka`}
              </LoadingButton>
              <Button bsStyle="danger" onClick={this.handleReset} className="Prihlasky_reset">
                <Glyphicon glyph="fire" /> Reset
              </Button>
            </Col>
            <Col sm={4}>
              <Panel bsStyle="primary" header="Platby">
                <PlatbyContainer startIndex={15} inputRef={this.inputRef} />
              </Panel>
            </Col>
          </Form>
          {showError && (
            <HideableError
              code={errorCode}
              message={errorMessage}
              title="Chyba při ukládání!"
              onHideError={onHideError}
            />
          )}
        </Grid>
      </div>
    );
  };
}

Prihlasky.propTypes = {
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string,
  showError: PropTypes.bool,
  fetching: PropTypes.bool.isRequired,
  saved: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  existujiciUcastnik: PropTypes.bool.isRequired,
  fetchUcastnici: PropTypes.func.isRequired,
  onHideError: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Prihlasky;
