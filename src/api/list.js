const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = async (event) => {
    try {

            const obj = JSON.parse(event.body);

            const ID = obj.id;
        
        
            const params = {
                TableName:'todos',
                Key: {
                 id : {S: ID}
                }
            
            };
        
            const data;
            
            try{
                data = await ddb.getItem(params).promise();
                console.log("Item read successfully:", data);
            } catch(err){
                console.log("Error: ", err);
                data = err;
            }
        
        
            const response = {
                'statusCode': 200,
                'body': JSON.stringify({
                    message: data
            })
        };
    } catch (err) {
        console.log(err);
        return err;
    }

    return response;
};