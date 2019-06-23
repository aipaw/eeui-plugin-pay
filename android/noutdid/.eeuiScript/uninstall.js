const fs = require('fs');
const path = require('path');

let workPath = process.cwd();
let androidPath = workPath + '/platforms/android/eeuiApp';

let pluginName = path.resolve(__dirname + "/../");
pluginName = pluginName.substr(pluginName.lastIndexOf('/') + 1);

let appGradpath = androidPath + '/app/build.gradle';
let appResult = fs.readFileSync(appGradpath, 'utf8');
if (appResult.indexOf("project(':eeui_" + pluginName + "').file('libs')") !== -1) {
    let repositories = "repositories {\n" +
        "    flatDir {\n" +
        "        dirs project(':eeui_" + pluginName + "').file('libs')\n" +
        "    }\n" +
        "}";
    repositories = repositories.replace(/\}/g, "\\}");
    repositories = repositories.replace(/\{/g, "\\{");
    repositories = repositories.replace(/\)/g, "\\)");
    repositories = repositories.replace(/\(/g, "\\(");
    let newResult = appResult.replace(new RegExp(repositories, "gm"), "");
    if (newResult) {
        fs.writeFileSync(appGradpath, newResult.replace(/^\n+|\n+$/g, ""), 'utf8');
    }
}
