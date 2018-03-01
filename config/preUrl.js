//环境
const devIp = '192.168.1.156';
const devInterfacePORT = '8082';
const devAssetsPORT = '8080';

const serverIP = process.env.NODE_ENV === 'production'?prodIp:devIp;
const interfacePORT =  process.env.NODE_ENV === 'production'?prodInterfacePORT:devInterfacePORT;
const assetsPORT = process.env.NODE_ENV === 'production'?prodAssetsPORT:devAssetsPORT;

module.exports={
  serverUrl:"http://"+serverIP, //服务器IP地址
  interfaceUrl:"http://"+serverIP+":"+interfacePORT+"/project/", //服务器端接口访问地址
  assetsUrl:'http://'+serverIP+':'+assetsPORT+'/yxshopServer' //服务器资源访问地址
};
