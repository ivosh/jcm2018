module.exports = {
  preset: 'jest-puppeteer',
  testEnvironment: 'jest-environment-puppeteer',
  testMatch: ['**/*.test.{js,jsx,ts,tsx}'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  }
};
