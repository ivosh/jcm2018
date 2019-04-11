import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator';

const LoadingButton = ({
  bsStyle = 'success',
  children,
  type,
  loading = false,
  loadingText,
  onClick
}) => (
  <Button type={type} bsStyle={bsStyle} disabled={loading} onClick={onClick}>
    {loading ? (
      <span>
        <LoadingIndicator /> {loadingText}
      </span>
    ) : (
      children
    )}
  </Button>
);

LoadingButton.propTypes = {
  bsStyle: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  loading: PropTypes.bool,
  loadingText: PropTypes.string,
  onClick: PropTypes.func
};

export default LoadingButton;
