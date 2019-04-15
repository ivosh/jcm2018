import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import LoadingIndicator from './LoadingIndicator';

const LoadingButton = ({ bsStyle, children, type, loading, loadingText, onClick }) => (
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
  loadingText: PropTypes.string, // eslint-disable-line react/require-default-props
  onClick: PropTypes.func // eslint-disable-line react/require-default-props
};

LoadingButton.defaultProps = {
  bsStyle: 'success',
  loading: false,
  type: 'button'
};

export default LoadingButton;
