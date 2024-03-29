'use strict';

const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const httpErrorHandler = require('@middy/http-error-handler');
const Joi = require('joi');
const { HttpError } = require('../../domain/errors/errors');
const validateJoi = require('../../domain/middleware/validateJoi');
const bookmarksService = require('../../domain/services/bookmarks/bookmarksService');

const schema = Joi.object({
    queryStringParameters: Joi.object({
        userId: Joi.string().required()
    })
}).unknown();

const handler = async (event) => {
    console.log('[pubmed bookmarks get handler] event', event);

    const { userId } = event.queryStringParameters;

    let Items;
    try {
        ({ Items } = await bookmarksService.getBookmarks(userId));
    } catch (err) {
        console.error('Error retrieving bookmarks', err);
        throw new HttpError(500, 'Error retrieving bookmarks'); // rethrow to let http middleware deal with it
    }
    return {
        statusCode: 200,
        body: JSON.stringify({
            bookmarks: Items.map((item) => item.articleSk)
        })
    };
};

module.exports.handler = middy(handler)
    .use(cors())
    .use(validateJoi({ schema }))
    .use(httpErrorHandler());
