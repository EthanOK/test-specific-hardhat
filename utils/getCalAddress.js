const { ethers, BigNumber } = require("ethers");
const { keccak256 } = require("ethers/lib/utils");

main();

function main() {
  let sender = "0x6278A1E803A76796a3A1f7F6344fE874ebfe94B2";
  let nonce = 524;
  getAddressCreate(sender, nonce);

  let from = "0x0000000000ffe8b47b3e2130213b802212439497";
  let salt =
    "0x0000000000000000000000000000000000000000000000000000000000000001";
  let initCode =
    "0x608060405234801561001057600080fd5b506040516101ca3803806101ca83398101604081905261002f91610037565b600055610050565b60006020828403121561004957600080fd5b5051919050565b61016b8061005f6000396000f3fe6080604052600436106100565760003560e01c806326121ff01461005f5780633fb5c1cb1461007357806342cbb15c146100935780638381f58a146100a657806387ceff09146100bc578063d09de08a146100cf57005b3661005d57005b005b345b60405190815260200160405180910390f35b34801561007f57600080fd5b5061005d61008e3660046100f5565b600055565b34801561009f57600080fd5b5043610061565b3480156100b257600080fd5b5061006160005481565b3480156100c857600080fd5b5042610061565b3480156100db57600080fd5b5061005d6000805490806100ee8361010e565b9190505550565b60006020828403121561010757600080fd5b5035919050565b60006001820161012e57634e487b7160e01b600052601160045260246000fd5b506001019056fea2646970667358221220d32135c07b24204971ff11830ff36f94c745186bb3376124f82f9963a4e3a65b64736f6c634300081200330000000000000000000000000000000000000000000000000000000000000064";
  let initCodeHash = keccak256(initCode);
  // 0x00000000000000000000000000000000000000000000000000000000000000aa
  // 0x777d2032769ba80a42f9c678024cdfc275ad9cf8051a421b6713a96bef8d95f5
  // 0x8Fff376D4cbceF419dE0a63322DA130775096F01

  //   console.log(initCodeHash);
  var isValid = false;
  const regex = /^0x000000.*$/; // 表达式
  let index = 0;
  while (!isValid) {
    index++;
    let salt = ethers.utils.hexZeroPad(ethers.utils.hexlify(index), 32);

    let address = getAddressCreate2(from, salt, initCodeHash);

    isValid = regex.test(address);
    if (isValid) {
      console.log("Create2:" + salt + " " + address);
      return;
    }
  }

  //   while (!isValid) {
  //     wallet = ethers.Wallet.createRandom(); // 随机生成钱包，安全
  //     isValid = regex.test(wallet.address); // 检验正则表达式
  //   }
}
function getAddressCreate(sender, nonce) {
  let address = ethers.utils.getContractAddress({ from: sender, nonce: nonce });
  console.log("Create:" + address);
  return address;
}
function getAddressCreate2(from, salt, initCodeHash) {
  let address = ethers.utils.getCreate2Address(from, salt, initCodeHash);
  //   console.log("Create2:" + salt + " " + address);
  return address;
}
