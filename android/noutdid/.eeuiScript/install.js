const fs = require('fs');
const path = require('path');
const file = require('./file');
const dirCut = /^win/.test(process.platform) ? "\\" : "/";

let workPath = process.cwd();
let androidPath = workPath + dirCut + 'platforms' + dirCut + 'android' + dirCut + 'eeuiApp';
let gradPath = androidPath + dirCut + 'build.gradle';
let result = fs.readFileSync(gradPath, 'utf8');
let values = result.split('\n');

let packageName = "";
for (let i = 0; i < values.length; i++) {
    let item = values[i];
    if (item.indexOf('applicationId') !== -1) {
        packageName = (item.split('=')[1] + "").trim();
        packageName = packageName.replace(/\"/g, "");
        break
    }
}

let pluginName = path.resolve(__dirname + dirCut + ".." + dirCut);
pluginName = pluginName.substr(pluginName.lastIndexOf(dirCut) + 1);

let pluginPath = workPath + dirCut + 'plugins' + dirCut + 'android' + dirCut + pluginName;
let from = pluginPath + dirCut + '.eeuiScript' + dirCut + 'wxapi';
let to = pluginPath + dirCut + 'src' + dirCut + 'main' + dirCut + 'java' + dirCut + packageName.replace(/\./g, dirCut) + dirCut + 'wxapi';
file.mkdirsSync(to);

function _copyFile() {
    file.changeFile(pluginPath + dirCut + 'src' + dirCut + 'main' + dirCut + 'AndroidManifest.xml', 'app.eeui.xxx', packageName);
    file.changeFileTo(from + dirCut + 'WXPayEntryActivity.java', to + dirCut + 'WXPayEntryActivity.java', 'app.eeui.xxx', packageName);
    _updateGradle();
}

function _updateGradle() {
    let appGradpath = androidPath + dirCut + 'app' + dirCut + 'build.gradle';
    let appResult = fs.readFileSync(appGradpath, 'utf8');
    if (appResult.indexOf("project(':eeui_" + pluginName + "').file('libs')") === -1) {
        let repositories = "repositories {\n" +
            "    flatDir {\n" +
            "        dirs project(':eeui_" + pluginName + "').file('libs')\n" +
            "    }\n" +
            "}";
        fs.writeFileSync(appGradpath, appResult + "\n" + repositories, 'utf8');
    }
}

_copyFile();
