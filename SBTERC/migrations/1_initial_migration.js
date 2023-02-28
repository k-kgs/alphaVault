const MyTestToken = artifacts.require("MyTestToken");

module.exports = (deployer) => {
    deployer.deploy(MyTestToken, "MyTestToken", "MYTT", 100000);
};
