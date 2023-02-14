import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

import {apiApi} from "../api-gateway";
import {vpc} from "../vpc";
import {lambdaRole} from "../iam";

const config = new pulumi.Config();

/**
 * SERVERLESS
 */

new aws.ssm.Parameter("apigateway.api.id", {
    type: "String",
    name: "/my-project/api-gateway/http_api_id",
    value: apiApi.id,
});

new aws.ssm.Parameter("lambda.role", {
    type: "String",
    name: "/my-project/lambda/role-arn",
    value: lambdaRole.arn,
});

new aws.ssm.Parameter("lambda.securityGroup", {
    type: "String",
    name: "/my-project/lambda/security_group-id",
    value: vpc.vpc.defaultSecurityGroupId,
});

export const ssmVpcPrivateSubnetIds = new aws.ssm.Parameter("vpc.subnet.ids", {
    type: "StringList",
    name: "/my-project/vpc/private_subnet_ids",
    value: pulumi.concat(vpc.privateSubnetIds),
});

/**
 * SYMFONY APP
 */

const symfonyEnvVars = config.requireObject<string[]>("symfony");

for (const key in symfonyEnvVars) {
    new aws.ssm.Parameter(`symfony.env.vars-${key}`, {
        type: "String",
        name: `/my-project/symfony/envvars/${key}`,
        value: symfonyEnvVars[key],
    });
}
