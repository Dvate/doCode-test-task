const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
import { Config } from '../config/config';

exports.handler = async (event) => {
    let response;
    try {
        const { id } = event.pathParameters;

        const params = {
            TableName: Config.table,
            Key: {
                id: id
            }
        };

        let data;
        let status;

        try {
            data = await ddb.getItem(params).promise();
            console.log("Item read successfully:", data);
            status = 200;
        } catch (err) {
            console.log("Error: ", err);
            data = err.message;
            status = 500;
        }

        response = {
            'statusCode': status,
            'body': JSON.stringify({
                message: data
            })
        };
    } catch (err) {
        console.log(err);
        return err.message;
    }

    return response;
};