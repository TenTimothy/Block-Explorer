// ui.js
import { ethereumService } from './ethereumService.js';

const accountInput = document.querySelector('#accountNumber');
const displayBalance = document.querySelector('#balance');
const toAccountInput = document.querySelector('#toAccountNumber');
const valueInput = document.querySelector('#amount');
const latestBlock = document.querySelector('#latestBlock');

export const ui = {
  async checkBalance() {
    try {
      const accounts = await ethereumService.requestAccounts();
      const balance = await ethereumService.getBalance(accounts[0]);
      displayBalance.innerText = balance.toFixed(4);
    } catch (error) {
      alert(error.message);
    }
  },

  async sendFunds() {
    try {
      const amount = parseFloat(valueInput.value);
      await ethereumService.sendTransaction(accountInput.value, toAccountInput.value, amount);
      alert('Transaction sent!');
    } catch (error) {
      console.error(error);
      alert('Failed to send transaction.');
    }
  },

  async getBlockNumber() {
    try {
      const blockNumber = await ethereumService.getBlockNumber();
      latestBlock.innerText = parseInt(blockNumber, 16);
    } catch (error) {
      alert('Failed to fetch block number.');
    }
  },

  addEventListeners() {
    document.querySelector('#checkBalance').addEventListener('click', this.checkBalance);
    document.querySelector('#sendTx').addEventListener('click', this.sendFunds);
    document.querySelector('#getBlock').addEventListener('click', this.getBlockNumber);
  }
};
