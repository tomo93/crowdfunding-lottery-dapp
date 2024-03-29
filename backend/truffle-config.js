/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */



module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        //from: “0xf17f52151ebef6c7334fad080c5704d77216b732”,   Deploying from a specific account
        network_id: "5777" // Match any network id
      }
    }
};
