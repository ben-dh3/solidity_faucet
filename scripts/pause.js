const hre = require("hardhat");

async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balance: `, await getBalance(address));
    idx ++;
  }
}



async function main() {
    
    const [owner] = await hre.ethers.getSigners();
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();

    console.log("faucet deployed to:", faucet.target);

    const addresses = [owner.address, faucet.target];

    // put some funds in the faucet
    await faucet.connect(owner).deposit({ value: hre.ethers.parseEther("1") });
    await printBalances(addresses);

    await faucet.connect(owner).withdraw(hre.ethers.parseEther("0.1"));

    console.log("faucet withdrawal");
    await printBalances(addresses);

    await faucet.connect(owner).setPaused(true);
    await faucet.connect(owner).withdraw(hre.ethers.parseEther("0.1"));

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });