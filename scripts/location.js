const insertButton = document.getElementById("insert-button");
let scopeTest = "Barros";

insertButton.addEventListener("click", () => {
    console.log("Funcionou esse carai")
    const address = document.getElementById('location-input').value;
    const complement = document.getElementById('complement').value;
    const city = document.getElementById('locality-input').value;
    const stateProvince = document.getElementById('administrative_area_level_1-input').value;
    const zipPostalCode = document.getElementById('postal_code-input').value;
    const country = document.getElementById('country-input').value;
  
    scopeTest = "Gabriel";

    console.log('Address:', address);
    console.log('Apt/Suite:', complement);
    console.log('City:', city);
    console.log('State/Province:', stateProvince);
    console.log('Zip/Postal Code:', zipPostalCode);
    console.log('Country:', country);
});