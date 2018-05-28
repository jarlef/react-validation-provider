const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
module.exports = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
            test: /\.html$/,
            use: [
              {
                loader: "html-loader",
                options: { minimize: true }
              }
            ]
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
          },
          {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }
      ]
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./src/index.html",
          filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          })
      ],
      resolve: {
        alias: {
          react: path.resolve('./node_modules/react'),
          'react-dom': path.resolve('./node_modules/react-dom'),
          'prop-types': path.resolve('./node_modules/prop-types')
        }
      }
  };