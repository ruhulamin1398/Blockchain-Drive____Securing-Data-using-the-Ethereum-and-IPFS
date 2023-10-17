require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",

  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/TCj2T_EVQQiflTwIp3iYlr4O-jEENbNg',
      accounts: ['20cec08faea52eb9f022ab7c0f79224d6fe8c1594e3126d6367a3c669080f33a'],
    },}
};
