import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Glyphicon, Modal, Panel } from 'react-bootstrap';
import LoadingButton from '../../../shared/LoadingButton';
import ObrazekPohlavi from '../../../shared/Popisek/ObrazekPohlavi';
import PopisekKategorie from '../../../shared/Popisek/PopisekKategorie';
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
    }
    if (reset) {
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
    const { actionPrefix, existujiciUcastnik, reduxName, saved, saving, onHideModal } = this.props;
    const jePrihlaskou = reduxName === 'prihlasky';

    return (
      <div className="PrihlaskyForm__div">
        <Modal show={saved} onHide={onHideModal} bsSize="small">
          <Modal.Header closeButton={true}>
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
          horizontal={true}
          onSubmit={this.handleSubmit}
          autoComplete="off"
          className="PrihlaskyForm__form"
        >
          <Panel bsStyle="primary" className="PrihlaskyForm__column" header="Údaje">
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={0}
              inputRef={this.inputRef}
              name="udaje.prijmeni"
              popisek="příjmení"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={1}
              inputRef={this.inputRef}
              name="udaje.jmeno"
              popisek="jméno"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={2}
              inputRef={this.inputRef}
              name="udaje.narozeni"
              popisek="narození"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={3}
              inline={true}
              inputRef={this.inputRef}
              name="udaje.pohlavi"
              popisek="pohlaví"
              reduxName={reduxName}
              Type={RadioInput}
              Formatter={ObrazekPohlavi}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={4}
              inputRef={this.inputRef}
              name="udaje.adresa"
              popisek="adresa"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={5}
              inputRef={this.inputRef}
              name="udaje.obec"
              popisek="obec"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={6}
              inputRef={this.inputRef}
              name="udaje.psc"
              popisek="PSČ"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={7}
              inputRef={this.inputRef}
              name="udaje.stat"
              popisek="stát"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={8}
              inputRef={this.inputRef}
              name="udaje.klub"
              popisek="klub"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={9}
              inputRef={this.inputRef}
              name="udaje.email"
              popisek="email"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={10}
              inputRef={this.inputRef}
              name="udaje.telefon"
              popisek="telefon"
              reduxName={reduxName}
              Type={TextInput}
            />
          </Panel>
          <Panel
            bsStyle="primary"
            className="PrihlaskyForm__column"
            header={jePrihlaskou ? 'Přihláška' : 'Dohláška'}
          >
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={11}
              inputRef={this.inputRef}
              name="prihlaska.datum"
              popisek="datum"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={12}
              inputRef={this.inputRef}
              name="prihlaska.typ"
              popisek="kategorie"
              reduxName={reduxName}
              Formatter={PopisekKategorie}
              Type={RadioInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={13}
              inputRef={this.inputRef}
              name="prihlaska.startCislo"
              popisek="číslo"
              reduxName={reduxName}
              Type={StartCisloInputContainer}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={14}
              inputRef={this.inputRef}
              name="prihlaska.kod"
              popisek="kód"
              reduxName={reduxName}
              Type={TextInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={15}
              inputRef={this.inputRef}
              name="ubytovani.pátek"
              popisek="ubytování"
              option="pátek"
              reduxName={reduxName}
              Type={CheckboxInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={16}
              inputRef={this.inputRef}
              name="ubytovani.sobota"
              popisek=""
              option="sobota"
              reduxName={reduxName}
              Type={CheckboxInput}
            />
            <PrihlaskyFormInputContainer
              actionPrefix={actionPrefix}
              index={17}
              inputRef={this.inputRef}
              name="prihlaska.mladistvyPotvrzen"
              popisek="mladistvý"
              option="potvrzen"
              reduxName={reduxName}
              Type={CheckboxInput}
            />
          </Panel>
          <div className="PrihlaskyForm__column">
            <Panel bsStyle="primary" header="Platby">
              <PlatbyContainer
                actionPrefix={actionPrefix}
                reduxName={reduxName}
                startIndex={18}
                inputRef={this.inputRef}
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
            <Button bsStyle="danger" onClick={this.handleReset} className="PrihlaskyForm__reset">
              <Glyphicon glyph="fire" /> Reset
            </Button>
          </div>
        </Form>
      </div>
    );
  };
}

PrihlaskyForm.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  saved: PropTypes.bool.isRequired,
  saving: PropTypes.bool.isRequired,
  existujiciUcastnik: PropTypes.bool.isRequired,
  reduxName: PropTypes.string.isRequired,
  reset: PropTypes.bool,
  onHideModal: PropTypes.func.isRequired,
  onLoadId: PropTypes.func,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PrihlaskyForm.defaultProps = {
  reset: undefined,
  onLoadId: undefined
};

export default PrihlaskyForm;
