require("hardhat-deploy")
require("hardhat-deploy-ethers")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    const { deploy, get } = deployments;
    const timeLock = await get("TimeLock")
    const daoDealClient = await deploy("DaoDealClient", {
        from: wallet.address,
        args: [],
        log: true,
    });
    const dealDaoClientContract = await ethers.getContractAt("DaoDealClient", daoDealClient.address)
    const transferOwnerTx = await dealDaoClientContract.transferOwnership(timeLock.address);
    await transferOwnerTx.wait();
}