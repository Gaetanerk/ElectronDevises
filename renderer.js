const btnConvert = document.getElementById("convert");
document.getElementById('amount').focus();

btnConvert.addEventListener("click", async function (e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const devise = document.getElementById('devise').value.substring(0, 3);
    try {
        const convertData = await window.electron.getConvert(amount, devise);
        displayConvert(amount, convertData);
    } catch (error) {
        console.error(error);
    }
});

function displayConvert(amount, convertData) {
    try {
      const result = convertData.result.toFixed(2);
      const devise = convertData.devise;
      document.getElementById('result').innerHTML = `${amount} € est équivalent à ${result} ${devise}`;
    } catch (error) {
      console.error(error);
    }
}
