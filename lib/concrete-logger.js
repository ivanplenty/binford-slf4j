// This file is not actually used at runtime, but it is a documentation
// for what a concrete logger should look like:

var ConcreteLogger = function(){

};

ConcreteLogger.prototype.supportsSlf4j = true;

ConcreteLogger.prototype.error = function(string){

}
ConcreteLogger.prototype.errorm = function(marker, string){
	
}
ConcreteLogger.prototype.warn = function(string){
	
}
ConcreteLogger.prototype.warnm = function(marker, string){
	
}
ConcreteLogger.prototype.info = function(string){
	
}
ConcreteLogger.prototype.infom = function(marker, string){
	
}
ConcreteLogger.prototype.debug = function(string){
	
}
ConcreteLogger.prototype.debugm = function(string){
	
}
ConcreteLogger.prototype.trace = function(string){
	
}
ConcreteLogger.prototype.tracem = function(string){
	
}

ConcreteLogger.prototype.addAppender = function(appender, marker, level){
	
}
ConcreteLogger.prototype.detachAppender = function(name){

}
ConcreteLogger.prototype.detachAndStopAllAppenders = function(){

}

// logger factory method signature
module.exports.loggerFactory = function(level, name, options){
	return new ConcreteLogger(level, name, options);
}