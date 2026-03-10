/**
 * Example webpack.config.js for an AMD project (or AMD + CJS mixed project).
 * This file should be at the root of your project.
 *
 * This can then be used in combination with Karma as well
 * Just load this file and pass it to karma.webpack key
 * (see https://github.com/webpack/karma-webpack#alternative-usage)
 *
 * This example is a bit extreme. Typically in webpack, you don't need much
 * configuration if you have nicely behaving code and work with correctly
 * configured node packages.
 *
 * This demonstrates how you could adapt an existing, messier AMD project
 * to be optimized with webpack. Why would you do that?
 *
 *  - it's faster
 *  - incremental rebuilds are very fast for large projects which means in dev you
 *    load only 1 built file instead of many separate files
 *  - it supports npm packages (!!)
 *  - you can add compilation steps (for es6 or jsx) via loader config
 *  - it's more flexible in terms of optimization (how you split and merge bundles
 *    based on their size http://webpack.github.io/docs/optimization.html)
 *
 *
 * ## Usage
 *
 * Paste this into webpack.config.js in the root of your project.
 * Adapt for your project.
 * Run webpack to build, or webpack -p to build for production.
 * Run webpack --watch to rebuild after each file change.
 * Use webpack-dev-middleware if you want to plug it into your app and have it serve built files as part of your dev workflow straight from your web server.
 */

var _ = require("lodash");

// depending on -p flag, we'll tweak some settings
var production = process.argv.indexOf("-p") > -1;

module.exports = {
  // point to the dir your app code is in
  context: __dirname + "/client",

  // entry point to your app
  // it's possible to have multiple entry points (see docs)
  // this is relative to the context dir above
  entry: "./app/app",

  output: {
    // where we want to output built files
    path: __dirname + "/client-dist",
    
    // this is useful if you have multiple output bundles
    // that will be required asynchronously at some point in the app
    // this is needed so that webpack knows where to load those bundles
    // from. For example, you could point it to CDN. Or in this example
    // we point it to localhost:2888 which is a webpack-dev-server we
    // use in development that recompiles files on the fly as they change
    publicPath: production ? "/client-dist/" : "http://localhost:2888/"
  },

  // in development we want to produce source-maps
  // (see http://webpack.github.io/docs/configuration.html#devtool)
  devtool: production ? false : "eval",

  // this is to support older versions of jquery
  // you might not need it
  amd: { jQuery: true },

  // this is to support older versions of when.js
  // you might not need it
  externals: ["vertx"],

  module: {
    // this is how we configure AMD style shims
    // see the shims() function below
        // this is to support moment.js
    // you might not need it
  noParse: [/.*moment\/moment.js.*/],
    rules: [
      {
        test: /\.js$/,
        use:[{
          loader: [].concat(shims()),
      }]
       
      },
      {
    
      },
    
    ]
    
  },

  resolve: {
    root: [
      // if your AMD config had baseUrl point to smth like
      // /client/lib or /client/vendor, you could set this
      // here so that webpack can find files in /client/vendor
      // e.g. require("mylib") would be first looked for in /client/vendor
      // and only then in node_modules
      __dirname + "/client/vendor"
    ],

    alias: {
      // support AMD style tpl! plugin
      // you could similarly adapt any other existing
      // AMD plugin (e.g. text! or css!)
      "tpl": "underscore-template-loader",

      // if you used AMD paths, you can similarly
      // alias things in webpack, e.g.
      
      // for internal app 'shortcuts'
      "ui": "app/ui",
      "config": "app/config",
      "domain": "app/modules/domain/domain",
      "raven": "app/lib/raven",

      // for 3rd party libs
      // (in this case these are in /client/vendor)
      "spectrum": "spectrum/spectrum",
      "chosen": "chosen/chosen.jquery",

      // you can also alis node_modules in case
      // their package.json#main is wrong
      "auto_grow": "auto_grow/dist/auto_grow",
      "bootstrap": "bootstrap/docs/assets/js/bootstrap"
    }
  }
};


// You could immediately use webpack syntax for shimming
// (see http://webpack.github.io/docs/shimming-modules.html)
// But in this case, we use something that looks more like AMD
// style shims, but is then converted via this function into webpack
// style shims
function shims() {
  var list = {
    "backbone": {
      // this is almost like AMD except we need to name
      // both local variable that backbone expects (_) and module id (underscore)
      deps: ["_=underscore", "$=jquery"],
      // same as AMD
      exports: "Backbone",
      // indicate that Backbone expects this === window
      // because it wants to attach itself to window so that
      // other Backbone plugins could extend it (or smth like that)
      // typically we should avoid leaking things into window, but
      // we need this sometimes for things like jQuery and Backbone
      needsWindow: true
    },
    "chosen/chosen.jquery": {
      deps: ["$=jquery"],
      exports: "$.fn.chosen",
      needsWindow: true
    },
    "backbone.stickit": {
      deps: ["Backbone=backbone", "$=jquery", "_=underscore"]
    },
    "bootstrap": {
      deps: ["$=jquery"]
    },
    "highcharts": {
      exports: "Highcharts",
      deps: ["$=jquery"]
    }
  };
  return _.map(list, function (options, key) {
    // convert to imports? plugin syntax
    var imports = "";
    if (options.deps && options.deps.length) {
      imports = "imports?" + options.deps.join("&");
    }
    if (options.needsWindow) {
      imports += imports.length ? "&this=>window" : "imports?this=>window";
    }
    
    // convert to exports? plugin syntax
    var exports = "";
    if (options.exports) {
      exports = "exports?" + options.exports;
    }

    // conver to module.loaders webpack config object
    // (http://webpack.github.io/docs/configuration.html#module-loaders)
    return { test: new RegExp(key + ".js$"), loader: _.compact([imports, exports]).join("!") };
  });
}