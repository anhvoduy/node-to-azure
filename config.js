const config = {
    endpoint: "https://azcomos.documents.azure.com:443/",
    key: "mtGhFrHf41R8icrVGBWCKiERYLQbM1EOIALEO8c6jgHFbYvex4r0H1fdAXoNB3NSD3lg1Dkvl09VQqPrkZWsFA==",
    databaseId: "Tasks",
    containerId: "Items",
    partitionKey: { kind: "Hash", paths: ["/category"] }
  };
  
  module.exports = config;