import React from 'react';
import { AutoSizer } from 'react-virtualized';
import Mezicasy from './Mezicasy';
import './MezicasyResponsive.css';

const MezicasyResponsive = props => {
  if (process.env.NODE_ENV === 'test') {
    return (
      <div className="MezicasyResponsive__div">
        <Mezicasy containerHeight={600} containerWidth={1500} {...props} />
      </div>
    );
  }

  return (
    <div className="MezicasyResponsive__div">
      <AutoSizer disableWidth>
        {({ height, width }) => (
          <Mezicasy containerHeight={height} containerWidth={width} {...props} />
        )}
      </AutoSizer>
    </div>
  );
};

export default MezicasyResponsive;
