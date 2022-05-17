const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: `${__dirname}/public`
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader"
            }
        ]
    },
    devServer: {
        static: {
            directory: 'public',
        },
        open: true,
        historyApiFallback: true,
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'public/index.html',
        hash: true,
    })]
};
