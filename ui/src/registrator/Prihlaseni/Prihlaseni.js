import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Glyphicon, Grid, Modal, Panel } from 'react-bootstrap';
import HideableError from '../../shared/HideableError';
import LoadingButton from '../../shared/LoadingButton';
import LoadingIndicator from '../../shared/LoadingIndicator';
import InputContainer from './InputContainer';
import PlatbyContainer from './PlatbyContainer';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import PrihlaseniSearchContainer from './PrihlaseniSearchContainer';
import './Prihlaseni.css';

class Prihlaseni extends PureComponent {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  handleReset = event => {
    event.preventDefault();
    this.props.onReset();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
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
      <div className="Prihlaseni_div">
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
          {!existujiciUcastnik && <PrihlaseniSearchContainer />}
          <Form
            horizontal
            onSubmit={this.handleSubmit}
            autoComplete="off"
            className="Prihlaseni_form"
          >
            <Col sm={4}>
              <Panel bsStyle="primary" header="Údaje">
                <InputContainer name="udaje.prijmeni" popisek="příjmení" Type={TextInput} />
                <InputContainer name="udaje.jmeno" popisek="jméno" Type={TextInput} />
                <InputContainer name="udaje.narozeni" popisek="narození" Type={TextInput} />
                <InputContainer
                  name="udaje.pohlavi"
                  popisek="pohlaví"
                  Type={RadioInput}
                  inline={true}
                />
                <InputContainer name="udaje.adresa" popisek="adresa" Type={TextInput} />
                <InputContainer name="udaje.obec" popisek="obec" Type={TextInput} />
                <InputContainer name="udaje.psc" popisek="PSČ" Type={TextInput} />
                <InputContainer name="udaje.stat" popisek="stát" Type={TextInput} />
                <InputContainer name="udaje.klub" popisek="klub" Type={TextInput} />
                <InputContainer name="udaje.email" popisek="email" Type={TextInput} />
                <InputContainer name="udaje.telefon" popisek="telefon" Type={TextInput} />
              </Panel>
            </Col>
            <Col sm={4}>
              <Panel bsStyle="primary" header="Přihláška">
                <InputContainer name="prihlaska.datum" popisek="datum" Type={TextInput} />
                <InputContainer name="prihlaska.typ" popisek="kategorie" Type={RadioInput} />
                <InputContainer name="prihlaska.startCislo" popisek="číslo" Type={TextInput} />
                <InputContainer name="prihlaska.kod" popisek="kód" Type={TextInput} />
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
              <Button bsStyle="danger" onClick={this.handleReset} className="Prihlaseni_reset">
                <Glyphicon glyph="fire" /> Reset
              </Button>
            </Col>
            <Col sm={4}>
              <Panel bsStyle="primary" header="Platby">
                <PlatbyContainer />
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

Prihlaseni.propTypes = {
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

export default Prihlaseni;
