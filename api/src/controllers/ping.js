'use strict';

const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const httpErrorHandler = require('@middy/http-error-handler');

const handler = async (event) => {
    console.log('[pubmed ping handler] event', event);

    return {
        statusCode: 200,
        body: 'pong'
    };
};

module.exports.handler = middy(handler).use(cors()).use(httpErrorHandler());
