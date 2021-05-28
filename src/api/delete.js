const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
import { Config } from '../config/config';

exports.handler = async function (event) {
    let response;
    try {
        const { ID } = JSON.parse(event.body);
        let data;
        let msg;
        let status;

        const params = {
            TableName: Config.table,
            Key: {
                "id": ID,
            }
        };

        try {
            data = await ddb.delete(params).promise();
            console.log("Item deleted successfully:", data);
            msg = 'Item deleted successfully';
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