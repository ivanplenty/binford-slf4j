// SLF4J is a facade of sorts, following the principles in SLF4J
// see http://www.slf4j.org/

// Another way to describe this code is that we are programming SLF4J into JavaScript
// ( see http://msmvps.com/blogs/jon_skeet/archive/2008/04/23/programming-quot-in-quot-a-language-vs-programming-quot-into-quot-a-language.aspx )
// SLF4J in many ways was addressing a real shortcoming of the Java environment
// But, the concept of a 'global' interface into which all libraries call
// so that people who run the code can configure at runtime the levels is really appealing

var _ = require('lodash');
var levels = require('./levels.js');
var LoggerInterface = require('./logger-interface.js').LoggerInterface;

// default configuration
var config = {
	level: levels.ERROR,
	defaultCategory: ''
};

var loggerFactory = null;
var loggers = {};

module.exports.getLogger = function(name, options){
	options = options || {};
	if(loggers[name])
	{
		return loggers[name];
	}
	if(!_.isFunction(loggerFactory))
	{
		// reset to default
		loggerFactory = require('binford-logger').loggerFactory;
	}

	var concreteLogger = loggerFactory(
		options.level || config.level,
		name,
		options
	);
	var logger = new LoggerInterface(
		concreteLogger,
		options.level || config.level || levels.ERROR,
		name,
		options
	);
	if(config.appenders && config.appenders.length)
	{
		for(var i=0;i<config.appenders.length;i++)
		{
			logger.addAppender(config.appenders[i].appender, config.appenders[i].marker, config.appenders[i].level);
		}
	}
	loggers[name] = logger;
	return logger;
};

module.exports.setLoggerFactory = function(factory){
	if(!factory)
	{
		throw "factory must be set";
	}

	loggerFactory = factory;
};

module.exports.loadConfig = function(newConfig){
	if(!newConfig)
	{
		throw "newConfig must be set";
	}
	if(newConfig.level && newConfig.level != config.level)
	{
		console.log("setting level...");
		_.forEach(loggers, function(value, key){
			value.setLevel(newConfig.level);
		});
	}
	if(newConfig.appenders && newConfig.appenders.length)
	{
		_.forEach(loggers, function(value, key){
			_.forEach(newConfig.appenders, function(v, k){
				value.addAppender(v.appender, v.marker, v.level);
			});
		});
	}
	config = _.merge(config, newConfig);
};

module.exports.LEVELS = levels;