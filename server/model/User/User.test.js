'use strict';

const codes = require('../../../common/common');
const db = require('../../db');
const User = require('./User');

const ONE_DAY = 24 * 60 * 60 * 1000;

beforeAll(async () => {
  await db.dropDatabase();
});

afterAll(async () => {
  await db.disconnect();
});

const usersMatchSnapshot = async () => {
  const users = await User.find({}, { _id: 0 }).lean();
  expect(users).toHaveLength(1);
  expect(users[0].password).toBeTruthy();
  users[0].password = '===password===';
  delete users[0].lockUntil;
  expect(users).toMatchSnapshot();
};

it('vytvoř uživatele', async () => {
  const user = new User({ username: 'tomáš', password: 'jcm2018' });
  await user.save();

  await usersMatchSnapshot();

  await User.collection.drop();
});

it('vytvoř uživatele s prázdným heslem', async () => {
  const user = new User({ username: 'tomáš' });
  await expect(user.save()).rejects.toMatchSnapshot();
});

it('ověř heslo uživatele napřímo', async () => {
  const user = new User({ username: 'tomáš', password: 'jcm2018' });
  await user.save();

  const user1 = await User.findOne({}, { _id: 0 });
  const isMatch1 = await user1.comparePassword('jcm2018');
  expect(isMatch1).toBe(true);

  const isMatch2 = await user1.comparePassword('jcm2017');
  expect(isMatch2).toBe(false);

  await User.collection.drop();
});

it('autentizuj uživatele úspěšně', async () => {
  const user = new User({ username: 'tomáš', password: 'jcm2018' });
  await user.save();

  const code = await User.authenticate('tomáš', 'jcm2018');
  expect(code).toEqual({ code: codes.CODE_OK });

  await usersMatchSnapshot();

  await User.collection.drop();
});

it('autentizuj neexistujícího uživatele', async () => {
  const user = new User({ username: 'tomáš', password: 'jcm2018' });
  await user.save();

  const code = await User.authenticate('tom', 'jcm2018');
  expect(code).toEqual({ code: codes.CODE_NONEXISTING });

  await User.collection.drop();
});

it('autentizuj uživatele neúspěšně', async () => {
  const user = new User({ username: 'tomáš', password: 'jcm2018' });
  await user.save();

  const code = await User.authenticate('tomáš', 'jcm2017');
  expect(code).toEqual({ code: codes.CODE_PASSWORD_INCORRECT });

  await usersMatchSnapshot();

  await User.collection.drop();
});

const authAttempt = async () => {
  const code = await User.authenticate('tomáš', 'jcm2017');
  expect(code).toEqual({ code: codes.CODE_PASSWORD_INCORRECT });
};

it('autentizuj uživatele neúspěšně až se zamkne', async () => {
  const user = new User({ username: 'tomáš', password: 'jcm2018' });
  await user.save();

  await authAttempt();
  await authAttempt();
  await authAttempt();
  await authAttempt();
  await authAttempt();
  const code = await User.authenticate('tomáš', 'jcm2017');
  expect(code).toEqual({ code: codes.CODE_MAX_LOGIN_ATTEMPTS });

  await usersMatchSnapshot();

  await User.collection.drop();
});

it('autentizuj zamknutého uživatele úspěšně', async () => {
  const now = new Date();
  const dayBefore = new Date(now.getTime() - ONE_DAY);
  const user = new User({
    username: 'tomáš',
    password: 'jcm2018',
    lockUntil: dayBefore
  });
  await user.save();

  const code = await User.authenticate('tomáš', 'jcm2018');
  expect(code).toEqual({ code: codes.CODE_OK });

  await usersMatchSnapshot();

  await User.collection.drop();
});

it('autentizuj zamknutého uživatele neúspěšně', async () => {
  const now = new Date();
  const dayBefore = new Date(now.getTime() - ONE_DAY);
  const user = new User({
    username: 'tomáš',
    password: 'jcm2018',
    lockUntil: dayBefore
  });
  await user.save();

  const code = await User.authenticate('tomáš', 'jcm2017');
  expect(code).toEqual({ code: codes.CODE_PASSWORD_INCORRECT });

  await usersMatchSnapshot();

  await User.collection.drop();
});

it('vytvoř a změň uživatele', async () => {
  const user = new User({ username: 'tomáš', password: 'jcm2018' });
  await user.save();
  const password1 = user.password;
  await usersMatchSnapshot();

  user.username = 'tom';
  await user.save();
  const password2 = user.password;
  await usersMatchSnapshot();
  // Password hashes should remain equal.
  expect(password1).toEqual(password2);

  await User.collection.drop();
});
