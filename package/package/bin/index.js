'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var chalk__default = chalk['default'];

function createContext(ctx, wwwDir, sandbox) {
    var vm = require('vm');
    // https://github.com/tmpvar/jsdom/issues/1724
    // manually adding a fetch polyfill until jsdom adds it
    patchFetch(ctx, wwwDir, sandbox);
    patchRaf(sandbox);
    return vm.createContext(sandbox);
}
function patchFetch(ctx, wwwDir, sandbox) {
    function fetch(input, init) {
        var nodeFetch = require('node-fetch');
        createServer(ctx, wwwDir);
        if (typeof input === 'string') {
            // fetch(url)
            return nodeFetch(normalizeUrl(input), init);
        }
        else {
            // fetch(Request)
            input.url = normalizeUrl(input.url);
            return nodeFetch(input, init);
        }
    }
    sandbox.fetch = fetch;
}
function normalizeUrl(url) {
    var Url = require('url');
    var parsedUrl = Url.parse(url);
    if (!parsedUrl.protocol || !parsedUrl.hostname) {
        parsedUrl.protocol = 'http:';
        parsedUrl.host = 'localhost:' + PORT;
        url = Url.format(parsedUrl);
    }
    return url;
}
function patchRaf(sandbox) {
    if (!sandbox.requestAnimationFrame) {
        sandbox.requestAnimationFrame = function (callback) {
            var id = sandbox.setTimeout(function () {
                callback(Date.now());
            }, 0);
            return id;
        };
        sandbox.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}
function createServer(ctx, wwwDir) {
    if (ctx.localPrerenderServer)
        return;
    var fs$$1 = require('fs');
    var path$$1 = require('path');
    var http = require('http');
    var Url = require('url');
    ctx.localPrerenderServer = http.createServer(function (request, response) {
        var parsedUrl = Url.parse(request.url);
        var filePath = path$$1.join(wwwDir, parsedUrl.pathname);
        fs$$1.readFile(filePath, 'utf-8', function (err, data) {
            if (err) {
                response.write('Error fetching: ' + parsedUrl.pathname + ' : ' + err);
            }
            else {
                response.write(data);
            }
            response.end();
        });
    });
    ctx.localPrerenderServer.listen(PORT);
}
var PORT = 53536;
function runInContext(code, contextifiedSandbox, options) {
    var vm = require('vm');
    vm.runInContext(code, contextifiedSandbox, options);
}

function createDom() {
    var jsdom = require('jsdom');
    var virtualConsole = new jsdom.VirtualConsole();
    var dom;
    var diagnostics = [];
    virtualConsole.on('jsdomError', function () {
        diagnostics.push({
            level: 'error',
            header: 'DOM Error',
            type: 'hydrate',
            messageText: ([].slice.call(arguments)).join(' ')
        });
    });
    virtualConsole.on('error', function () {
        diagnostics.push({
            level: 'error',
            type: 'hydrate',
            messageText: ([].slice.call(arguments)).join(' ')
        });
    });
    virtualConsole.on('warn', function () {
        diagnostics.push({
            level: 'warn',
            type: 'hydrate',
            messageText: ([].slice.call(arguments)).join(' ')
        });
    });
    return {
        parse: function (opts) {
            dom = new jsdom.JSDOM(opts.html, {
                virtualConsole: virtualConsole,
                url: opts.url,
                referrer: opts.referrer,
                userAgent: opts.userAgent
            });
            return dom.window;
        },
        serialize: function () {
            return dom.serialize();
        },
        destroy: function () {
            dom.window.close();
            dom = null;
        },
        getDiagnostics: function () {
            return diagnostics;
        }
    };
}

function getNodeSys(distRootDir, logger) {
    var coreClientFileCache = {};
    var packageJsonData = require(path.join(distRootDir, 'package.json'));
    var sys = {
        compiler: {
            name: packageJsonData.name,
            version: packageJsonData.version
        },
        copy: function (src, dest, opts) {
            return new Promise(function (resolve$$1, reject) {
                opts = opts || {};
                var fsExtra = require('fs-extra');
                fsExtra.copy(src, dest, opts, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve$$1();
                    }
                });
            });
        },
        createDom: createDom,
        emptyDir: function (dir) {
            return new Promise(function (resolve$$1, reject) {
                var fsExtra = require('fs-extra');
                fsExtra.emptyDir(dir, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve$$1();
                    }
                });
            });
        },
        ensureDir: function (dir) {
            return new Promise(function (resolve$$1, reject) {
                var fsExtra = require('fs-extra');
                fsExtra.ensureDir(dir, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve$$1();
                    }
                });
            });
        },
        fs: fs,
        generateContentHash: function (content, length) {
            var crypto = require('crypto');
            return crypto.createHash('sha1')
                .update(content)
                .digest('base64')
                .replace(/\W/g, '')
                .substr(0, length)
                .toLowerCase();
        },
        getClientCoreFile: function (opts) {
            var filePath = path.join(distRootDir, 'client', opts.staticName);
            return new Promise(function (resolve$$1, reject) {
                if (coreClientFileCache[filePath]) {
                    resolve$$1(coreClientFileCache[filePath]);
                }
                else {
                    fs.readFile(filePath, 'utf-8', function (err, data) {
                        if (err) {
                            reject(err);
                        }
                        else {
                            coreClientFileCache[filePath] = data;
                            resolve$$1(data);
                        }
                    });
                }
            });
        },
        glob: function (pattern, opts) {
            return new Promise(function (resolve$$1, reject) {
                var glob = require('glob');
                glob(pattern, opts, function (err, files) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve$$1(files);
                    }
                });
            });
        },
        loadConfigFile: function (configPath) {
            var config;
            var configFileData;
            try {
                delete require.cache[require.resolve(configPath)];
                configFileData = require(configPath);
                if (!configFileData.config) {
                    logger.error("Invalid Stencil \"" + configPath + "\" configuration file. Missing \"config\" property.");
                    return null;
                }
                config = configFileData.config;
                config.configPath = configPath;
            }
            catch (e) {
                logger.error("Error reading Stencil \"" + configPath + "\" configuration file.");
                return null;
            }
            if (!config.rootDir) {
                config.rootDir = path.dirname(configPath);
            }
            return config;
        },
        isGlob: function (str) {
            var isGlob = require('is-glob');
            return isGlob(str);
        },
        minifyCss: function (input) {
            var CleanCSS = require('clean-css');
            var result = new CleanCSS().minify(input);
            var diagnostics = [];
            if (result.errors) {
                result.errors.forEach(function (msg) {
                    diagnostics.push({
                        header: 'Minify CSS',
                        messageText: msg,
                        level: 'error',
                        type: 'build'
                    });
                });
            }
            if (result.warnings) {
                result.warnings.forEach(function (msg) {
                    diagnostics.push({
                        header: 'Minify CSS',
                        messageText: msg,
                        level: 'warn',
                        type: 'build'
                    });
                });
            }
            return {
                output: result.styles,
                sourceMap: result.sourceMap,
                diagnostics: diagnostics
            };
        },
        minifyJs: function (input) {
            var UglifyJS = require('uglify-es');
            var result = UglifyJS.minify(input);
            var diagnostics = [];
            if (result.error) {
                diagnostics.push({
                    header: 'Minify JS',
                    messageText: result.error.message,
                    level: 'error',
                    type: 'build'
                });
            }
            return {
                output: result.code,
                sourceMap: result.sourceMap,
                diagnostics: diagnostics
            };
        },
        path: path,
        remove: function (dir) {
            return new Promise(function (resolve$$1, reject) {
                var fsExtra = require('fs-extra');
                fsExtra.remove(dir, function (err) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve$$1();
                    }
                });
            });
        },
        resolveModule: function (fromDir, moduleId) {
            var Module = require('module');
            fromDir = path.resolve(fromDir);
            var fromFile = path.join(fromDir, 'noop.js');
            var dir = Module._resolveFilename(moduleId, {
                id: fromFile,
                filename: fromFile,
                paths: Module._nodeModulePaths(fromDir)
            });
            var root = path.parse(fromDir).root;
            var packageJson;
            var packageJsonFilePath;
            var packageData;
            while (dir !== root) {
                dir = path.dirname(dir);
                packageJsonFilePath = path.join(dir, 'package.json');
                try {
                    packageJson = fs.readFileSync(packageJsonFilePath, 'utf-8');
                }
                catch (e) {
                    continue;
                }
                packageData = JSON.parse(packageJson);
                if (!packageData.collection) {
                    throw new Error("stencil collection \"" + moduleId + "\" is missing the \"collection\" key from its package.json: " + packageJsonFilePath);
                }
                return path.join(dir, packageData.collection);
            }
            throw new Error("error loading \"" + moduleId + "\" from \"" + fromDir + "\"");
        },
        vm: {
            createContext: createContext,
            runInContext: runInContext
        },
        watch: function (paths, opts) {
            var chokidar = require('chokidar');
            return chokidar.watch(paths, opts);
        }
    };
    Object.defineProperties(sys, {
        // sys on-demand getters
        rollup: { get: function () {
                var rollup = require('rollup');
                rollup.plugins = {
                    commonjs: require('rollup-plugin-commonjs'),
                    nodeResolve: require('rollup-plugin-node-resolve')
                };
                return rollup;
            }
        },
        sass: { get: function () { return require('node-sass'); } },
        typescript: { get: function () { return require('typescript'); } },
        url: { get: function () { return require('url'); } },
        workbox: { get: function () { return require('workbox-build'); } }
    });
    return sys;
}

