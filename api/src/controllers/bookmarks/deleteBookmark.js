'use strict';

const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const httpErrorHandler = require('@middy/http-error-handler');
const httpJsonBodyParser = require('@middy/http-json-body-parser');
const Joi = require('joi');
const { HttpError } = require('../../domain/errors/errors');
const validateJoi = require('../../domain/middleware/validateJoi');
const bookmarksService = require('../../domain/services/bookmarks/bookmarksService');

const schema = Joi.object({
    body: Joi.object({
        userId: Joi.string().required(),
        articleId: Joi.string().required()
    })
}).unknown();

const handler = async (event) => {
    console.log('[pubmed bookmarks add handler] event', event);

    const { userId, articleId } = event.body;

    try {
        await bookmarksService.deleteBookmark(userId, articleId);
    } catch (err) {
        console.error('Error deleting bookmark', err);
        throw new HttpError(500, 'Error deleting bookmark'); // rethrow to let http middleware deal with it
    }
    return {
        statusCode: 200,
        body: null
    };
};

module.exports.handler = middy(handler)
    .use(cors())
    .use(httpJsonBodyParser())
    .use(validateJoi({ schema }))
    .use(httpErrorHandler());
