import React from 'react';
import PropTypes from 'prop-types';
import { TYPY_POHARU } from './PoharyActions';
import DraggablePohar from './DraggablePohar';
import './Pohary.css';

const Pohary = ({ className, count, id, key, isDragOver, style, type, connectDropTarget }) => {
  const classNames = className.split(' ').filter(str => str); // filter empty strings
  classNames.push('Pohary');
  if (isDragOver) {
    classNames.push('Pohary--isDragOver');
  }

  return connectDropTarget(
    <div className={classNames.join(' ')} key={key} style={style}>
      {Array(count)
        .fill(1)
        .map((val, index) => (
          <DraggablePohar key={index} id={id} sizePercentage={4} type={type} />
        ))}
    </div>
  );
};

Pohary.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  key: PropTypes.string,
  isDragOver: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.oneOf(TYPY_POHARU).isRequired,
  connectDropTarget: PropTypes.func
};

Pohary.defaultProps = {
  className: '',
  connectDropTarget: el => el
};

export default Pohary;
