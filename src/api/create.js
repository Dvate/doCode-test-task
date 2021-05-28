const AWS = require('aws-sdk');
const uuid = require('uuid');
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
import { TodoSchema } from '../validators/joi-validator';
import { Config } from '../config/config';

exports.handler = async (event) => {
  let response;
  try {
    const { TODO } = JSON.parse(event.body);
    const { error, value } = TodoSchema.validate(TODO)
    let data;
    let msg;
    let status;

    if (error) {
      return error.message;
    }

    const ID = uuid.v1();

    const params = {
      TableName: Config.table,
      Item: {
        id: ID,
        todo: value
      }
    };

    try {
      data = await ddb.putItem(params).promise();
      console.log("Item created successfully:", data);
      msg = 'Item created successfully';
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