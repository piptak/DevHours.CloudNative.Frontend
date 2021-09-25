import path from "path";
import { Configuration as WebpackConfiguration, ContextReplacementPlugin } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Dotenv from 'dotenv-webpack';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServer.Configuration;
  }

const webpackConfig = (): Configuration => ({
  entry: "./src/index.tsx",
  ...(process.env.production || !process.env.development
    ? {}
    : { devtool: "eval-source-map" }),

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
  },
  output: {
    path: path.join(__dirname, "/build"),
    filename: "bundle.js",
    publicPath: '/',
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
        exclude: /build/,
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: './src/assets/styles/_variables.scss'
            },
          },
        ],
      },
    ],
  },
  devServer: {
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    port: 4200,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new ContextReplacementPlugin(/moment[/\\]locale$/, /pl|en|nl/),
    new HtmlWebpackPlugin({
      // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
      template: "./public/index.html",
    }),
    new Dotenv({
      path: `./environments/${process.env.NODE_ENV}.env`
    }),
    new ForkTsCheckerWebpackPlugin({
      // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
      eslint: {
        files: "./src/**/*.{ts,tsx,js,jsx}",
      },
    }),
  ],
});

export default webpackConfig;