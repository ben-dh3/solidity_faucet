const hre = require("hardhat");

async function main() {
    const [owner] = await hre.ethers.getSigners();
    const faucetAddress = "YOUR CONTRACT ADDRESS";
    const faucet = await hre.ethers.getContractAt("Faucet", faucetAddress);

    await faucet.connect(owner).withdraw(hre.ethers.parseEther("0.1"));

    console.log("Funds withdrawn from the faucet");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});