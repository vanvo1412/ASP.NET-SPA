const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    const extractSass = new ExtractTextPlugin({
        filename: "[name].css",
        // disable: isDevBuild
    });

    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
            ]
        },
        entry: {
            vendor: [
                '@angular/animations',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/platform-browser/animations',
                '@angular/router',
                'es6-shim',
                'es6-promise',
                'event-source-polyfill',
                'jquery',
                'zone.js',
                '@angular/material',
                '@angular/cdk',
                'oidc'
            ],
            site: ['./Styles/main.scss'],
            deeppurpleAmber: [
                './ClientApp/assets/custom-themes/deeppurple-amber.scss',
            ],
            indigoPink: [
               './ClientApp/assets/custom-themes/indigo-pink.scss',
            ],
            
            purpleGreen: [
               './ClientApp/assets/custom-themes/purple-green.scss',
            ],
            pinkBluegrey: [
               './ClientApp/assets/custom-themes/pink-bluegrey.scss',
            ],
        },
        output: {
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/14898
            new webpack.IgnorePlugin(/^vertx$/), // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
            new CopyWebpackPlugin([
                {from: './node_modules/oidc-client/dist/oidc-client.min.js', to: 'oidc-client.min.js'},
                {from: './signin-callback.html', to: '../signin-callback.html'},
                {from: './silent-renew-callback.html', to: '../silent-renew-callback.html'}
            ])
        ]
    };  

    //SASS
    const clientBundleConfig = merge(sharedConfig, {
        output: { path: path.join(__dirname, 'wwwroot', 'dist') },
        module: {
            rules: [
                {
                    test: /\.(css|scss)(\?|$)/, use: extractSass.extract({
                        use: [
                            {
                                loader: 'raw-loader'
                            },
                            {
                                loader: "sass-loader"
                            }
                        ],
                        // use style-loader in development
                        fallback: "style-loader"
                    })
                },
            ]
        },
        plugins: [
            extractSass,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    });

    const serverBundleConfig = merge(sharedConfig, {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: path.join(__dirname, 'ClientApp', 'dist'),
            libraryTarget: 'commonjs2',
        },
        module: {
            rules: [
                { test: /\.(css|scss)(\?|$)/, use: ['raw-loader', 'sass-loader'] },
            ]
        },
        entry: { vendor: ['aspnet-prerendering'] },
        plugins: [
            new webpack.DllPlugin({
                path: path.join(__dirname, 'ClientApp', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
    });

    return [clientBundleConfig, serverBundleConfig];
}
