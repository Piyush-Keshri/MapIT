'use strict';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

//Displaying the current location and loading the map.

//Here we use the leaflet library to implement this feature. 

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

        const { latitude } = position.coords;
        const { longitude } = position.coords;
        // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

        const coords = [latitude, longitude];

        map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href= "https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker(coords).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        //When user clicks on the map this event will get the exact co-ordinates
        map.on('click', function (mapE) {
            mapEvent = mapE;

            //Load the form as user clicks on the map.
            form.classList.remove('hidden');
            inputDistance.focus();

        });

    }, function () {
        alert('Could not get your position');
    })
}

//Form Submission

form.addEventListener('submit', function (e) {
    e.preventDefault();

    //Clear Input Fields
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

    //Display Marker
    // console.log(mapEvent);
    const { lat, lng } = mapEvent.latlng;

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            //Popup styling on click
            L.popup({

                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
            })
        )
        .setPopupContent('Workout')
        .openPopup();
});

inputType.addEventListener('change',function(){

    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');

})