const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getConvert: async (amount, devise) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("apikey", "jSoQ214cCzRPG4mxqMw64M8aobXpmV7B");

      var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
      };

      const convertResponse = await fetch(`https://api.apilayer.com/fixer/convert?to=${devise}&from=EUR&amount=${amount}`, requestOptions)
      if (!convertResponse.ok) {
        throw new Error(convertResponse.status);
      }
      const convertData = await convertResponse.json();
      return {
        result: convertData.result, 
        devise: devise
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
});