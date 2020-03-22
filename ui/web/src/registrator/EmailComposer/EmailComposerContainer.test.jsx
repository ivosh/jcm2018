import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { API_SEND_EMAIL } from 'ui-common/common';
import { WS_API } from 'ui-common/store/wsAPI';
import { SEND_EMAIL } from './EmailComposerActions';
import EmailComposerContainer from './EmailComposerContainer';
import EmailComposer from './EmailComposer';

const mockStore = configureStore();
const defaultProps = {
  mailTo: 'i@iv.sh',
  subject: 'test subject',
  text: '<b>Zpráva</b> z bojiště.',
};

let component;
let store;
const setup = (props = defaultProps) => {
  store = mockStore();
  store.dispatch = jest.fn();
  const container = renderer.create(<EmailComposerContainer store={store} {...props} />);
  component = container.root.findByType(EmailComposer);
  expect(component).toBeTruthy();
};

beforeEach(() => setup());

it('maps dispatch and ownProps to props', () => {
  expect(component.props.mailTo).toEqual(defaultProps.mailTo);
  expect(component.props.subject).toEqual(defaultProps.subject);
  expect(component.props.text).toEqual(defaultProps.text);
  expect(component.props.onSubmit).toBeTruthy();
});

it('maps onSubmit() to dispatch sendEmail action', async () => {
  await component.props.onSubmit({ preventDefault: jest.fn() });

  expect(store.dispatch).toHaveBeenCalledWith({
    [WS_API]: {
      type: SEND_EMAIL,
      endpoint: API_SEND_EMAIL,
      request: expect.any(Object),
      title: 'posílání emailu',
    },
  });
});
