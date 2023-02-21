import * as aws from "@pulumi/aws";

export const apiApi = new aws.apigatewayv2.Api("api", {
    protocolType: "HTTP",
});

new aws.apigatewayv2.Stage("api.default", {
    apiId: apiApi.id,
    autoDeploy: true,
    name: "$default"
});