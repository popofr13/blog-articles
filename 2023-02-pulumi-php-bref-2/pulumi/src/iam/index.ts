import * as aws from "@pulumi/aws";

export const lambdaRole = new aws.iam.Role("lambda", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(aws.iam.Principals.LambdaPrincipal),
});

new aws.iam.RolePolicyAttachment("RoleLambdaPoliciesVpcAccessExecution", {
    role: lambdaRole,
    policyArn: aws.iam.ManagedPolicies.AWSLambdaVPCAccessExecutionRole,
});
