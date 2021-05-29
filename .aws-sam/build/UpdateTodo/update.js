const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
import { Config } from '../config/config';

exports.handler = async function (event) {
    let response;
    try {
        const { TODO, ID } = JSON.parse(event.body);
        let data;
        let msg;
        let status;

        const params = {
            TableName: Config.table,
            Key: {
                "id": ID,
            },
            UpdateExpression: "set todo = :t",
            ExpressionAttributeValues: {
                ":t": TODO
            },
            ReturnValues: "UPDATED_NEW"
        };

        try {
            data = await ddb.update(params).promise();
            console.log("Item updated successfully:", data);
            msg = 'Item updated successfully';
            status = 200;
        } catch (err) {
            console.log("Error: ", err);
            msg = err.message;
            status = 500;
        }

        response = {
            'statusCode': status,
            'body': JSON.stringify({
                message: msg
            })
        }
    } catch (err) {
        return err.message;
    }
    return response;
};