# mocha-for-jetbrains
The module is a replacement for [mocha](http://mochajs.org) runner that allows to specify patterns and directories in the Jetbrains (webstorm, pycharms, intellij, ...) *Mocha Debug Configuration*.

This is a fix for Jetbrains issue [WEB-10067 Run a single Mocha unit-test](https://youtrack.jetbrains.com/issue/WEB-10067)


## How to use it

Install this package next to mocha and use `/path/to/node_modules/mocha-for-jetbrains` instead of `/path/to/node_modules/mocha` into the `Mocha Package` field.

Just add the patterns and directories you wan to test as first arguments in the `Extra Mocha Options` options.

If you add `Extra Mocha Options` into the `Extra Mocha Options` field

    **/*.node.test.js foo/special-test.js
 
It will run the specified tests instead of all tests with the specified patterns.

If you want to specify some additional options, you have to do it **after** the patterns:

    **/*.node.test.js foo/special-test.js --slow 500   
    
This module essentially takes all arguments before the first option that starts with a `-` and adds them to the end of the command line.
If no files are given, then ist uses the directory specified in the `Test Directory` field.

## Installation

Install the module next to the mocha installation. So, if you have installed 

    npm install -g mocha

then you have to install this module globally:

    npm install -g mocha-for-jetbrains
    
If you have installed mocha locally, then you have to install this module
locally too:

    npm install mocha --save-dev

then you have to install it locally too:

    npm install mocha-for-jetbrains --save-dev

## How to specify another mocha runtime

If you want to use another mocha instance instead of the one next to this module you can specify the mocha to use with the `--mocha` 
in the `Extra Mocha Options` field. It uses the same convention that is used in the `Mocha Pakage` field in the *Mocha Debug Configuration* dialog.
