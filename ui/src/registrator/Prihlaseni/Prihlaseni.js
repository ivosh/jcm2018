import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Grid, Panel, Row } from 'react-bootstrap';
import HideableError from '../../shared/HideableError';
import LoadingButton from '../../shared/LoadingButton';
import LoadingIndicator from '../../shared/LoadingIndicator';
import InputContainer from './InputContainer';
import RadioInput from './RadioInput';
import TextInput from './TextInput';
import './Prihlaseni.css';

class Prihlaseni extends Component {
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

  // TODO: narozeni
  render = () => {
    const {
      errorCode,
      errorMessage,
      showError,
      fetching,
      saving,
      existujiciUcastnik,
      onHideError
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
        <Grid fluid>
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
            <Col sm={6}>
              <Panel bsStyle="primary" header="Přihláška">
                <InputContainer name="prihlaska.datum" popisek="datum" Type={TextInput} />
                <InputContainer
                  name="prihlaska.typKategorie"
                  popisek="kategorie"
                  Type={RadioInput}
                />
                <InputContainer name="prihlaska.startCislo" popisek="číslo" Type={TextInput} />
                <InputContainer name="prihlaska.kod" popisek="kód" Type={TextInput} />
              </Panel>
            </Col>
            <Row>
              <Col sm={6}>
                <LoadingButton
                  type="submit"
                  bsStyle="success"
                  loading={saving}
                  text={`Uložit ${existujiciUcastnik ? 'stávajícího' : 'nového'} účastníka`}
                  loadingText="Probíhá ukládání..."
                />
                <Button bsStyle="danger" onClick={this.handleReset} className="Prihlaseni_reset">
                  Reset
                </Button>
              </Col>
            </Row>
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
  saving: PropTypes.bool.isRequired,
  existujiciUcastnik: PropTypes.bool.isRequired,
  fetchUcastnici: PropTypes.func.isRequired,
  onHideError: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Prihlaseni;