/**
 * This constants file is largely for minification tricks, and to
 * have easy to read variable names. Enums would make more sense
 * in most cases, but doing values like this as constants allows
 * minifiers to just place the raw value directly in source, and in
 * production there is no variable at all. For example, the minifier
 * turns data[BUNDLE_ID] turns into data[0] for production builds.
 */
/**
 * Member Types
 */







/**
 * Prop Change Meta Indexes
 */


/**
 * Property Types
 */



/**
 * JS Property to Attribute Name Options
 */

/**
 * Priority Levels
 */



/**
 * Slot Meta
 */



/**
 * SSR Attribute Names
 */


/**
 * Node Types
 */



/**
 * Key Name to Key Code Map
 */

/**
 * CSS class that gets added to the host element
 * after the component has fully hydrated
 */

/**
 * Namespaces
 */



/**
 * File names and value
 */






/**
 * Errors
 */

function normalizePath(str) {
    // Convert Windows backslash paths to slash paths: foo\\bar ➔ foo/bar
    // https://github.com/sindresorhus/slash MIT
    // By Sindre Sorhus
    if (EXTENDED_PATH_REGEX.test(str) || NON_ASCII_REGEX.test(str)) {
        return str;
    }
    return str.replace(SLASH_REGEX, '/');
}
var EXTENDED_PATH_REGEX = /^\\\\\?\\/;
var NON_ASCII_REGEX = /[^\x00-\x80]+/;
var SLASH_REGEX = /\\/g;

