// 卸载插件时会node运行此文件
const fs = require('fs');
const path = require('path');
const utils = require('./utils');
const regFun = (str) => str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

let workPath = process.cwd();

function __android() {
    let androidPath = path.resolve(workPath, 'platforms/android/eeuiApp');

    let pluginPath = path.resolve(__dirname, "../");
    let configFile = path.resolve(pluginPath, "config.json");
    let configInfo = utils.jsonParse(!fs.existsSync(configFile) ? {} : fs.readFileSync(configFile, 'utf8'));
    let pluginName = configInfo['requireFormatName'] || null;

    let appGradpath = path.resolve(androidPath, 'app/build.gradle');
    let appResult = fs.readFileSync(appGradpath, 'utf8');
    if (appResult.indexOf("project(':" + pluginName + "').file('libs')") !== -1) {
        let repositories = "repositories {\n" +
            "    flatDir {\n" +
            "        dirs project(':" + pluginName + "').file('libs')\n" +
            "    }\n" +
            "}";
        let newResult = appResult.replace(new RegExp(regFun(repositories), "gm"), "");
        if (newResult) {
            fs.writeFileSync(appGradpath, newResult.replace(/^\n+|\n+$/g, ""), 'utf8');
        }
    }
}

__android();
