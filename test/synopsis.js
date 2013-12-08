var should = require('should');

describe('Synopsis', function(){

	it(' should work with the sample code', function(){
	    var slf4j = require('../index.js');
	    var binfordLogger = require('binford-logger');
	    slf4j.setLoggerFactory(binfordLogger.loggerFactory);
	    slf4j.loadConfig({
		    level: 5,
		    appenders:
			    [{
				    appender: binfordLogger.getDefaultAppender()
			    }]
	    });

	    var logger = slf4j.getLogger('company/users.js');

	    logger.info("Received index request");
    	logger.infom("127.0.0.1", "Looking up session {0} for ip {1}", "session123", "127.0.0.1");

    	logger.warnm("127.0.0.1", "Session {0} for ip {1} has had 5 failures in a minute, possible abuse", "session123", "127.0.0.1");
	});
})