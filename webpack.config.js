const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: './src/main.tsx',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true
    },
    module: {
        rules: [
            // 1) Обработка TypeScript и JSX
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },

            // 2) CSS Modules для SCSS
            {
                test: /\.module\.s?css$/,
                use: [
                    'style-loader',                  // встраивает стили в <head> :contentReference[oaicite:0]{index=0}
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,              // ES-модуль по умолчанию :contentReference[oaicite:1]{index=1}
                            modules: {
                                auto: true,                // для файлов *.module.scss :contentReference[oaicite:2]{index=2}
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                exportLocalsConvention: 'camelCaseOnly', // kebab-case → camelCase :contentReference[oaicite:3]{index=3}
                                namedExport: false         // включаем default-экспорт styles :contentReference[oaicite:4]{index=4}
                            }
                        }
                    },
                    'sass-loader'                    // компилирует SCSS → CSS :contentReference[oaicite:5]{index=5}
                ]
            },

            // 3) Глобальные стили (без CSS Modules)
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            // 4) Asset Modules для картинок
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/images/[hash][ext][query]'
                }
            },
            // svg
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false
                                            }
                                        }
                                    }
                                ]
                            }
                        }
                    },
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html', favicon: './public/assets/favicon.ico' }),
        new CleanWebpackPlugin(),
        new Dotenv(),
    ]
};
