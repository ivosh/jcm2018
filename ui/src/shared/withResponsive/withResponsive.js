import React, { PureComponent } from 'react';
import { AutoSizer } from 'react-virtualized';
import './withResponsive.css';

const withResponsive = (WrappedComponent, { disableHeight, disableWidth } = {}) => {
  class WithResponsiveComponent extends PureComponent {
    render = () => {
      if (process.env.NODE_ENV === 'test') {
        return (
          <div className="withResponsive">
            <WrappedComponent containerHeight={600} containerWidth={1500} {...this.props} />
          </div>
        );
      }

      return (
        <div className="withResponsive">
          <AutoSizer disableHeight={disableHeight} disableWidth={disableWidth}>
            {({ height, width }) => (
              <WrappedComponent containerHeight={height} containerWidth={width} {...this.props} />
            )}
          </AutoSizer>
        </div>
      );
    };
  }

  return WithResponsiveComponent;
};

export default withResponsive;
