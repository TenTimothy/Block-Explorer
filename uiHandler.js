import ethereumService from './ethereumService.js';

const accountInput = document.querySelector('#accountNumber');
const displayBalance = document.querySelector('#balance');
const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const latestBlock = document.querySelector('#latestBlock');
const checkBalanceButton = document.querySelector('#checkBalance');
const sendButton = document.querySelector('#sendTx');
const getBlockbtn = document.querySelector('#getBlock');

let acccounts;


async function checkBalance() {
    try {
      const accounts = await ethereumService.requestAccounts();
      const accountToCheck = accountInput.value.trim() ? accountInput.value : accounts[0];
      const balanceWei = await ethereumService.getBalance(accountToCheck);
      const balanceEther = balanceWei / Math.pow(10, 18);

      displayBalance.innerText = balanceEther.toFixed(4);
    } catch (error) {
      
      alert(error.message);
    }
}


async function sendFunds() {
    try {
        const amount = parseFloat(valueInput.value) * Math.pow(10, 18);
        let params = [
            {
                from: accountInput.value,
                to: toAccountInput.value,
                value: Number(amount).toString(16),
                gas: Number(21000).toString(16),
                gasPrice: Number(2500000).toString(16)
            },
        ];

        const response= await ethereum.request({
            method: 'eth_sendTransaction',
            params: params, 
        });
        alert('Transaction sent!');
    } catch (error) {
        console.error(error);
        alert('Failed to send transaction.');
    }
}

async function getBlockNumber() {
    if (typeof ethereum !== 'undefined') {
        const blockNumber = await ethereum.request({ method: 'eth_blockNumber' });
        latestBlock.innerText = parseInt(blockNumber, 16).toString();
    } else {
        alert('Ethereum object not found. Please make sure MetaMask is installed.');
    }
}

const uiHandler = {
    checkBalance,
    sendFunds,
    getBlockNumber,
    bindEventListeners: function() {
        document.querySelector('#checkBalance').addEventListener('click', checkBalance);
        document.querySelector('#sendTx').addEventListener('click', sendFunds);
        document.querySelector('#getBlock').addEventListener('click', getBlockNumber);
    }
};

export default uiHandler;
