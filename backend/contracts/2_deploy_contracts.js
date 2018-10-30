var SimpleCoin = artifacts.require("SimpleCoin")
module.exports = function(deployer) {
deployer.deploy(SimpleCoin, 10000); 
};
