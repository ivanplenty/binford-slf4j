Binford SLF4J (for JavaScript)
==============================

Inspired by SLF4J ( http://www.slf4j.org/ ), this project aims to provide an agnostic API for all JavaScript code (both browser and node.JS server, both library and application) to use a common API interface when making log commands.

There are two parts to the binford effort:

* SLF4J: The API that all producers of log messages should use
* binford-logger, log4js, winston, etc.: The components that know how to consume log messages

SLF4J puts the two together.

Why SLF4J?
==========
Because application owners should have control over what logs get written.  We believe your library should not simply write to console.

Image a couple cases:

1. Your code is deployed onto hundreds of servers.  Do you want system administrators (or devops as they are now called) to have to look at each console?  Wouldn't it be nice if they could hook your code up to their log shipping solution?
2. Your code wants to warn users about deprecation.  You decide to spam with a console message that is mostly seen by people who can't change it.  [Connect 3.0 deprecation](http://stackoverflow.com/questions/19581146/how-to-get-rid-of-connect-3-0-deprecation-alert) is a shameful example, and those developers should not have written to console.

Using SLF4J you still can send as many messages as you like, but you can have confidence that your messages are only consumed if the application owner wants them.

Features
========

* Producer and Consumer (log appenders) API are separate.
* Producer API features markers and late-binding ASP.NET-like string formatting.
* We support log4js, winston, and binford-logger out of the box.
* Logging ouput is off by default: you have complete control in your application.
* Default logger, the binford-logger, offers colors.

Synopsis
========

Once, somewhere in your code to configure how you want your logs displayed.
In this example we are using the default binford-logger and configuring it to use the default appender, which in binford-logger's case goes to the color console.

    var slf4j = require('binford-slf4j');
    var binfordLogger = require('binford-logger');
    slf4j.setLoggerFactory(binfordLogger.loggerFactory);
    slf4j.loadConfig({
	    level: 5,
	    appenders:
		    [{
			    appender: binfordLogger.getDefaultAppender()
		    }]
    });


Then, whenenver you have a message worth logging, say in users.js:

    var logger = require('binford-slf4j').getLogger('company/users.js');
 
    // ....

    app = express();

    app.get('/', function(req, res){
    	logger.info("Received index request");
    	// ...
    	logger.infom(req.ip, "Looking up session {0} for ip {1}", req.session, req.ip);

    	// ...
    	logger.warnm(req.ip, "Session {0} for ip {1} has had 5 failures in a minute, possible abuse", req.session, req.ip);
    });



Producer API
============

String format only:
* error(formatString, [args]);
* warn(formatString, [args]);
* info(formatString, [args]);
* debug(formatString, [args]);
* trace(formatString, [args]);

With markers:
* errorm(marker, formatString, [args]);
* warnm(marker, formatString, [args]);
* infom(marker, formatString, [args]);
* debugm(marker, formatString, [args]);
* tracem(marker, formatString, [args]);
