const fs = require('fs-extra');
const utils = require('../webpack/utils');
const paths = require('../webpack/paths');

// Remove all content but keep the directory so that
// if you're in it, you don't end up in Trash
fs.emptyDirSync(utils.getSysConfig("build.path") || paths.appBuild);