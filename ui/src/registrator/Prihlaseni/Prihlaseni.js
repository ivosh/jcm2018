import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Col, Form, FormGroup, Grid, Panel } from 'react-bootstrap';
import LoadingIndicator from '../../shared/LoadingIndicator';
import InputContainer from './InputContainer';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import './Prihlaseni.css';

class Prihlaseni extends Component {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  handleDismiss = event => {
    event.preventDefault();
    this.props.onHideError();
  };

  handleReset = event => {
    event.preventDefault();
    this.props.onReset();
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit();
  };

  // TODO: narozeni
  render = () => {
    const { errorCode, errorMessage, showError, fetching, saving, existujiciUcastnik } = this.props;

    if (fetching) {
      return (
        <div>
          <LoadingIndicator /> Načítám účastníky...
        </div>
      );
    }

    return (
      <div className="Prihlaseni_div">
        <Grid>
          <Form
            horizontal
            onSubmit={this.handleSubmit}
            autoComplete="off"
            className="Prihlaseni_form"
          >
            <Col sm={6}>
              <Panel bsStyle="primary" header="Údaje">
                <InputContainer name="udaje.prijmeni" popisek="příjmení" Type={TextInput} />
                <InputContainer name="udaje.jmeno" popisek="jméno" Type={TextInput} />
                <InputContainer name="udaje.pohlavi" popisek="pohlaví" Type={RadioInput} />
                <InputContainer name="udaje.adresa" popisek="adresa" Type={TextInput} />
                <InputContainer name="udaje.obec" popisek="obec" Type={TextInput} />
                <InputContainer name="udaje.psc" popisek="PSČ" Type={TextInput} />
                <InputContainer name="udaje.stat" popisek="stát" Type={TextInput} />
                <InputContainer name="udaje.klub" popisek="klub" Type={TextInput} />
                <InputContainer name="udaje.email" popisek="email" Type={TextInput} />
                <InputContainer name="udaje.telefon" popisek="telefon" Type={TextInput} />
              </Panel>
            </Col>
            <Col sm={6}>
              <Panel bsStyle="primary" header="Přihláška">
                <InputContainer name="prihlaska.datum" popisek="datum" Type={TextInput} />
                <InputContainer name="prihlaska.kategorie" popisek="kategorie" Type={TextInput} />
                <InputContainer name="prihlaska.startCislo" popisek="číslo" Type={TextInput} />
                <InputContainer name="prihlaska.kod" popisek="kód" Type={TextInput} />
              </Panel>
            </Col>
            <FormGroup>
              <Button type="submit" bsStyle="success">
                Uložit {existujiciUcastnik ? 'stávajícího' : 'nového'} účastníka
              </Button>
            </FormGroup>
          </Form>
          <Button bsStyle="danger" onClick={this.handleReset}>
            Reset
          </Button>
          {saving && (
            <div>
              <LoadingIndicator /> Probíhá ukládání...
            </div>
          )}
          {showError && (
            <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
              <h4>Chyba při ukládání!</h4>
              <p>Popis: {errorMessage}</p>
              <p>Chybový kód: {errorCode}</p>
              <p>
                <Button onClick={this.handleDismiss}>Schovat chybu</Button>
              </p>
            </Alert>
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
  saving: PropTypes.bool.isRequired,
  existujiciUcastnik: PropTypes.bool.isRequired,
  fetchUcastnici: PropTypes.func.isRequired,
  onHideError: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Prihlaseni;
