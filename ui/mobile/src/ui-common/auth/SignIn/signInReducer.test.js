import deepFreeze from 'deep-freeze';
import {
  createFailureFromAction,
  createRequestFromAction,
  createSuccessFromAction,
} from '../../store/wsAPI';
import { signIn } from './SignInActions';
import signInReducer from './signInReducer';

const successfulResponse = {
  code: 'ok',
  response: {
    token: '=======token=========',
    username: 'tomáš',
  },
  requestId: '0.9310306652587374',
};

const unsuccessfulResponse = {
  code: 'password incorrect',
  status: 'Špatné jméno či heslo. Uživatel může být též zamčený.',
  requestId: '0.9310306652587374',
};

it('na začátku', () => {
  const stateBefore = undefined;

  const stateAfter = signInReducer(stateBefore, {});
  expect(stateAfter.signingIn).toEqual(false);
});

it('signInRequest()', () => {
  const stateBefore = { signingIn: false };
  const stateAfter = { ...stateBefore, signingIn: true };
  deepFreeze(stateBefore);

  expect(
    signInReducer(stateBefore, createRequestFromAction({ action: signIn({}), request: {} }))
  ).toEqual(stateAfter);
});

it('signInSuccess()', () => {
  const stateBefore = { signingIn: true };
  const stateAfter = { ...stateBefore, signingIn: false };
  deepFreeze(stateBefore);

  expect(
    signInReducer(
      stateBefore,
      createSuccessFromAction({ action: signIn({}), request: {}, response: successfulResponse })
    )
  ).toEqual(stateAfter);
});

it('signInError()', () => {
  const stateBefore = { signingIn: true };
  const stateAfter = { ...stateBefore, signingIn: false };
  deepFreeze(stateBefore);

  expect(
    signInReducer(
      stateBefore,
      createFailureFromAction({
        action: signIn({}),
        request: {},
        response: unsuccessfulResponse,
      })
    )
  ).toEqual(stateAfter);
});
