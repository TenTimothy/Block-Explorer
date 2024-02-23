const ethereumService = {
    async requestAccounts() {
      if (typeof ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        return accounts;
      } else {
        throw new Error('No Ethereum wallet found');
      }
    },
    
    async getBalance(account) {
      if (typeof ethereum !== 'undefined') {
        const balance = await ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] });
        return parseInt(balance, 16); // Balansen returneras i Wei
      } else {
        throw new Error('No Ethereum wallet found');
      }
    },
      
    async sendTransaction(from, to, amount) {
      if (typeof ethereum !== 'undefined') {
        const params = [{
          from,
          to,
          value: `0x${(parseFloat(amount) * Math.pow(10, 18)).toString(16)}`,
          gas: `0x${(21000).toString(16)}`,
          gasPrice: `0x${(2500000).toString(16)}`
        }];
        return await ethereum.request({ method: 'eth_sendTransaction', params });
      } else {
        throw new Error('No Ethereum wallet found');
      }
    },
  
    async getBlockNumber() {
      if (typeof ethereum !== 'undefined') {
        const blockNumber = await ethereum.request({ method: 'eth_blockNumber' });
        return parseInt(blockNumber, 16); // Konverterar till decimal
      } else {
        throw new Error('No Ethereum wallet found');
      }
    }
};
  
  export default ethereumService;
  