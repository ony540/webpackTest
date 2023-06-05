const path = require("path"); //운영체제별로 상이한 경로 문법을 해결해 절대 경로로 반환하는 역할을 합니다.

const webpack = require("webpack"); //배너 달기위해서 웹팩 모듈

const childProcess = require("child_process"); //터미널 명령어를 웹팩에서도 사용할 수 있도록

module.exports = {
    mode: "development",
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
    ],
};
