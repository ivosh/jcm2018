// Configuration file for react-app-rewired.

const { override, babelInclude, removeModuleScopePlugin } = require('customize-cra');
const path = require('path');

// Process and include also files in ../common
module.exports = override(
  babelInclude([path.resolve('src'), path.resolve('../common')]),
  removeModuleScopePlugin()
);
