import * as aws from "@pulumi/aws";

export const sslCertificateApi = new aws.acm.Certificate("api",
    {
        domainName: "api.my-projects.tech",
        validationMethod: "DNS",
    }
);