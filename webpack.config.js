const path = require("path");

module.exports = {
    entry: "./src/index.js",
    mode: "development",
    output: {
        //filename: "./dist/main.js"
        path: path.resolve(__dirname, './dist'),     // путь к каталогу выходных файлов - папка public
        publicPath: '/',
        filename: "main.js"
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 4000,
        watchContentBase: true,
        progress: true,
        overlay: true,
        open: true,
        inline:true,
        hot:true,
        publicPath: '/',

    },

    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};