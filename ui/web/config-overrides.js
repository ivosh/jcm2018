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
    ['ui-common']: path.resolve(__dirname, '../mobile/src/ui-common')
  }),
  babelInclude([path.resolve('src'), path.resolve('../mobile/src/ui-common')]),
  removeModuleScopePlugin()
);
