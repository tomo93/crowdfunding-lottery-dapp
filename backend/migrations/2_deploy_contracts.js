// var SimpleCoin = artifacts.require("./SimpleCoin.sol")
// module.exports = function(deployer) {
// deployer.deploy(SimpleCoin, 10000);
// };


var Ratings = artifacts.require("./Rating.sol");

module.exports = function(deployer) {
  deployer.deploy(Ratings,['Star Wars', 'Avatar', 'Inception'], {gas: 6700000});
};
