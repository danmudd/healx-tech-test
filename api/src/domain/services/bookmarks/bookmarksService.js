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

    console.log(queryParams);

    return docClient.query(queryParams).promise();
};
