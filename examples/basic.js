var logger = require('../')

logger.info('hello world')                           // hello world
logger.warn('you are super cool')                    // warn: you are super cool
logger.error('boom')                                 // error: boom
logger.debug('shh, don\'t tell anyone I said that')  //

logger.verbose(true)
logger.debug('well that was fun')                    // debug: well that was fun

logger.quiet(true)
logger.warn('testing 1.. 2.. 3..')                   //
logger.warn('hear no evil')                          //
logger.error('speak no evil')                        //

logger.quiet(false)
logger.verbose(false)
logger.debug('back to normal')                       //
logger.info('and we\'re done')                       // and we're done
