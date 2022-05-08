module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: `${__dirname}/dist`
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
            directory: 'dist',
        },
        open: true
    }
};
