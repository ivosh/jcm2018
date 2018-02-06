import React from 'react';
import { AutoSizer } from 'react-virtualized';
import UcastniciTable from './UcastniciTable';
import './UcastniciTableResponsive.css';

const UcastniciTableResponsive = props => (
  <div className="UcastniciTableResponsive-div">
    <AutoSizer>
      {({ height, width }) => (
        <UcastniciTable containerHeight={height} containerWidth={width} {...props} />
      )}
    </AutoSizer>
  </div>
);

export default UcastniciTableResponsive;
