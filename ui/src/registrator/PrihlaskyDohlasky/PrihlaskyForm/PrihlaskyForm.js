import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Glyphicon, Modal, Panel } from 'react-bootstrap';
import HideableError from '../../../shared/HideableError';
import LoadingButton from '../../../shared/LoadingButton';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
import PopisekPohlavi from '../../../shared/Popisek/PopisekPohlavi';
import CheckboxInput from '../Input/CheckboxInput';
import RadioInput from '../Input/RadioInput';
import StartCisloInputContainer from '../StartCislo/StartCisloInputContainer';
import TextInput from '../Input/TextInput';
import PlatbyContainer from '../Platby/PlatbyContainer';
import PrihlaskyFormInputContainer from './PrihlaskyFormInputContainer';
import './PrihlaskyForm.css';

class PrihlaskyForm extends PureComponent {
  componentDidMount = () => {
    const { reset, onLoadId, onReset } = this.props;

    if (onLoadId) {
      onLoadId();
      return;
    } else if (reset) {
      onReset();
      return;
    }

    if (this.inputs && this.inputs[0]) {
      this.inputs[0].focus();
    }
  };

  handleKeyPress = ({ event, index }) => {
    if (event.which === 13) {
      event.preventDefault();

      const inputCandidates = this.inputs.slice(index + 1);
      const next = inputCandidates.find(input => input && !input.disabled);
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
      saved,
      saving,
      existujiciUcastnik,
      onHideError,
      onHideModal
    } = this.props;

    return (
      <div className="PrihlaskyForm__div">
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
        <Form
          horizontal
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className="PrihlaskyForm__form"
        >
          <Panel bsStyle="primary" className="PrihlaskyForm__column" header="Údaje">
            <PrihlaskyFormInputContainer
              index={0}
              inputRef={this.inputRef}
              name="udaje.prijmeni"
              popisek="příjmení"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={1}
              inputRef={this.inputRef}
              name="udaje.jmeno"
              popisek="jméno"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={2}
              inputRef={this.inputRef}
              name="udaje.narozeni"
              popisek="narození"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={3}
              inline={true}
              inputRef={this.inputRef}
              name="udaje.pohlavi"
              popisek="pohlaví"
              Type={RadioInput}
              Formatter={PopisekPohlavi}
            />
            <PrihlaskyFormInputContainer
              index={4}
              inputRef={this.inputRef}
              name="udaje.adresa"
              popisek="adresa"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={5}
              inputRef={this.inputRef}
              name="udaje.obec"
              popisek="obec"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={6}
              inputRef={this.inputRef}
              name="udaje.psc"
              popisek="PSČ"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={7}
              inputRef={this.inputRef}
              name="udaje.stat"
              popisek="stát"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={8}
              inputRef={this.inputRef}
              name="udaje.klub"
              popisek="klub"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={9}
              inputRef={this.inputRef}
              name="udaje.email"
              popisek="email"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={10}
              inputRef={this.inputRef}
              name="udaje.telefon"
              popisek="telefon"
              Type={TextInput}
            />
          </Panel>
          <Panel bsStyle="primary" className="PrihlaskyForm__column" header="Přihláška">
            <PrihlaskyFormInputContainer
              index={11}
              inputRef={this.inputRef}
              name="prihlaska.datum"
              popisek="datum"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={12}
              inputRef={this.inputRef}
              name="prihlaska.typ"
              popisek="kategorie"
              Formatter={PopisekKategorie}
              Type={RadioInput}
            />
            <PrihlaskyFormInputContainer
              index={13}
              inputRef={this.inputRef}
              name="prihlaska.startCislo"
              popisek="číslo"
              Type={StartCisloInputContainer}
            />
            <PrihlaskyFormInputContainer
              index={14}
              inputRef={this.inputRef}
              name="prihlaska.kod"
              popisek="kód"
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              index={15}
              inputRef={this.inputRef}
              name="ubytovani.pátek"
              popisek="ubytování"
              option="pátek"
              Type={CheckboxInput}
            />
            <PrihlaskyFormInputContainer
              index={16}
              inputRef={this.inputRef}
              name="ubytovani.sobota"
              popisek=""
              option="sobota"
              Type={CheckboxInput}
            />
            <PrihlaskyFormInputContainer
              index={17}
              inputRef={this.inputRef}
              name="prihlaska.mladistvyPotvrzen"
              popisek="mladistvý"
              option="potvrzen"
              Type={CheckboxInput}
            />
          </Panel>
          <div className="PrihlaskyForm__column">
            <Panel bsStyle="primary" header="Platby">
              <PlatbyContainer startIndex={18} inputRef={this.inputRef} />
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
            <Button bsStyle="danger" onClick={this.handleReset} className="PrihlaskyForm__reset">
              <Glyphicon glyph="fire" /> Reset
            </Button>
          </div>
        </Form>
        {showError && (
          <HideableError
            code={errorCode}
            message={errorMessage}
            title="Chyba při ukládání!"
            onHideError={onHideError}
          />
        )}
      </div>
    );
  };
}

PrihlaskyForm.propTypes = {
  errorCode: PropTypes.string,
  errorMessage: PropTypes.string,
  showError: PropTypes.bool,
  saved: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  existujiciUcastnik: PropTypes.bool.isRequired,
  reset: PropTypes.bool,
  onHideError: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  onLoadId: PropTypes.func,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default PrihlaskyForm;