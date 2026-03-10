const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  stats: {
    all: undefined,
  },
  amd: {
    jQuery: true,
  },
  devServer: {
    port: 9000,
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
    
    hot: true,
    client: {
      overlay: true,
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
      { test: /jquery$/, 
      use: 'exports-loader?$'
    }, 
      { test: /underscore$/,
        use: 'exports-loader?_' 
      },
      {
        test: /backbone$/,
        use:[ 
          "imports-loader?_=underscore&$=jquery&this=>window",
          "exports-loader?Backbone"
        ],
       
      },

      {
        test: /localStorage$/,
        use:[ 
          "imports-loader?_=underscore&$=jquery&Backbone=backbone&this=>window",
          "exports-loader?LocalStorage"
        ],
       
    },
    { test: /bootstrap$/,
        use: "imports-loader?$=jquery"
      },
      { test: /bootbox$/,
        use: "imports-loader?_=underscore&$=jquery&Backbone=backbone&bootstrap&this=>window",
      },
      
       {
        test: /app$/,
        use: [
          "imports-loader?_=underscore&$=jquery&Backbone=backbone&bootstrap&this=>window",
          "exports-loader?app"
        ]
    },
     {
      test: /he$/,
      use:  "exports-loader?he"
  },
   {
      test: /\.html$/i,
      loader: "html-loader",
      options: {
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
       
            },
    },
    /*  {
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
    
      },*/
    
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
              name: '[name].[ext]',
            //  outputPath: 'js/languages/it/'
            },
          },
        ]
      },
 /*    {
        test: /(version)\.(json)$/i,
        type: 'asset/resource',
        use: [
          {
            loader: 'file-loader',
            options:{
              name: '[name].[ext]',
             /* outputPath: (url, resourcePath, context) => {
                // `resourcePath` is original absolute path to asset
                // `context` is directory where stored asset (`rootContext`) or `context` option
    
                // To get relative path you can use
                 //const relativePath = path.dirname('js', resourcePath);
    
                if (/version\.(json)/.test(resourcePath)) {
                 
                  return [`js/json/`,`js/languages`];
                }else{
                 // return `js/languages`;
                }
        
                
              },*/
              
              
          /*    outputPath: 'js/json'
              },
            //  publicPath: 'templatesx',
             // context:'./app/static'
            
          },
        ],
       
      },*/
      {
        
        test: /\.css$/i,
        
       use: ["style-loader", "css-loader"],
       /*
        use: [
          {
            loader: "css-loader",
            options:{
              name: '[name].[ext]',
              outputPath: 'css'
            },
          },
        ]*/
      },
     {
        test: /\.(woff|woff2|ttf|eot)$/,
        use:{
          loader: "url-loader",
        }
       
        
        },
  
 /*  
   
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 3 versions', 'ie >9']
                })
              ]
            }}
          },
          'sass-loader'
        ],
      },*/
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { 
            loader: 'css-loader', options: { importLoaders: 1 } 
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
              plugins: [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 3 versions', 'ie >9']
                })
              ]
            }
            }
          },
          'sass-loader'
        ],
      },
    /*  {
        test: /\.(ico|png|jpg|gif|svg|woff2?|eot|ttf|otf|wav)(\?.*)$/i,
        type: 'asset/resource',
        use: [
        {
        loader: 'url-loader',
        options: {
        limit: 8192,
        name: '[name].[hash:7].[ext]'
 
        },
        },
        { loader: 'image-webpack-loader' }, 
        ],
        type: 'javascript/auto'
       },*/
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
     
       
    ]
    
  },
  plugins: [
   new webpack.ProvidePlugin({
     $: 'jquery',
     jQuery: 'jquery',
    
     // underscore:'lodash',
      _: 'underscore-min',
     Backbone : 'backbone',
      LocalStorage :'localstorage',
   //   bootstrap:'bootstrap'
     
    }),
    new HtmlWebpackPlugin({
      title: 'GLR',
     // template: './src/template.html'
    }),
    new MiniCssExtractPlugin({
 //     filename: '[name].[contenthash].css'
      }),
    //  new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
    //  filename: '[name].[contenthash].css'
      }),
      new WebpackManifestPlugin(),  
      new CopyPlugin({
        patterns: [
          { from: "src/css", to: "css" },
         { from: "src/js/lib", to: "js/lib" },
          { from: "src/js/templates", to: "js/templates" },
          { from: "src/js/json", to: "js/json" },
          { from: "src/js/languages", to: "js/languages" },
          { from: "src/favicon.ico", to: "favicon.ico" },
        ],
      }),
        
     
  ],
  output: {
   // filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
   
   // filename: 'bundle.js',
   library: 'base_vendor',   // Important
  //libraryTarget: 'amd',   // Important
    umdNamedDefine: true  , // Important
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
    modules: [path.resolve(__dirname, 'src/'),path.resolve(__dirname, 'src/js/lib/'),path.resolve(__dirname, 'src/js/'), path.resolve(__dirname, 'node_modules')],
    alias: {
      CssFolder: path.resolve(__dirname, 'src/css/'),
      jquery: 'jquery-3.4.1.min',
	    underscore: 'underscore-min',
	    backbone: 'backbone-min',
     hex_sha512:'js/lib/sha512',
	 //   LocalStorage:'backbone.localStorage.min',
	    bootstrap:"bootstrap.min",
     moment:"moment-langs.min",
        he:'he',
        bootbox:'bootbox.all.min',
        
        //nicRap1:'js/lib/nicRap1',
   app:'app.min',
        //appx:'appx',

     // "jqueryUI": "jquery-ui-1.11.4.custom.min",
      
    },
   
    
  }
};