function overrideConfigFromArgv(config, argv) {
    if (argv.prod) {
        config.devMode = false;
    }
    else if (argv.dev) {
        config.devMode = true;
    }
    if (argv.watch) {
        config.watch = true;
    }
    if (argv.debug) {
        config.logLevel = 'debug';
    }
    else if (argv.logLevel) {
        config.logLevel = argv.logLevel;
    }
    if (!argv.prerender) {
        config.prerender = false;
    }
    else if (!config.prerender) {
        config.prerender = true;
    }
    if (config.devMode) {
        if (argv.serviceWorker && !config.serviceWorker) {
            // dev mode, but forcing service worker
            // but they didn't provide a sw config
            // so still force it to generate w/ our defaults
            config.serviceWorker = true;
        }
        else {
            // dev mode, and not forcing service worker
            // so set this to false so it's not generated
            config.serviceWorker = false;
        }
    }
    else if (!config.serviceWorker) {
        // prod mode, and they didn't provide a sw config
        // so force it generate with our defaults
        config.serviceWorker = true;
    }
}
function getConfigFilePath(process, argv) {
    if (argv.config) {
        if (!path.isAbsolute(argv.config)) {
            // passed in a custom stencil config location
            // but it's relative, so prefix the cwd
            return normalizePath(path.join(process.cwd(), argv.config));
        }
        // config path already an absolute path, we're good here
        return normalizePath(argv.config);
    }
    // nothing was passed in, use the current working directory
    return normalizePath(process.cwd());
}
function help(process) {
    var p = chalk__default.dim((process.platform === 'win32') ? '>' : '$');
    console.log("\n  " + chalk__default.bold('Build:') + " " + chalk__default.dim('Build components for development or production.') + "\n\n    " + p + " " + chalk__default.green('stencil build [--dev] [--watch] [--prerender] [--debug]') + "\n\n      " + chalk__default.green('--dev') + " " + chalk__default.dim('..................') + " Execute a development build.\n      " + chalk__default.green('--watch') + " " + chalk__default.dim('................') + " Execute a build in watch mode.\n      " + chalk__default.green('--prerender') + " " + chalk__default.dim('............') + " Prerender URLs.\n      " + chalk__default.green('--debug') + " " + chalk__default.dim('................') + " Set the log level to debug.\n      " + chalk__default.green('--config') + " " + chalk__default.dim('...............') + " Stencil config file.\n\n  " + chalk__default.bold('Examples:') + "\n\n    " + p + " " + chalk__default.green('stencil build --dev --watch') + "\n    " + p + " " + chalk__default.green('stencil build --prerender') + "\n    " + p + " " + chalk__default.green('stencil init') + "\n\n");
}
function init(process) {
    var configPath = path.join(process.cwd(), 'stencil.config.js');
    fs.writeFile(configPath, DEFAULT_CONFIG, function (err) {
        if (err) {
            console.error(err);
        }
        else {
            console.log("Created " + configPath);
        }
    });
}
var DEFAULT_CONFIG = "\nexports.config = {\n  namespace: 'App',\n  bundles: [],\n  collections: []\n};\n\nexports.devServer = {\n  root: 'www',\n  watchGlob: '**/**'\n};\n";
function parseArgv(process) {
    var minimist = require('minimist');
    var cmdArgs = getCmdArgs(process);
    var argv = minimist(cmdArgs, ARG_OPTS);
    argv.serviceWorker = argv['service-worker'];
    argv.skipNodeCheck = argv['skip-node-check'];
    argv.logLevel = argv['log-level'];
    return argv;
}
var ARG_OPTS = {
    boolean: [
        'prod',
        'dev',
        'watch',
        'debug',
        'prerender',
        'help',
        'version',
        'service-worker',
        'skip-node-check'
    ],
    string: [
        'config',
        'log-level'
    ],
    alias: {
        'c': 'config',
        'h': 'help',
        'v': 'version'
    }
};
function getCmdArgs(process) {
    var cmdArgs = process.argv.slice(2);
    try {
        var npmRunArgs = process.env.npm_config_argv;
        if (npmRunArgs) {
            cmdArgs = cmdArgs.concat(JSON.parse(npmRunArgs).original);
        }
    }
    catch (e) { }
    return cmdArgs;
}
function isValidNodeVersion(minNodeVersion, currentVersion) {
    var versionMatch = currentVersion.match(/(\d+).(\d+)/);
    return (versionMatch && parseFloat(versionMatch[0]) >= minNodeVersion);
}

