'use strict';
var path = require('path');
function indexOfDash(arr) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf('-') === 0) {
            return i;
        }

    }
    return -1;
}
module.exports = {
    rewrite: function rewite(argv) {
        var result = [], mocha;
        // remove the `--mocha path` argument
        var args = (function extractMocha(args) {
            var mochaIsNext = false;
            var filtered = args.filter(function (arg) {
                if (arg === '--mocha') {
                    mochaIsNext = true;
                    return false;
                } else if (mochaIsNext) {
                    mocha = path.join(arg, '/bin/_mocha');
                    mochaIsNext = false;
                    return false;
                }
                return true;
            });
            if (!mocha) {
                // now we assume there is a mocha package next to this package
                mocha = args[1].replace(/^(.*)mocha-for-jetbrains(.*?)$/, '$1mocha$2');
            }
            return filtered;
        }(argv));
        result.push(args[0]);
        // the second argument is now the real mocha
        result.push(mocha);
        // where do the intellij added arguments start?
        var firstDashIndex = indexOfDash(args);
        if (firstDashIndex >= 0) {
            if (firstDashIndex === 2) {
                // no arguments to add at the end
                result = result.concat(args.slice(2, args.length));
            } else {
                // strip the directory at the end
                result = result.concat(args.slice(firstDashIndex, args.length - 1));

            }
            result = result.concat(args.slice(2, firstDashIndex));
        }
        return result;
    }
};

