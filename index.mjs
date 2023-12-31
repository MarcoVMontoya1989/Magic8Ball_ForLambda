import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const regionDynamoDB = process.env.DATABASE_REGION_ENVIRONMENT;
const tableNameMagic = process.env.TABLE_NAME_ENVIRONMENT;

let result = {
  statusCode: 200,
  body: "",
};

export const handler = async (event) => {
  const client = new DynamoDBClient({ region: regionDynamoDB });

  try {
    let randomNumber = Math.floor(Math.random() * 20);

    let params = {
      "TableName": tableNameMagic,
      "Key": {
        "id": {
          N: randomNumber.toString(),
        }
      }
    };
    
    const command = new GetItemCommand(params);
    const responseDynamo = await client.send(command);

    if (!responseDynamo) {
     result.body = 'No magic 8 ball answer found for the given random index.';
    }
    
    result.body = responseDynamo.Item.answer.S;

  }
  catch (err) {
    result = {
      statusCode: 500,
      body: err
    };
  }

  return result;
};
