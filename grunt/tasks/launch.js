'use strict';

var spawn = require('child_process').spawn;
var _ = require('lodash');

var processes = [];
var exit = function (code) {
    _.each(processes, function (process) {
        process.kill(code);
    });
    processes = [];
};

function launchProcess (processName) {
    var proc = spawn(process.argv[0], [processName], {
        stdio: [process.stdin, 'pipe', 'pipe'],
        env: process.env
    });

    bindProcessEvents(proc);
    return proc;
}

function launchProcessInDebugMode (processName, debugPort) {
    var args = [];
    if (debugPort) {
        args.push('--debug=' + debugPort);
    } else {
        args.push('--debug');
    }
    args.push(processName);
    var proc = spawn(process.argv[0], args, {
        stdio: [process.stdin, 'pipe', 'pipe'],
        env: process.env
    });

    bindProcessEvents(proc);

    return proc;
}

function launchNodeInspector(webPort, debugPort) {
    var cmd = 'node_modules/node-inspector/bin/inspector.js';
    var args = [cmd];

    if (debugPort) {
        args.push('--debug-port=' + debugPort);
    }

    if (webPort) {
        args.push('--web-port=' + webPort);
    }

    var inspectorProcess = spawn(process.argv[0], args, {
        stdio: 'inherit'
    });

    return inspectorProcess;
}

function bindProcessEvents(proc) {
    proc.stdout.on('data', function (data) {
        process.stdout.write(data);
    });
    proc.stderr.on('data', function (data) {
        process.stderr.write(data);
    });
    process.on('SIGINT', function () {
        process.exit('SIGINT');
    });
    process.on('SIGTERM', function () {
        process.exit('SIGINT');
    });
    process.once('exit', exit);
}

/**
 * Return a random port number between 3000 and 4000.
 * @return {int} a random port number between 3000 and 4000.
 */
function getRandomPort() {
    return Math.floor((Math.random() * 1000) + 3000);
}

module.exports = function (grunt) {
    grunt.registerTask('launch', function () {
        exit('SIGTERM');
        _.each([
            'app.js',
        ], function (processName) {
            if (grunt.option('inspect')) {
                var debugPort = getRandomPort();
                var webPort = getRandomPort();
                processes.push(launchProcessInDebugMode(processName, debugPort));
                processes.push(launchNodeInspector(webPort, debugPort));
            } else {
                processes.push(launchProcess(processName));
            }
        });
    });
};