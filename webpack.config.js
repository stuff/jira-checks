const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');

const VERSION = require("./package.json").version;
    
const config = {
    context: __dirname,

    entry: {
        task: './src/task.js',
        options: './src/options/index.js',
        testEdit: './src/test-edit.js',
    },

    output: {
        path: __dirname + '/build',
        filename: '[name].js',
    },

    module: {
        rules: [
            {
                test: /\.js$/, //Check for all js files
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [ 'es2015', { modules: false } ],
                            'react',
                            'stage-0'
                        ]
                    }
                }]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'less-loader'
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(['build']),
        
        new CopyWebpackPlugin([
            {
                from: 'ressources/**/*',
                flatten: true,
                transform: function(content, path) {
                    if (path.match(/manifest\.json/)) {
                        content = content.toString().replace(/<<version>>/g, VERSION);
                    }
                    return content;
                },
            },
        ]),
        
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(VERSION),
            BUILD_DATE: JSON.stringify((new Date()).toString()),
        }),
        
        new WebpackAutoInject({
            // options
            // example:
            components: {
                AutoIncreaseVersion: false
            }
        })
    ],
};

module.exports = config;
