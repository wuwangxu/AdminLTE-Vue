//环境
const devIp = '192.168.1.153';
const devInterfacePORT = "8082"

const serverIP = process.env.NODE_ENV === 'production'?prodIp:devIp;
const interfacePORT =  process.env.NODE_ENV === 'production'?prodInterfacePORT:devInterfacePORT;

module.exports={
  serverUrl:"http://"+serverIP, //服务器IP地址
  interfaceUrl:"http://"+serverIP+":"+interfacePORT+"/project/", //服务器端接口访问地址
};
