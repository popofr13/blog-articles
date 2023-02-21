import * as awsx from "@pulumi/awsx";

export const vpc = new awsx.ec2.Vpc("vpc", {
    natGateways: {
        strategy: "None", // Change to "Single" if you want your Lambda to be able to access the internet
    },
    subnetSpecs: [
        { type: "Public" },
        { type: "Private" },
        { type: "Isolated", name: "databases" }
    ],
});