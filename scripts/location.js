const addLocationIcon = document.getElementById("add-location");
const mapsContainer = document.getElementById("maps-container");
const closeMapsIcon = document.getElementById("close-maps-container");
// const insertAddressButton = mapsContainer.querySelector('button');
// let apiScript = projectScripts[projectScripts.length];
// let scriptURL = apiScript.src;
// console.log(apiScript);

addLocationIcon.addEventListener("click", () => {
    mapsContainer.style.display = "block";
    addLocationIcon.style.display = "none";
});

closeMapsIcon.addEventListener("click", () => {
    mapsContainer.style.display = "none";
    addLocationIcon.style.display = "block";
});

insertAddressButton.addEventListener("click", () => {
    const address = document.getElementById('location-input').value;
    const aptSuite = document.getElementById('apt-suite-input').value;
    const city = document.getElementById('locality-input').value;
    const stateProvince = document.getElementById('administrative_area_level_1-input').value;
    const zipPostalCode = document.getElementById('postal_code-input').value;
    const country = document.getElementById('country-input').value;
  
    console.log('Address:', address);
    console.log('Apt/Suite:', aptSuite);
    console.log('City:', city);
    console.log('State/Province:', stateProvince);
    console.log('Zip/Postal Code:', zipPostalCode);
    console.log('Country:', country);
});