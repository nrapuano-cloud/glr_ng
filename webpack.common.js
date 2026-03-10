const { FileVersionPlugin } = require('./webpack-file-version-plugin.js');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  
  devServer: {
    port: 9001,
    proxy: {
      '/glr_api': 'http://localhost',
      //changeOrigin: true,
    },
    devMiddleware: {
      writeToDisk: true,
     
  },
    static: {
      directory: path.join(__dirname, "dist")
    },
 
   
  },
  entry: {
    
    app: {
       import: './src/js/main',
     // import: './src/js/app.min.js',
     //    import: './src/js/index.js',
    //  dependOn: 'base-vendor',
       

    },
   // 'base-vendor': ['jquery', 'underscore', 'backbone'],
 /*   another: {
      import: './src/js/another-module.js',
      dependOn: 'shared',
    },
      index: {
        import: './src/js/views/app.views.index.min.js',
        dependOn: 'shared',
      }, 
      router: {
        import: "/src/js/routers/app.routers.router.min.js",
        dependOn: 'shared',
      }, */
     // shared: 'lodash',
  
  },
  module: {
   
  //noParse: [/.*moment\/moment.js.*/],
    rules: [
      {
        test: require.resolve("./src/js/lib/jquery-3.4.1.min"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
      {
        test: require.resolve("./src/js/lib/underscore-min"),
        loader: "expose-loader",
        options: {
          exposes: ["_"],
        },
      },
      
      
         {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
    
      },
  
   {
      test: /\.html$/i,
      loader: "html-loader",
    /*  options: {
        minimize: {
          caseSensitive: true,
          conservativeCollapse: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
          collapseWhitespace: false,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        },
       
            },*/
    },
   
      {
        test: /\.(html)$/i,
        use: [
          {
            loader: 'file-loader',
            options:{
            //  name: '[name].[ext]',
          //    outputPath: 'js/templates/it',
            //  publicPath: 'templatesx',
             // context:'./app/static'
            }
          },
        ],
      },
      {
        test: /\.(json)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options:{
          //   name: '[name].[ext]',
            //  outputPath: 'js/languages/it/'
            },
          },
        ]
      },
 
  

       {
        test: /\.(ico|jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
     //   type: 'asset/resource',
        options: {
        //  name: '/css/img/[name].[ext]',
          limit: 8192,
       //   name: '[name].[ext]',
        //name: '[name].[hash:7].[ext]'
        }
    },
    {
        
      test: /\.css$/i,
      
     use: ["style-loader", "css-loader"],
    } ,
    {
      test: /\.(woff|woff2|ttf|eot)$/,
      use:{
        loader: "url-loader",
      }
     
      
      },  
  ]
   
  },
  plugins: [
    new webpack.ProvidePlugin({
     // $: 'jquery',
     // jQuery: 'jquery',
     
      // underscore:'lodash',
     //  _: 'underscore-min',
    //  Backbone : 'backbone',
    //   LocalStorage :'localstorage',
    //   bootstrap:'bootstrap'
      
     }),
    new HtmlWebpackPlugin({
      title: 'GLR',
     // template: './src/template.html'
    }),
   
     new CopyPlugin({
        patterns: [
         { from: "src/css", to: "css" },
         { from: "src/js/lib", to: "js/lib" },
         { from: "src/js/templates", to: "js/templates" },
         { from: "src/js/json", to: "js/json" ,
         globOptions: {
          ignore: ["**/version.json"]
        }
        },
         { from: "src/js/languages", to: "js/languages" },
         { from: "src/favicon.ico", to: "favicon.ico" },
        ],
      }),
      new FileVersionPlugin({
        outputFile: 'js/json/version.json',
        content:'esssie'
      }),
        
     
  ],
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
   
    clean: true,
  },
  watch:true,
  devtool: "cheap-module-eval-source-map",
  optimization: {
    minimize:true,
    minimizer: [
    new TerserJSPlugin({ test: /\.js(\?.*)?$/i,}),
    new OptimizeCSSAssetsPlugin({})
    ],
   },
   resolve: {
  
    modules: [
      path.resolve(__dirname, 'src/'),
      path.resolve(__dirname,'src/js/lib/'),
      path.resolve(__dirname, 'src/js/'),
      path.resolve(__dirname, 'node_modules')],
    alias: {
      CssFolder: path.resolve(__dirname, 'src/css/'),
      jquery: 'js/lib/jquery-3.4.1.min',
     
	    underscore: 'underscore-min',
	    backbone: 'backbone-min',
      bootstrap:"bootstrap.min",
     hex_sha512:'js/lib/sha512',
	 //   LocalStorage:'backbone.localStorage.min',
	  
     moment:"moment-langs.min",
        he:'he',
        bootbox:'bootbox.all.min',
        
        //nicRap1:'js/lib/nicRap1',
   app:'app.min',
        //appx:'appx',
        editable:     "bootstrap-editable",
     // "jqueryUI": "jquery-ui-1.11.4.custom.min",
      
    },
   
    
  }
};