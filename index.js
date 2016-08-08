/**
 * @fileoverview Function to recursively explore the given directory to discover all .sol files
 * @author Raghav Dua <duaraghav8@gmail.com>
 */

'use strict';

var path = require ('path'),
	fs = require ('fs'),
	SOL_EXT = '.sol';

function traverse (currentDir, allFiles, ignore) {

	var currentDirItems;

	if (!path.isAbsolute (currentDir)) {
		currentDir = path.join (process.cwd (), currentDir);
	}

	currentDirItems = fs.readdirSync (currentDir);

	currentDirItems.forEach (function (item) {
		var absoluteItemPath = path.join (currentDir, item);

		if (ignore && ignore.indexOf (item) > -1) {
			return;
		}

		if (fs.lstatSync (absoluteItemPath).isDirectory ()) {

			traverse (absoluteItemPath, allFiles, ignore);

		} else if (path.extname (absoluteItemPath) === SOL_EXT) {

			allFiles.push (absoluteItemPath);

		}
	});
}

module.exports = function dig (dir, ignore) {
	var allFiles = [];

	traverse (dir, allFiles, ignore);
	return allFiles;
};