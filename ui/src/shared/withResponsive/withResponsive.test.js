import React from 'react';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import withResponsive from './withResponsive';

const Foo = ({ bar }) => <div>{bar}</div>;
Foo.propTypes = { bar: PropTypes.string.isRequired };

it('autosized', () => {
  const FooResponsive = withResponsive(Foo);
  const component = renderer.create(<FooResponsive bar="gorgh" />);
  expect(component.toJSON()).toMatchSnapshot();
});

it('autosized - disabled width', () => {
  const FooResponsive = withResponsive(Foo, { disableWidth: true });
  const component = renderer.create(<FooResponsive bar="gugh" />);
  expect(component.toJSON()).toMatchSnapshot();
});
