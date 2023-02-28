const UniqueAssetNFT = artifacts.require("UniqueAssetNFT");

module.exports = (deployer) => {
    deployer.deploy(UniqueAssetNFT);
};
