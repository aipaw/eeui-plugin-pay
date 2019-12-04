const fs = require('fs');
const path = require('path');
const file = require('./file');
const dirCut = /^win/.test(process.platform) ? "\\" : "/";

(function(){
    let workPath = process.cwd();
    let iosPath = workPath + dirCut + 'platforms' + dirCut + 'ios' + dirCut + 'eeuiApp' + dirCut;
    let pbxprojPath = iosPath + dirCut + 'eeuiApp.xcodeproj' + dirCut + 'project.pbxproj';
    if (!fs.existsSync(pbxprojPath)) {
        return;
    }   

    let result = fs.readFileSync(pbxprojPath, 'utf8');
    let values = result.split('\n');

    let bundleIdentifier = "";
    for (let i = 0; i < values.length; i++) {
        let item = values[i];
        if (item.indexOf('PRODUCT_BUNDLE_IDENTIFIER') !== -1) {
            bundleIdentifier = (item.split('=')[1] + "").trim();
            if (bundleIdentifier.indexOf(';') !== -1) {
                bundleIdentifier = (bundleIdentifier.split(';')[0] + "").trim();
            }
            bundleIdentifier = bundleIdentifier.replace(/\"/g, "");
            break
        }
    }

    let pluginName = path.resolve(__dirname + dirCut + ".." + dirCut);
    pluginName = pluginName.substr(pluginName.lastIndexOf(dirCut) + 1);

    file.replaceDictString(workPath + dirCut + 'platforms' + dirCut + 'ios' + dirCut + 'eeuiApp' + dirCut + 'eeuiApp' + dirCut + 'Info.plist', 'eeuiAppName', 'eeuiApp' + replaceUpperCase(bundleIdentifier));
})();

function replaceUpperCase(string) {
    try {
        return string.replace(/^[a-z]/g, function ($1) {
            return $1.toLocaleUpperCase()
        }).replace(/\.+(\w)/g, function ($1) {
            return $1.toLocaleUpperCase()
        }).replace(/\./g, '');
    }catch (e) {
        return string;
    }
}
