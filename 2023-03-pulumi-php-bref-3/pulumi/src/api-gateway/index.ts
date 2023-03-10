import * as aws from "@pulumi/aws";
import {sslCertificateApi} from "../acm";

export const apiApi = new aws.apigatewayv2.Api("api", {
    protocolType: "HTTP",
});

const apiStage = new aws.apigatewayv2.Stage("api.default", {
    apiId: apiApi.id,
    autoDeploy: true,
    name: "$default"
});

export const apiDomainName = new aws.apigatewayv2.DomainName("api", {
    domainName: 'api.my-projects.tech',
    domainNameConfiguration: {
        certificateArn: sslCertificateApi.arn,
        endpointType: "REGIONAL",
        securityPolicy: "TLS_1_2",
    },
});

new aws.apigatewayv2.ApiMapping("api.api", {
    apiId: apiApi.id,
    domainName: apiDomainName.id,
    stage: apiStage.id
});