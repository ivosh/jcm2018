import React from 'react';
import renderer, { act } from 'react-test-renderer';
import EmailComposer from './EmailComposer';

const createComponent = (onSubmit = jest.fn()) => {
  let component;
  act(() => {
    component = renderer.create(
      <EmailComposer
        mailTo="s@s.io"
        subject="Initial subject"
        text="Tohle je moje <b>zpráva</b>.<br/>Pokračuje přes několik řádek."
        onSubmit={onSubmit}
      />
    );
  });
  return component;
};

it('renders', () => {
  const component = createComponent();
  const json = component.toJSON();

  expect(json).toMatchSnapshot();
});

it('handle submit', async () => {
  const onSubmit = jest.fn();
  const component = createComponent(onSubmit);

  await act(async () => {
    await component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    mailTo: 's@s.io',
    subject: 'Initial subject',
    text: 'Tohle je moje <b>zpráva</b>.<br />Pokračuje přes několik řádek.'
  });
});

it('handle modify of mailFrom', async () => {
  const onSubmit = jest.fn();
  const component = createComponent(onSubmit);

  await act(async () => {
    await component.root
      .findAllByType('input')[0]
      .props.onChange({ target: { value: 'zuzana@huntirova.cz' } });
  });

  await act(async () => {
    await component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    mailTo: 'zuzana@huntirova.cz',
    subject: 'Initial subject',
    text: 'Tohle je moje <b>zpráva</b>.<br />Pokračuje přes několik řádek.'
  });
});

it('handle modify of subject', async () => {
  const onSubmit = jest.fn();
  const component = createComponent(onSubmit);

  await act(async () => {
    await component.root
      .findAllByType('input')[1]
      .props.onChange({ target: { value: 'test subject' } });
  });

  await act(async () => {
    await component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    mailTo: 's@s.io',
    subject: 'test subject',
    text: 'Tohle je moje <b>zpráva</b>.<br />Pokračuje přes několik řádek.'
  });
});

it('handle modify of email body with sanitization', async () => {
  const onSubmit = jest.fn();
  const component = createComponent(onSubmit);

  await act(async () => {
    await component.root
      .findByType('textarea')
      .props.onChange({ target: { value: '<b>Zpráva</b> není <script>evil</script> celá.' } });
  });

  await act(async () => {
    await component.root.findByType('form').props.onSubmit({ preventDefault: jest.fn() });
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toHaveBeenCalledWith({
    mailTo: 's@s.io',
    subject: 'Initial subject',
    text: '<b>Zpráva</b> není  celá.'
  });
});
