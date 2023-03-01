import * as aws from "@pulumi/aws";
import {sslCertificateApi} from "../acm";
import {apiDomainName} from "../api-gateway";

export const mainDelegationSet = new aws.route53.DelegationSet("main", {}, {});

export const zone = new aws.route53.Zone("my-projects", {
    delegationSetId: mainDelegationSet.id,
    name: "my-projects.tech",
});

const apiAcmValidation = new aws.route53.Record("api.acm",
    {
        zoneId: zone.zoneId,
        name: sslCertificateApi.domainValidationOptions[0].resourceRecordName,
        type: sslCertificateApi.domainValidationOptions[0].resourceRecordType,
        records: [sslCertificateApi.domainValidationOptions[0].resourceRecordValue],
        ttl: 10 * 60,
    }
);

new aws.acm.CertificateValidation(
    'api',
    {
        certificateArn: sslCertificateApi.arn,
        validationRecordFqdns: [apiAcmValidation.fqdn],
    }
);

new aws.route53.Record('api.apig', {
    zoneId: zone.zoneId,
    name: 'api.my-projects.tech',
    type: "A",
    aliases: [{
        evaluateTargetHealth: true,
        name: apiDomainName.domainNameConfiguration.targetDomainName,
        zoneId: apiDomainName.domainNameConfiguration.hostedZoneId
    }],
});