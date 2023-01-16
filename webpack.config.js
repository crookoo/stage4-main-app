const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

const deps = require("./package.json").dependencies;

module.exports = (env) => {
    const urlRemoteGiscus = env.REMOTE_GISCUS || "http://localhost:3002/";
    console.log(env);

    return {
        entry: {
            main: path.resolve(__dirname, './src/index.tsx'),
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env', '@babel/preset-react']
                            }
                        },
                        {
                            loader: 'ts-loader'
                        }
                    ]
                },
                {
                    test: /\.(scss|css)$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.svg$/,
                    use: ['svg-url-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Stage4',
                template: path.resolve(__dirname, './src/index.html'),
                filename: 'index.html', // output file
                favicon: path.resolve(__dirname, './src/assets/favicon.svg'),
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin(),
            new ModuleFederationPlugin({
                remotes: {
                    giscusApp: `giscusRemote@${urlRemoteGiscus}remoteEntry.js`,
                },
                exposes: {},
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    "react-dom": {
                        singleton: true,
                        requiredVersion: deps["react-dom"],
                    },
                },
            }),
        ],
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js',
            publicPath: '/',
        },
        devtool: 'inline-source-map',
        devServer: {
            historyApiFallback: true
        }
    }
};