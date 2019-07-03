const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if(process.env.NODE_ENV === 'test'){
    require('dotenv').config({path:'.env.test'});
}else if(process.env.NODE_ENV === 'development'){
    require('dotenv').config({path:'.env.development'});
}

module.exports = (env) => {
    const isProduction = env === 'prod';
    const CSSExtract = new ExtractTextPlugin('styles/styles.css');

    return     {
        entry: './src/index.js',
        performance: {
            hints: false
          },
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            publicPath: '/dist/'
        },
        module: {
            rules:[{
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader: 'babel-loader',
                    }
                ]
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use:[
                        {
                            loader: 'css-loader',
                            options:{
                                sourceMap: true,
                            }
                        },
                        // 'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options:{
                                sourceMap: true,
                            }
                        },

                    ]
                }
                )
            },{
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader:'file-loader',
                        options:{
                            outputPath: 'fonts/',
                        }
                    }
                ]
            },{
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [{
                    loader:'file-loader',
                    options:{
                        outputPath: 'images/',
                    }
                }
                ]
            }]
        },
        plugins:[
            CSSExtract,
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROGECT_ID': JSON.stringify(process.env.FIREBASE_PROGECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.LIQPAY_PUBLIC_KEY': JSON.stringify(process.env.LIQPAY_PUBLIC_KEY),
                'process.env.LIQPAY_PRIVATE_KEY': JSON.stringify(process.env.LIQPAY_PRIVATE_KEY)
            })
        ],
        devServer: {
            contentBase:  path.join(__dirname, './public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }

};