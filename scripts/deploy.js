const hre = require("hardhat")
async function main() {
    // const Auction = await hre.ethers.getContractFactory("NFTMarket");
    // const auction = await Auction.deploy('oneunit')
    // const Auction = await hre.ethers.getContractFactory("LoanContract");
    // const auction = await Auction.deploy()
    const Auction = await hre.ethers.getContractFactory("Loan");
    const auction = await Auction.deploy(10)
    await auction.waitForDeployment()
    console.log(`Create deployed to ${auction.target}`)
    console.log(`Deployed SuccessFully!`)
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
