const { resolve } = require('path');


const PUBLIC_PATH = resolve(__dirname, 'public');
const SRC_PATH = resolve(__dirname, 'src');
var webpack = require("webpack");
module.exports = {
  entry: `${SRC_PATH}/js/app.min.js`,
  output: {
    filename: 'bundle.js',
    path: PUBLIC_PATH
  },
  module: {
  noParse: [/.*moment\/moment.js.*/],
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ]
    
  },
  devServer: {
    static: {
        directory: PUBLIC_PATH
      }
  }, 
 // mode: 'development', 
  mode: 'production', 
  performance: {
    //hints: "error",
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
/*plugins: [
    new webpack.ProvidePlugin({
        $: require.resolve('jquery'),
        jQuery: require.resolve('jquery'),
        app: require.resolve('backbone'),
    }),
],*/

};
