module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: `${__dirname}/dist`
    },
    resolve: {
        extensions: ['.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            '@babel/react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    },
    devServer: {
        contentBase: 'dist',
        open: true
    }
};
