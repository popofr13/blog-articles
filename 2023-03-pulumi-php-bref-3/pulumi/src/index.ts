import {ssmVpcPrivateSubnetIds} from "./ssm";
import {vpc} from "./vpc";
import {apiApi} from "./api-gateway";
import {zone} from "./route53";

// Stack outputs
export const apiEndpoint = apiApi.apiEndpoint
export const vpcId = vpc.vpcId;
export const ssmVpcPrivateSubnetIdsArn = ssmVpcPrivateSubnetIds.arn;
export const zoneId = zone.zoneId;
