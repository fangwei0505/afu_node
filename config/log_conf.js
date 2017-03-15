var log4js = require('log4js'),
    logconf = require('./log4js.json')

log4js.configure(logconf);

exports.logger = log4js.getLogger();