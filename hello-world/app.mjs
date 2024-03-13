import axios from "axios";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event, context) => {
  try {
    console.info("Start lambda handler");
    const response = await axios.get("http://httpbin.org/ip");
    const ip = response.data.origin;

    console.log("Service httpbin returned with successfully");

    return {
      statusCode: 200,
      body: `Seu IP é: ${ip}`,
    };
  } catch (error) {
    console.error(`Erro ao acessar o serviço externo: ${error.message}`);

    return {
      statusCode: 500,
      body: "Erro interno no servidor",
    };
  }
};
