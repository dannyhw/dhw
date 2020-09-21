/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
      },
    ),
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '../'),

    // libraries used by redash, without this they aren't found by watchman.
    // Adding ../../node_modules seems to create many errors, need to test this more
    path.resolve(__dirname, '../../node_modules/parse-svg-path'),
    path.resolve(__dirname, '../../node_modules/abs-svg-path'),
    path.resolve(__dirname, '../../node_modules/normalize-svg-path'),
    path.resolve(__dirname, '../../node_modules/svg-arc-to-cubic-bezier'),
  ],
};
