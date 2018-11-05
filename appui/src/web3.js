//Creazione di un instanza di web3 e collegamento con blockchain
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
export default web3;
//web3.eth.getAccounts().then(console.log);




/*web3 1.0 (permette di usare async e await invece di promises)
import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
web3.eth.getAccounts().then(console.log);
*/


/*
web3- versioni precedenti

import Web3 from 'web3';

let web3 = null;
if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.getAccounts(callback(error, result){ console.log(result) })

*/