var NodeLogger = /** @class */ (function () {
    function NodeLogger(opts) {
        this._level = 'info';
        this.process = opts.process;
        this.width = Math.max(MIN_LEN, Math.min(process.stdout.columns || 0, MAX_LEN));
        this.level = opts.level;
    }
    Object.defineProperty(NodeLogger.prototype, "level", {
        get: function () {
            return this._level;
        },
        set: function (l) {
            if (typeof l === 'string') {
                l = l.toLowerCase().trim();
                if (LOG_LEVELS.indexOf(l) === -1) {
                    this.error("Invalid log level '" + chalk.bold(l) + "' (choose from: " + LOG_LEVELS.map(function (l) { return chalk.bold(l); }).join(', ') + ")");
                }
                else {
                    this._level = l;
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    NodeLogger.prototype.info = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (this.shouldLog('info')) {
            var lines = wordWrap(msg);
            this.infoPrefix(lines);
            console.log(lines.join('\n'));
        }
    };
    NodeLogger.prototype.infoPrefix = function (lines) {
        if (lines.length) {
            var d = new Date();
            var prefix = '[' +
                ('0' + d.getMinutes()).slice(-2) + ':' +
                ('0' + d.getSeconds()).slice(-2) + '.' +
                Math.floor((d.getMilliseconds() / 1000) * 10) + ']';
            lines[0] = this.dim(prefix) + lines[0].substr(prefix.length);
        }
    };
    NodeLogger.prototype.warn = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (this.shouldLog('warn')) {
            var lines = wordWrap(msg);
            this.warnPrefix(lines);
            console.warn(lines.join('\n'));
        }
    };
    NodeLogger.prototype.warnPrefix = function (lines) {
        if (lines.length) {
            var prefix = '[ WARN  ]';
            lines[0] = this.bold(chalk.yellow(prefix)) + lines[0].substr(prefix.length);
        }
    };
    NodeLogger.prototype.error = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (this.shouldLog('error')) {
            var lines = wordWrap(msg);
            this.errorPrefix(lines);
            console.error(lines.join('\n'));
        }
    };
    NodeLogger.prototype.errorPrefix = function (lines) {
        if (lines.length) {
            var prefix = '[ ERROR ]';
            lines[0] = this.bold(chalk.red(prefix)) + lines[0].substr(prefix.length);
        }
    };
    NodeLogger.prototype.debug = function () {
        var msg = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msg[_i] = arguments[_i];
        }
        if (this.shouldLog('debug')) {
            msg.push(this.memoryUsage());
            var lines = wordWrap(msg);
            this.debugPrefix(lines);
            console.log(lines.join('\n'));
        }
    };
    NodeLogger.prototype.debugPrefix = function (lines) {
        if (lines.length) {
            var prefix = '[ DEBUG ]';
            lines[0] = chalk.cyan(prefix) + lines[0].substr(prefix.length);
        }
    };
    NodeLogger.prototype.color = function (msg, color) {
        return chalk[color](msg);
    };
    NodeLogger.prototype.bold = function (msg) {
        return chalk.bold(msg);
    };
    NodeLogger.prototype.dim = function (msg) {
        return chalk.dim(msg);
    };
    NodeLogger.prototype.memoryUsage = function () {
        return this.dim(" MEM: " + (this.process.memoryUsage().rss / 1000000).toFixed(1) + "MB");
    };
    NodeLogger.prototype.shouldLog = function (level) {
        return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(this.level);
    };
    NodeLogger.prototype.createTimeSpan = function (startMsg, debug) {
        if (debug === void 0) { debug = false; }
        return new CmdTimeSpan(this, startMsg, debug);
    };
    NodeLogger.prototype.printDiagnostics = function (diagnostics) {
        var _this = this;
        if (!diagnostics || !diagnostics.length)
            return;
        var outputLines = [''];
        diagnostics.forEach(function (d) {
            outputLines = outputLines.concat(_this.printDiagnostic(d));
        });
        console.log(outputLines.join('\n'));
    };
    NodeLogger.prototype.printDiagnostic = function (d) {
        var _this = this;
        var outputLines = wordWrap([d.messageText]);
        if (d.header && d.header !== 'build error' && d.header !== 'build warn') {
            outputLines.unshift(INDENT + d.header);
        }
        outputLines.push('');
        if (d.lines && d.lines.length) {
            var lines = prepareLines(d.lines, 'text');
            lines.forEach(function (l) {
                if (!isMeaningfulLine(l.text)) {
                    return;
                }
                var msg = "L" + l.lineNumber + ":  ";
                while (msg.length < INDENT.length) {
                    msg = ' ' + msg;
                }
                var text = l.text;
                if (l.errorCharStart > -1) {
                    text = _this.highlightError(text, l.errorCharStart, l.errorLength);
                }
                msg = _this.dim(msg);
                if (d.language === 'javascript') {
                    msg += _this.jsSyntaxHighlight(text);
                }
                else if (d.language === 'scss' || d.language === 'css') {
                    msg += _this.cssSyntaxHighlight(text);
                }
                else {
                    msg += text;
                }
                outputLines.push(msg);
            });
            outputLines.push('');
        }
        if (d.level === 'warn') {
            this.warnPrefix(outputLines);
        }
        else if (d.level === 'info') {
            this.infoPrefix(outputLines);
        }
        else {
            this.errorPrefix(outputLines);
        }
        return outputLines;
    };
    NodeLogger.prototype.highlightError = function (errorLine, errorCharStart, errorLength) {
        var rightSideChars = errorLine.length - errorCharStart + errorLength - 1;
        while (errorLine.length + INDENT.length > MAX_LEN) {
            if (errorCharStart > (errorLine.length - errorCharStart + errorLength) && errorCharStart > 5) {
                // larger on left side
                errorLine = errorLine.substr(1);
                errorCharStart--;
            }
            else if (rightSideChars > 1) {
                // larger on right side
                errorLine = errorLine.substr(0, errorLine.length - 1);
                rightSideChars--;
            }
            else {
                break;
            }
        }
        var lineChars = [];
        var lineLength = Math.max(errorLine.length, errorCharStart + errorLength);
        for (var i = 0; i < lineLength; i++) {
            var chr = errorLine.charAt(i);
            if (i >= errorCharStart && i < errorCharStart + errorLength) {
                chr = chalk.bgRed(chr === '' ? ' ' : chr);
            }
            lineChars.push(chr);
        }
        return lineChars.join('');
    };
    NodeLogger.prototype.jsSyntaxHighlight = function (text) {
        if (text.trim().startsWith('//')) {
            return this.dim(text);
        }
        var words = text.split(' ').map(function (word) {
            if (JS_KEYWORDS.indexOf(word) > -1) {
                return chalk.cyan(word);
            }
            return word;
        });
        return words.join(' ');
    };
    NodeLogger.prototype.cssSyntaxHighlight = function (text) {
        var cssProp = true;
        var safeChars = 'abcdefghijklmnopqrstuvwxyz-_';
        var notProp = '.#,:}@$[]/*';
        var chars = [];
        for (var i = 0; i < text.length; i++) {
            var c = text.charAt(i);
            if (c === ';' || c === '{') {
                cssProp = true;
            }
            else if (notProp.indexOf(c) > -1) {
                cssProp = false;
            }
            if (cssProp && safeChars.indexOf(c.toLowerCase()) > -1) {
                chars.push(chalk.cyan(c));
                continue;
            }
            chars.push(c);
        }
        return chars.join('');
    };
    return NodeLogger;
}());
var CmdTimeSpan = /** @class */ (function () {
    function CmdTimeSpan(logger, startMsg, debug) {
        this.debug = debug;
        this.logger = logger;
        this.start = Date.now();
        var msg = startMsg + " " + logger.dim('...');
        if (this.debug) {
            this.logger.debug(msg);
        }
        else {
            this.logger.info(msg);
        }
    }
    CmdTimeSpan.prototype.finish = function (msg, color, bold$$1, newLineSuffix) {
        if (color) {
            msg = this.logger.color(msg, color);
        }
        if (bold$$1) {
            msg = this.logger.bold(msg);
        }
        msg += ' ' + this.logger.dim(this.timeSuffix());
        if (this.debug) {
            this.logger.debug(msg);
        }
        else {
            this.logger.info(msg);
        }
        if (newLineSuffix) {
            console.log('');
        }
    };
    CmdTimeSpan.prototype.timeSuffix = function () {
        var duration = Date.now() - this.start;
        var time;
        if (duration > 1000) {
            time = 'in ' + (duration / 1000).toFixed(2) + ' s';
        }
        else {
            var ms = parseFloat((duration).toFixed(3));
            if (ms > 0) {
                time = 'in ' + duration + ' ms';
            }
            else {
                time = 'in less than 1 ms';
            }
        }
        return time;
    };
    return CmdTimeSpan;
}());
var LOG_LEVELS = ['debug', 'info', 'warn', 'error'];
function wordWrap(msg) {
    var lines = [];
    var words = [];
    msg.forEach(function (m) {
        if (m === null) {
            words.push('null');
        }
        else if (typeof m === 'undefined') {
            words.push('undefined');
        }
        else if (typeof m === 'string') {
            m.replace(/\s/gm, ' ').split(' ').forEach(function (strWord) {
                if (strWord.trim().length) {
                    words.push(strWord.trim());
                }
            });
        }
        else if (typeof m === 'number' || typeof m === 'boolean' || typeof m === 'function') {
            words.push(m.toString());
        }
        else if (Array.isArray(m)) {
            words.push(function () {
                return m.toString();
            });
        }
        else if (Object(m) === m) {
            words.push(function () {
                return m.toString();
            });
        }
        else {
            words.push(m.toString());
        }
    });
    var line = INDENT;
    words.forEach(function (word) {
        if (lines.length > 25) {
            return;
        }
        if (typeof word === 'function') {
            if (line.trim().length) {
                lines.push(line);
            }
            lines.push(word());
            line = INDENT;
        }
        else if (INDENT.length + word.length > MAX_LEN) {
            // word is too long to play nice, just give it its own line
            if (line.trim().length) {
                lines.push(line);
            }
            lines.push(INDENT + word);
            line = INDENT;
        }
        else if ((word.length + line.length) > MAX_LEN) {
            // this word would make the line too long
            // print the line now, then start a new one
            lines.push(line);
            line = INDENT + word + ' ';
        }
        else {
            line += word + ' ';
        }
    });
    if (line.trim().length) {
        lines.push(line);
    }
    return lines;
}
function prepareLines(orgLines, code) {
    var lines = JSON.parse(JSON.stringify(orgLines));
    for (var i = 0; i < 100; i++) {
        if (!eachLineHasLeadingWhitespace(lines, code)) {
            return lines;
        }
        for (var i_1 = 0; i_1 < lines.length; i_1++) {
            lines[i_1][code] = lines[i_1][code].substr(1);
            lines[i_1].errorCharStart--;
            if (!lines[i_1][code].length) {
                return lines;
            }
        }
    }
    return lines;
}
function eachLineHasLeadingWhitespace(lines, code) {
    if (!lines.length) {
        return false;
    }
    for (var i = 0; i < lines.length; i++) {
        if (!lines[i][code] || lines[i][code].length < 1) {
            return false;
        }
        var firstChar = lines[i][code].charAt(0);
        if (firstChar !== ' ' && firstChar !== '\t') {
            return false;
        }
    }
    return true;
}
function isMeaningfulLine(line) {
    if (line) {
        line = line.trim();
        if (line.length) {
            return (MEH_LINES.indexOf(line) < 0);
        }
    }
    return false;
}
var MEH_LINES = [';', ':', '{', '}', '(', ')', '/**', '/*', '*/', '*', '({', '})'];
var JS_KEYWORDS = [
    'abstract', 'any', 'as', 'break', 'boolean', 'case', 'catch', 'class',
    'console', 'const', 'continue', 'debugger', 'declare', 'default', 'delete',
    'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'from',
    'function', 'get', 'if', 'import', 'in', 'implements', 'Infinity',
    'instanceof', 'let', 'module', 'namespace', 'NaN', 'new', 'number', 'null',
    'public', 'private', 'protected', 'require', 'return', 'static', 'set',
    'string', 'super', 'switch', 'this', 'throw', 'try', 'true', 'type',
    'typeof', 'undefined', 'var', 'void', 'with', 'while', 'yield',
];
var INDENT = '           ';
var MIN_LEN = 80;
var MAX_LEN = 120;

function loadConfigFile(process, configPath, logger) {
    var config;
    if (!path.isAbsolute(configPath)) {
        logger.error("Stencil configuration file \"" + configPath + "\" must be an absolute path.");
        process.exit(1);
    }
    try {
        var fileStat = fs.statSync(configPath);
        if (fileStat.isDirectory()) {
            // this is only a directory, so let's just assume we're looking for in stencil.config.js
            // otherwise they could pass in an absolute path if it was somewhere else
            configPath = path.join(configPath, 'stencil.config.js');
        }
        // the passed in config was a string, so it's probably a path to the config we need to load
        var configFileData = require(configPath);
        if (!configFileData.config) {
            logger.error("Invalid Stencil configuration file \"" + configPath + "\". Missing \"config\" property.");
            process.exit(1);
        }
        config = configFileData.config;
        config.configPath = configPath;
        if (!config.rootDir && configPath) {
            config.rootDir = path.dirname(configPath);
        }
    }
    catch (e) {
        logger.error("Error reading Stencil configuration file \"" + configPath + "\".", e);
        process.exit(1);
    }
    return config;
}

function run(process, minNodeVersion, logger) {
    var task = process.argv[2];
    var argv = parseArgv(process);
    logger = logger || new NodeLogger({ process: process });
    process.title = 'stencil';
    process.on('unhandledRejection', function (r) { return logger.error(r); });
    process.env.IONIC_CLI_BIN = __filename;
    if (argv.help) {
        help(process);
        return process.exit(0);
    }
    if (!argv.skipNodeCheck) {
        minNodeVersion = minNodeVersion || 6.11;
        var currentNodeVersion = process.version;
        if (!isValidNodeVersion(minNodeVersion, currentNodeVersion)) {
            logger.error("Your Node.js version is " + currentNodeVersion + ". Please update to the latest Node LTS version.");
            return process.exit(1);
        }
    }
    if (argv.version) {
        var packageJson = require(path.join(__dirname, '../package.json'));
        console.log(packageJson.version);
        return process.exit(0);
    }
    if (task === 'init') {
        init(process);
        return process.exit(0);
    }
    var configPath = getConfigFilePath(process, argv);
    var config = loadConfigFile(process, configPath, logger);
    if (!config) {
        logger.warn("\"stencil init\" can be used to generate the \"stencil.config.js\" file.");
        return process.exit(1);
    }
    // override the config values with any cli arguments
    overrideConfigFromArgv(config, argv);
    if (!config.sys) {
        // if the config was not provided then use the
        // defaul stencil sys found in bin
        config.sys = getNodeSys(path.join(__dirname, '../'), logger);
    }
    if (!config.logger) {
        // if a logger was not provided then use the
        // defaul stencil command line logger found in bin
        config.logger = logger;
    }
    if (config.logLevel) {
        config.logger.level = config.logLevel;
    }
    switch (task) {
        case 'build':
            var stencil = require(path.join(__dirname, '../compiler/index.js'));
            stencil.build(config);
            if (config.watch) {
                process.once('SIGINT', function () {
                    return process.exit(0);
                });
            }
            break;
        default:
            logger.error("Invalid stencil command, please see the options below:");
            help(process);
            break;
    }
}

exports.run = run;
