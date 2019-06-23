const fs = require('fs');
const path = require('path');
const file = require('./file');

let workPath = process.cwd();
let androidPath = workPath + '/platforms/android/eeuiApp';
let gradPath = androidPath + '/build.gradle';
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

let pluginName = path.resolve(__dirname + "/../");
pluginName = pluginName.substr(pluginName.lastIndexOf('/') + 1);

let pluginPath = workPath + '/plugins/android/' + pluginName;
let from = pluginPath + '/.eeuiScript/wxapi';
let to = pluginPath + '/src/main/java/' + packageName.replace(/\./g, '/') + '/wxapi';
file.mkdirsSync(to);

function _copyFile() {
    file.changeFile(pluginPath + '/src/main/AndroidManifest.xml', 'app.eeui.playground', packageName);
    file.changeFileTo(from + '/WXPayEntryActivity.java', to + '/WXPayEntryActivity.java', 'app.eeui.playground', packageName);
    _updateGradle();
}

function _updateGradle() {
    let appGradpath = androidPath + '/app/build.gradle';
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
