import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../shared/LoadingIndicator';
import StartujiciProTypContainer from '../../shared/StartujiciProTyp/StartujiciProTypContainer';

class Startujici extends PureComponent {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  render = () => {
    const { fetching } = this.props;

    if (fetching) {
      return (
        <div>
          <LoadingIndicator /> Načítám účastníky...
        </div>
      );
    }

    return (
      <StartujiciProTypContainer
        jenStartujici={false}
        prihlasky={true}
        typ="maraton"
        onClick={() => true}
      />
    );
  };
}

Startujici.propTypes = {
  fetching: PropTypes.bool.isRequired,
  fetchUcastnici: PropTypes.func.isRequired
};

export default Startujici;
