'use strict';

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const table = process.env.bookmarks_table;

module.exports.getBookmarks = async (userId) => {
    const queryParams = {
        TableName: table,
        KeyConditionExpression: '#userPk = :userPk',
        ExpressionAttributeNames: {
            '#userPk': 'userPk'
        },
        ExpressionAttributeValues: {
            ':userPk': userId
        }
    };

    return docClient.query(queryParams).promise();
};

module.exports.addBookmark = async (userId, articleId) => {
    const params = {
        TableName: table,
        Item: {
            userPk: userId,
            articleSk: articleId
        }
    };

    await docClient.put(params).promise();
};

module.exports.deleteBookmark = async (userId, articleId) => {
    const params = {
        TableName: table,
        Key: {
            userPk: userId,
            articleSk: articleId
        }
    };

    await docClient.delete(params).promise();
};
