/*global desc, task, jake, fail, complete */
"use strict";
task("default",["lint"]);
desc("lint the code");
task("lint",function(){
    var filesToLint=new jake.FileList();
    filesToLint.include("**/*.js");
    var lint = require("./build/lint/lint_runner.js");
    filesToLint.exclude("node_modules");
    var options = {
		bitwise: true,
		curly: false,
		eqeqeq: true,
		forin: true,
		immed: true,
		latedef: true,
		newcap: true,
		noarg: true,
		noempty: true,
		nonew: true,
		regexp: true,
		undef: true,
		strict: true,
		trailing: true,
		node: true
	};
	var globals = {
		describe: false,
		it: false,
		beforeEach: false,
		afterEach: false
	};
    lint.validateFileList(filesToLint.toArray(),options,globals);
});