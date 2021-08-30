'use strict';

const Joi = require('joi');
const { HttpError } = require('../errors/errors');

const validateJoi = ({ schema, options }) => {
    if (!Joi.isSchema(schema)) {
        console.log('[joi validator middleware] No valid joi schema provided');
        throw new Error('invalid joi schema');
    }
    return {
        before: async (handler) => {
            try {
                const event = await schema.validateAsync(
                    handler.event,
                    options
                );
                Object.assign(handler.event, event);
            } catch (err) {
                throw new HttpError(400, err, true);
            }
        }
    };
};

module.exports = validateJoi;
