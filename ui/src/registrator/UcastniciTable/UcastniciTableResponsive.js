import React from 'react';
import { AutoSizer } from 'react-virtualized';
import UcastniciTable from './UcastniciTable';
import './UcastniciTableResponsive.css';

const UcastniciTableResponsive = props => {
  if (process.env.NODE_ENV === 'test') {
    return (
      <div className="UcastniciTableResponsive-div">
        <UcastniciTable containerHeight={600} containerWidth={1500} {...props} />
      </div>
    );
  }

  return (
    <div className="UcastniciTableResponsive-div">
      <AutoSizer>
        {({ height, width }) => (
          <UcastniciTable containerHeight={height} containerWidth={width} {...props} />
        )}
      </AutoSizer>
    </div>
  );
};

export default UcastniciTableResponsive;
