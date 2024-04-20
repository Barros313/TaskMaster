const addLocationIcon = document.getElementById("add-location");
const mapsContainer = document.getElementById("maps-container");
const closeMapsIcon = document.getElementById("close-maps-container");


addLocationIcon.addEventListener("click", () => {
    mapsContainer.style.display = "block";
    addLocationIcon.style.display = "none";
});

closeMapsIcon.addEventListener("click", () => {
    mapsContainer.style.display = "none";
    addLocationIcon.style.display = "block";
});