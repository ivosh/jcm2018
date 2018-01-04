'use strict';

const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const codes = require('../../../common/common');

const SALT_ROUNDS = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 2 * 60 * 60 * 1000; // 2 hours

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Date }
  },
  { bufferCommands: false, usePushEach: true }
);

UserSchema.virtual('isLocked').get(function isLocked() {
  // Check for a future lockUntil timestamp.
  const { lockUntil } = this;
  if (!lockUntil) {
    return false;
  }
  return !!(lockUntil > new Date());
});

UserSchema.pre('save', async function userPreSave(next) {
  const user = this;
  // Only hash the password if it has been modified (or is new).
  if (!user.isModified('password')) {
    next();
    return;
  }

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);

    // Override the cleartext password with the hashed one.
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.incLoginAttempts = async function incLoginAttempts() {
  // If we have a previous lock that has expired, restart at 1.
  if (this.lockUntil && this.lockUntil < new Date()) {
    return this.update({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    });
  }

  // Otherwise we are incrementing.
  const updates = { $inc: { loginAttempts: 1 } };

  // Lock the account if we have reached max attempts and it's not locked already.
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    const now = new Date();
    updates.$set = { lockUntil: new Date(now.getTime() + LOCK_TIME) };
  }

  return this.update(updates);
};

UserSchema.static('authenticate', async function authenticate(username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    return { code: codes.CODE_NONEXISTING };
  }

  if (user.isLocked) {
    // Just increment login attempts if account is already locked.
    await user.incLoginAttempts();
    return { code: codes.CODE_MAX_LOGIN_ATTEMPTS };
  }

  const isMatch = await user.comparePassword(password);
  if (isMatch) {
    if (user.loginAttempts || user.lockUntil) {
      // Reset attempts and lock info.
      const updates = {
        $set: { loginAttempts: 0 },
        $unset: { lockUntil: 1 }
      };
      await user.update(updates);
    }
    return { code: codes.CODE_OK };
  }

  // Password is incorrect, so increment login attempts before responding.
  await user.incLoginAttempts();
  return { code: codes.CODE_PASSWORD_INCORRECT };
});

module.exports = mongoose.model('User', UserSchema);
