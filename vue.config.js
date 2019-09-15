const webpack = require('webpack');
const path = require('path');

function resolve(pathDir) {
  return path.resolve(__dirname, `src/${pathDir}/`);
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        utils: resolve('utils'),
        components: resolve('components'),
        textures: resolve('textures'),
        geometries: resolve('geometries'),
        objects: resolve('objects'),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        THREE: 'three',
      }),
    ]
  },
  publicPath: '.'
}
