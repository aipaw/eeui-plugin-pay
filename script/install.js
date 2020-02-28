// 安装插件时会node运行此文件
const fs = require('fs');
const path = require('path');
const plist = require('plist');
const utils = require('./utils');

let workPath = process.cwd();

function __android() {
    let androidPath = path.resolve(workPath, 'platforms/android/eeuiApp');
    let gradPath = path.resolve(androidPath, 'build.gradle');
    //
    let packageName = "";
    if (fs.existsSync(gradPath)) {
        packageName = fs.readFileSync(gradPath, 'utf8').match(/applicationId\s*=\s*(["'])(.+?)\1/)[2];
    }
    //
    let pluginPath = path.resolve(__dirname, "../");
    let configFile = path.resolve(pluginPath, "config.json");
    let configInfo = utils.jsonParse(!fs.existsSync(configFile) ? {} : fs.readFileSync(configFile, 'utf8'));
    let pluginName = configInfo['requireFormatName'] || null;
    //
    let from = path.resolve(pluginPath, 'script/wxapi/WXPayEntryActivity.java');
    let to = path.resolve(pluginPath, 'android/src/main/java', packageName.replace(/\./g, '/'), 'wxapi');
    utils.mkdirsSync(to);
    utils.changeFileTo(from, path.resolve(to, 'WXPayEntryActivity.java'), 'app.eeui.xxx', packageName);
    if (pluginName) {
        let appGradpath = path.resolve(androidPath, 'app/build.gradle');
        let appResult = fs.readFileSync(appGradpath, 'utf8');
        if (appResult.indexOf("project(':" + pluginName + "').file('libs')") === -1) {
            let repositories = "repositories {\n" +
                "    flatDir {\n" +
                "        dirs project(':" + pluginName + "').file('libs')\n" +
                "    }\n" +
                "}";
            fs.writeFileSync(appGradpath, appResult + "\n" + repositories, 'utf8');
        }
    }
}

function __ios() {
    let plistFile = path.join(workPath, 'platforms/ios/eeuiApp/eeuiApp/Info.plist');
    let configFile = path.join(workPath, 'eeui.config.js');
    if (!fs.existsSync(plistFile) || !fs.existsSync(configFile)) {
        return;
    }
    let configObject = require(configFile);
    let configAppid = utils.getObject(configObject,'wxpay.appid') || '';
    let infoContent = fs.readFileSync(plistFile, 'utf8');
    let infoObject = plist.parse(infoContent);
    let infoIn = false;
    infoObject['CFBundleURLTypes'].some((item) => {
        if (item['CFBundleURLName'] == "eeuiAppWxappid") {
            item['CFBundleURLSchemes'] = [ configAppid ];
            return infoIn = true;
        }
    });
    if (!infoIn) {
        infoObject['CFBundleURLTypes'].push({
            "CFBundleTypeRole": "Editor",
            "CFBundleURLName": "eeuiAppWxappid",
            "CFBundleURLSchemes": [ configAppid ]
        });
    }
    fs.writeFileSync(plistFile, plist.build(infoObject), 'utf8');
}

__android();
__ios();
