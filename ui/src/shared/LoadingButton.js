import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator';

const LoadingButton = ({ bsStyle = 'success', type, loading = false, text, loadingText }) => (
  <Button type={type} bsStyle={bsStyle} disabled={loading}>
    {loading ? (
      <span>
        <LoadingIndicator /> {loadingText}
      </span>
    ) : (
      text
    )}
  </Button>
);

LoadingButton.propTypes = {
  bsStyle: PropTypes.string,
  type: PropTypes.string,
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
  loadingText: PropTypes.string
};

export default LoadingButton;
