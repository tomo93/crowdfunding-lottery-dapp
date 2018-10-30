// var SimpleCoin = artifacts.require("./SimpleCoin.sol")
// module.exports = function(deployer) {
// deployer.deploy(SimpleCoin, 10000);
// };


var Asset = artifacts.require("./AssetTracker.sol");

module.exports = function(deployer) {
deployer.deploy(Asset);
};
