const fs = require('fs');
const path = require("path");

module.exports = {
    del(filePath) {
        return new Promise((resolve, reject) => {
            const rimraf = require('rimraf');
            rimraf(filePath, () => {
                resolve()
            });
        })
    },

    mkdirsSync (dirname)  {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (this.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    },

    changeFileTo (oldPath, newPath, oldText, newText) {
        if (!fs.existsSync(oldPath)) {
            return;
        }
        let result = fs.readFileSync(oldPath, 'utf8').replace(new RegExp(oldText, "g"), newText);
        if (result) {
            fs.writeFileSync(newPath, result, 'utf8');
        }
    },

    changeFile(filePath, oldText, newText) {
        this.changeFileTo(filePath, filePath, oldText, newText);
    },

    replaceDictString(filePath, key, value) {
        if (!fs.existsSync(filePath)) {
            return;
        }
        let content = fs.readFileSync(filePath, 'utf8');
        let matchs = content.match(/<dict>(.*?)<\/dict>/gs);
        if (matchs) {
            matchs.forEach((oldText) => {
                oldText = oldText.substring(oldText.lastIndexOf('<dict>'), oldText.length);
                if (this.strExists(oldText, '<string>' + key + '</string>', true)) {
                    let searchValue = this.getMiddle(oldText, '<array>', '</array>');
                    if (searchValue) {
                        searchValue = '<array>' + searchValue + '</array>';
                        let stringValue = '<string>' + this.getMiddle(searchValue, '<string>', '</string>') + '</string>';
                        let replaceValue = searchValue.replace(new RegExp(stringValue, "g"), '<string>' + value + '</string>');
                        let newText = oldText.replace(new RegExp(searchValue, "g"), replaceValue);
                        let result = fs.readFileSync(filePath, 'utf8').replace(new RegExp(oldText, "g"), newText);
                        if (result) {
                            fs.writeFileSync(filePath, result, 'utf8');
                        }
                    }
                }
            });
        }
    },

    getMiddle(string, start, end) {
        if (this.isHave(start) && this.strExists(string, start)) {
            string = string.substring(string.indexOf(start) + start.length);
        } else {
            return "";
        }
        if (this.isHave(end) && this.strExists(string, end)) {
            string = string.substring(0, string.indexOf(end));
        } else {
            return "";
        }
        return string;
    },

    isHave(set) {
        return !!(set !== null && set !== "null" && set !== undefined && set !== "undefined" && set);
    },

    strExists(string, find, lower) {
        string += "";
        find += "";
        if (lower !== true) {
            string = string.toLowerCase();
            find = find.toLowerCase();
        }
        return (string.indexOf(find) !== -1);
    },

    isNullOrUndefined(obj) {
        return typeof obj === "undefined" || obj === null;
    },

    likeArray(obj) {
        return this.isNullOrUndefined(obj) ? false : typeof obj.length === 'number';
    },

    count(obj) {
        try {
            if (typeof obj === "undefined") {
                return 0;
            }
            if (typeof obj === "number") {
                obj+= "";
            }
            if (typeof obj.length === 'number') {
                return obj.length;
            } else {
                let i = 0, key;
                for (key in obj) {
                    i++;
                }
                return i;
            }
        }catch (e) {
            return 0;
        }
    },

    each(elements, callback) {
        let i, key;
        if (this.likeArray(elements)) {
            if (typeof elements.length === "number") {
                for (i = 0; i < elements.length; i++) {
                    if (callback.call(elements[i], i, elements[i]) === false) return elements
                }
            }
        } else {
            for (key in elements) {
                if (!elements.hasOwnProperty(key)) continue;
                if (callback.call(elements[key], key, elements[key]) === false) return elements
            }
        }

        return elements
    },

    getObject(obj, keys) {
        let object = obj;
        if (this.count(obj) > 0 && this.count(keys) > 0) {
            let arr = keys.replace(/,/g, "|").replace(/\./g, "|").split("|");
            this.each(arr, (index, key) => {
                if (typeof object[key] !== "undefined") {
                    object = object[key];
                }
            });
        }
        return object;
    },
};
