let WebpackDevServer = require('webpack-dev-server');
let Webpack = require('webpack');
let devConfig = require('./webpack.dev');
const { exec } = require('child_process');

const devServerOptions = Object.assign({}, devConfig.devServer, {
    open: false,
    quiet: false,
    stats: {
        colors: true
    }
});

let compiler = Webpack(devConfig);
let electron = null;

compiler.hooks.afterEmit.tap('start-electron2', () => {
    if(electron === null){
        console.log('Webpack已生成文件，将启动Electron...(该钩子仅运行一次)');
        electron = exec('cd ../ && npm run start-dev-electron', () => {
            s.close();
        });
    }
});

let s = new WebpackDevServer(compiler, devServerOptions);

s.listen(9000);