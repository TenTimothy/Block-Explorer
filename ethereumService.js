// ethereumService.js
export const ethereumService = {
    async requestAccounts() {
      if (typeof ethereum === 'undefined') {
        throw new Error('No Ethereum object found');
      }
      return await ethereum.request({ method: 'eth_requestAccounts' });
    },
  
    async getBalance(account) {
      const balance = await ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });
      return parseInt(balance, 10) / Math.pow(10, 18);
    },
  
    async sendTransaction(from, to, amount) {
      const params = [{
        from,
        to,
        value: `0x${(amount * Math.pow(10, 18)).toString(16)}`,
        gas: `0x${(21000).toString(16)}`,
        gasPrice: `0x${(2500000).toString(16)}`,
      }];
      return await ethereum.request({ method: 'eth_sendTransaction', params });
    },
  
    async getBlockNumber() {
      return await ethereum.request({ method: 'eth_blockNumber' });
    }
  };
  