let currentTime = new Date();
let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`
} 

let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let month = months[currentTime.getMonth()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${date} ${month} | ${hour}:${minutes}`

function formatHours(timestamp) {
    let currentTime = new Date(timestamp);
    let hour = currentTime.getHours();
    if (hour <10) {
        hour = `0${hour}`;
    }
    let minutes = currentTime.getMinutes();
    if (minutes < 10) {
    minutes = `0${minutes}`
    }
    return ${hours}:${minutes}

}



function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather.main);
    document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecast = response.data.list[0];

    forecastElement.innerHTML = `
        <div class="col-2">
            <h4> ${formatHours(forecast.dt * 1000)} </h4>
            <img src="${http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
            <div class="forecast-temperature"> <strong> ${Math.round(forecast.main.temp_max)}° </strong> ${Math.round(forecast.main.temp_min)}° </div>
        </div>
    `;


}

function search(city) {
    let apiKey = "2547a6a5f6c6d363e76bf41f4f629620";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#search-city-input").value;
    search(city);
} 

function searchLocation (position) {
let apiKey = "2547a6a5f6c6d363e76bf41f4f629620";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(showWeather)}


function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);

search("Milan");

