
const hre = require("hardhat");

async function main() {

  const TestNFT = await hre.ethers.getContractFactory("TestNFT");
  const testNFT = await TestNFT.deploy();

  await testNFT.deployed();

  console.log("TestNFT deployed to:", testNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
