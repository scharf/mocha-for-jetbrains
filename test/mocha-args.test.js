var runner = require('../impl/runner');
var assert = require('assert');

describe('Mocha runner', function () {
    var args = [
        '/usr/local/bin/node',
        '/Users/joe/project/node_modules/mocha-for-jetbrains/bin/_mocha',
        '--mocha',
        '/Users/joe/project/node_modules/mocha',
        'app/**/*.ntest.js',
        '--ui',
        'exports',
        '--reporter',
        '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
        '/Users/user/project/test'
    ];

    it('should remove the --mocha argument', function () {
        var result = runner.rewrite(args);
        assert.equal(result.indexOf('--mocha'), -1);
    });

    it('first argument should be unchanged', function () {
        var result = runner.rewrite(args);
        assert.equal(result[0], args[0]);
    });

    it('second argument be the original mocha', function () {
        var result = runner.rewrite(args);
        assert.equal(result[1], args[3] + '/bin/_mocha');
    });

    it('arguments after --mocha should be added to the end', function () {
        var result = runner.rewrite(args);
        var expected = [
            '/usr/local/bin/node',
            '/Users/joe/project/node_modules/mocha/bin/_mocha',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            'app/**/*.ntest.js'
        ];
        assert.deepEqual(result, expected);
    });

    it('if no --macha given, take the mocha next to this module', function () {
        var args = [
            '/usr/local/bin/node',
            '/Users/joe/project/node_modules/mocha-for-jetbrains/bin/_mocha',
            'app/**/*.ntest.js',
            'abc',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            '/Users/user/project/test'
        ];
        var result = runner.rewrite(args);
        var expected = [
            '/usr/local/bin/node',
            '/Users/joe/project/node_modules/mocha/bin/_mocha',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            'app/**/*.ntest.js',
            'abc'
        ];
        assert.deepEqual(result, expected);
    });

    it('should extract --mocha at any position', function () {
        var args = [
            '/usr/local/bin/node',
            '/Users/joe/project/node_modules/mocha-for-jetbrains/bin/_mocha',
            'app/**/*.ntest.js',
            'abc',
            '--mocha',
            '/local/lib/node_modules/mocha',
            '--recursive',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            '/Users/user/project/test'
        ];
        var result = runner.rewrite(args);
        var expected = [
            '/usr/local/bin/node',
            '/local/lib/node_modules/mocha/bin/_mocha',
            '--recursive',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            'app/**/*.ntest.js',
            'abc'
        ];
        assert.deepEqual(result, expected);
    });
    it('should tirgger on', function () {
        var args = [
            '/usr/local/bin/node',
            '/Users/joe/project/node_modules/mocha-for-jetbrains/bin/_mocha',
            'app/**/*.ntest.js',
            'abc',
            '--foobar',
            '--mocha',
            '/local/lib/node_modules/mocha',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            '/Users/user/project/test'
        ];
        var result = runner.rewrite(args);
        var expected = [
            '/usr/local/bin/node',
            '/local/lib/node_modules/mocha/bin/_mocha',
            '--foobar',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            'app/**/*.ntest.js',
            'abc'
        ];
        assert.deepEqual(result, expected);
    });
    it('not strip the directory not arg is given', function () {
        var args = [
            '/usr/local/bin/node',
            '/Users/joe/project/node_modules/mocha-for-jetbrains/bin/_mocha',
            '--foobar',
            '--mocha',
            '/local/lib/node_modules/mocha',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            '/Users/user/project/test'
        ];
        var result = runner.rewrite(args);
        var expected = [
            '/usr/local/bin/node',
            '/local/lib/node_modules/mocha/bin/_mocha',
            '--foobar',
            '--ui',
            'exports',
            '--reporter',
            '/Users/user/Library/Application Support/PyCharm40/NodeJS/js/mocha-intellij/lib/mochaIntellijReporter.js',
            '/Users/user/project/test'
        ];
        assert.deepEqual(result, expected);
    });
});
