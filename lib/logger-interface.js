// This logger is inspired by log4j, but it includes
// the concept of markers and does string formatting automatically

var levels = require('./levels.js');
var formatter = require('./asp-formatter.js');

var LoggerInterface = function(concreteLogger, level, name, options){
	this.concreteLogger = concreteLogger;
	this.setLevel(level || levels.ERROR);
	this.name = name;
};


LoggerInterface.prototype.setConcreteLogger = function(concreteLogger)
{
	this.concreteLogger = concreteLogger;
}

LoggerInterface.prototype.addAppender = function(appender, marker, level, options){

	if(this.concreteLogger.supportsSlf4j && this.concreteLogger.addAppender)
	{
		this.concreteLogger.addAppender(appender, marker, level, options);
	}
	else
	{
		throw "The concrete logger is not compatible with slf4j";
	}
}

LoggerInterface.prototype.detachAppender = function(name){
	if(this.concreteLogger.supportsSlf4j && this.concreteLogger.detachAppender)
	{
		this.concreteLogger.detachAppender(name);
	}
	else
	{
		throw "The concrete logger is not compatible with slf4j";
	}
}

LoggerInterface.prototype.detachAndStopAllAppenders = function(){
	if(this.concreteLogger.supportsSlf4j && this.concreteLogger.detachAndStopAllAppenders)
	{
		this.concreteLogger.detachAndStopAllAppenders(name);
	}
	else
	{
		throw "The concrete logger is not compatible with slf4j";
	}
}

LoggerInterface.prototype.getLevel = function(){
	return this.level;
}

LoggerInterface.prototype.setLevel = function(newLevel){
	this.level = newLevel;

	if(!this.concreteLogger)
	{
		throw "No concrete logger available to set a level";
	}

	if(this.isErrorEnabled())
	{
		this.error = (this.concreteLogger.error) ? this.logError : this.noop;
		this.errorm = (this.concreteLogger.errorm) ? this.logErrorm : this.logErrorNom;
	}
	else
	{
		this.error = this.noop;
		this.errorm = this.noop;
	}

	if(this.isWarnEnabled())
	{
		this.warn = (this.concreteLogger.warn) ? this.logWarn : this.noop;
		this.warnm = (this.concreteLogger.warnm) ? this.logWarnm : this.logErrorNom;
	}
	else
	{
		this.warn = this.noop;
		this.warnm = this.noop;
	}

	if(this.isInfoEnabled())
	{
		this.info = (this.concreteLogger.info) ? this.logInfo : this.noop;
		this.infom = (this.concreteLogger.infom) ? this.logInfom : this.logInfoNom;
	}
	else
	{
		this.info = this.noop;
		this.infom = this.noop;
	}

	if(this.isDebugEnabled())
	{
		this.debug = (this.concreteLogger.debug) ? this.logDebug : this.noop;
		this.debugm = (this.concreteLogger.debugm) ? this.logDebugm : this.logDebugNom;
	}
	else
	{
		this.debug = this.noop;
		this.debugm = this.noop;
	}

	if(this.isTraceEnabled())
	{
		this.trace = (this.concreteLogger.trace) ? this.logTrace : this.noop;
		this.tracem = (this.concreteLogger.tracem) ? this.logTracem : this.logTraceNom;
	}
	else
	{
		this.trace = this.noop;
		this.tracem = this.noop;
	}
}

LoggerInterface.prototype.isErrorEnabled = function(){
	return this.level >= levels.ERROR;
}
LoggerInterface.prototype.isWarnEnabled = function(){
	return this.level >= levels.WARN;
}
LoggerInterface.prototype.isInfoEnabled = function(){
	return this.level >= levels.INFO;
}
LoggerInterface.prototype.isDebugEnabled = function(){
	return this.level >= levels.DEBUG;
}
LoggerInterface.prototype.isTraceEnabled = function(){
	return this.level >= levels.TRACE;
}

// The public API for documentation purposes
// The underlying implementations will be switched out at runtime
// based on the log level
LoggerInterface.prototype.error = function(msg, args){

}
LoggerInterface.prototype.warn = function(msg, args){

}
LoggerInterface.prototype.info = function(msg, args){

}
LoggerInterface.prototype.debug = function(msg, args){

}
LoggerInterface.prototype.trace = function(msg, args){

}

LoggerInterface.prototype.errorm = function(marker, msg, args){

}
LoggerInterface.prototype.warnm = function(marker, msg, args){

}
LoggerInterface.prototype.infom = function(marker, msg, args){

}
LoggerInterface.prototype.debugm = function(marker, msg, args){

}
LoggerInterface.prototype.tracem = function(marker, msg, args){

}

// so-called private methods to do on-the-fly function pointers
// I chose this route since it is easier to grok when viewing
// the source for the first time
LoggerInterface.prototype.noop = function() {
	// do nothing
}

LoggerInterface.prototype.logError = function(msg){
	var args = Array.prototype.slice.call(arguments, 1);
	this.concreteLogger.error(formatter.format(msg, args));
}
LoggerInterface.prototype.logWarn = function(msg){
	var args = Array.prototype.slice.call(arguments, 1);
	this.concreteLogger.warn(formatter.format(msg, args));
}
LoggerInterface.prototype.logInfo = function(msg){
	var args = Array.prototype.slice.call(arguments, 1);
	this.concreteLogger.info(formatter.format(msg, args));
}
LoggerInterface.prototype.logDebug = function(msg){
	var args = Array.prototype.slice.call(arguments, 1);
	this.concreteLogger.debug(formatter.format(msg, args));
}
LoggerInterface.prototype.logTrace = function(msg){
	var args = Array.prototype.slice.call(arguments, 1);
	this.concreteLogger.trace(formatter.format(msg, args));
}
LoggerInterface.prototype.logErrorNom = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.error(formatter.format(msg, args));
}
LoggerInterface.prototype.logWarnNom = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.warn(formatter.format(msg, args));
}
LoggerInterface.prototype.logInfoNom = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.info(formatter.format(msg, args));
}
LoggerInterface.prototype.logDebugNom = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.debug(formatter.format(msg, args));
}
LoggerInterface.prototype.logTraceNom = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.trace(formatter.format(msg, args));
}
LoggerInterface.prototype.logErrorm = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.errorm(marker, formatter.format(msg, args));
}
LoggerInterface.prototype.logWarnm = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.warnm(marker, formatter.format(msg, args));
}
LoggerInterface.prototype.logInfom = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.infom(marker, formatter.format(msg, args));
}
LoggerInterface.prototype.logDebugm = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.debugm(marker, formatter.format(msg, args));
}
LoggerInterface.prototype.logTracem = function(marker, msg){
	var args = Array.prototype.slice.call(arguments, 2);
	this.concreteLogger.tracem(marker, formatter.format(msg, args));
}

module.exports.LoggerInterface = LoggerInterface;