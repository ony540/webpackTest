const path = require("path"); //운영체제별로 상이한 경로 문법을 해결해 절대 경로로 반환하는 역할을 합니다.

const webpack = require("webpack"); //배너 달기위해서 웹팩 모듈

const childProcess = require("child_process"); //터미널 명령어를 웹팩에서도 사용할 수 있도록

require('dotenv').config(); //env 노출 안되도록

const HtmlWebpackPlugin = require('html-webpack-plugin'); //HTML 파일을 번들링 단계에서 컨트롤 할 수 있도록 도와주는 플러그인 //index.html을 그대로 사용하는것이 아닌, 동적으로 관리하는

const {CleanWebpackPlugin} = require('clean-webpack-plugin'); //없어진파일 삭제하는 모듈

module.exports = {
    // mode: "development",
    // mode: "production", //이거에 따라서 env api key를 바꿀 수 있다
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        main: path.resolve("./src/app.js"),
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"),
    },
    module: {
        rules: [
            // 여기서 로더를 추가할 수 있습니다.
            {
                // 로더가 처리해야할 파일의 패턴(정규표현식)입니다.
                // 여기서 \는 .을 정규표현식 문법이 아닌 특수문자로, .js$ 는 .js 로 끝나는 모든 파일을 의미합니다.
                // 원래 정규표현식에서 .의 의미는 모든 문자나 숫자를 의미합니다.
                // test: /\.js$/,
                test: path.resolve("./src/app.js"),
                use: [
                    // 위와 일치하는 패턴의 파일이 전달될 로더를 설정합니다.
                    path.resolve("./myLoader.js"),
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 20 * 1024, // 1kb가 1024byte 이기 때문에 20kb를 원한다면 1024에 20을 곱합니다.
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.BannerPlugin({
            //toLocaleString : 날짜의 문자열 표현을 지역의 언어에 맞는 형식으로 반환합니다.
            // banner: "마지막 빌드 시간은 " + new Date().toLocaleString() + " 입니다.",
            banner: `
            Commit version : ${childProcess.execSync("git rev-parse --short HEAD")}
            Committer : ${childProcess.execSync("git config user.name")}
            Commit Date : 마지막 빌드 시간은 ${new Date().toLocaleString()} 입니다
            `,
        }),
        new webpack.DefinePlugin({
            // 값을 단순히 문자열로 전달하면 값으로 인식하지 못하는 문제가 있습니다.
            dev: JSON.stringify(process.env.DEV_API), 
            pro: JSON.stringify(process.env.PRO_API)
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html', // 목표 html 파일의 위치입니다.
        }),
        new CleanWebpackPlugin()
    ],
    
};
