// Configuration file for react-app-rewired.

const {
  addWebpackAlias,
  babelInclude,
  override,
  removeModuleScopePlugin
} = require('customize-cra');
const path = require('path');

// Process and include also files in ../common
module.exports = override(
  addWebpackAlias({
    ['ui-common']: path.resolve(__dirname, '../common')
  }),
  babelInclude([path.resolve('src'), path.resolve('../common')]),
  removeModuleScopePlugin()
);
