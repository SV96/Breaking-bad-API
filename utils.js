const logger = require('./logger')
const axios= require('axios');

function checkIpAddress(){
    async function getPublicIPAddress() {
        try {
          const response = await axios.get('https://api64.ipify.org?format=json');
          if (response.status === 200 && response.data && response.data.ip) {
            return response.data.ip;
          }
          throw new Error('Unable to retrieve public IP address.');
        } catch (error) {
          console.error('Error:', error.message);
          return null;
        }
      }
      
      (async () => {
        const publicIPAddress = await getPublicIPAddress();
        if (publicIPAddress) {
          logger.info(`Public IP Address: ${publicIPAddress}`);
        } else {
          logger.error('Failed to retrieve public IP address.');
        }
      })();
}

module.exports = {checkIpAddress}