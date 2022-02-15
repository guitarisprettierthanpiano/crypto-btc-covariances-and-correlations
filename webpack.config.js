const path = require('path');

module.exports = {
    entry: "./src/index.tsx",
    mode: "production",
    // devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {        
                test: /\.css$/,        
                use: ["style-loader", "css-loader"]      
            },
        ]
    },
    watch: true,
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
}