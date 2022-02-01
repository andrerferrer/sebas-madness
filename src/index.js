import Web3 from 'web3';
// import * as fs from 'fs';

let web3 = new Web3(new Web3.poviders.HttpProvider("https://mainnet.infura.io/v3/0e3b4d5918bc438e975aa0f817589c09"));
let numberOfWallets = 3;

const getPK = (length) => {
  var result           = '';
  var characters       = 'abcdef0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function showMeTheMoney(BINGO) {
  for(let i = 0; i <= numberOfWallets; i++) {
      let pk = getPK(64)
      pk = `0x${pk}`
      let wallet = web3.eth.accounts.privateKeyToAccount(pk);
      web3.eth.getBalance(wallet.address)
      .then(data => {
          console.log("Testing address: " + wallet.address);
          if(parseInt(data,10) >= 0) {
              console.log("--------- BINGO ---------");
              BINGO[i] = {}
              BINGO[i]["private_key"] = pk;
              BINGO[i]["address"] = wallet.address;
              BINGO[i]["balance"] = data
              console.log(BINGO)
          }
      });
  }
}

const main = async () => {
  const BINGO = {};
  await showMeTheMoney(BINGO)
  console.log(BINGO)
}
