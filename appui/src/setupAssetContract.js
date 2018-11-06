import web3 from './web3';
//web3.eth.getAccounts().then(console.log);
import AssetTracker from './contracts/AssetTracker.json';

console.log("vediamooo"+JSON.stringify(AssetTracker));
console.log("networks: "+JSON.stringify(AssetTracker.networks["5777"].address));

const assetABI=JSON.stringify((AssetTracker).abi);


const  assetAddress=JSON.stringify(AssetTracker.networks["5777"].address);


const assetContract= new web3.eth.Contract(JSON.parse(assetABI), JSON.parse(assetAddress));
export {assetContract};
