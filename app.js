const apiKey = "f158394f7f986e1bd4100479851b17fb";
const baseurl = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherBody = document.getElementById('weather-body');
const errorDiv = document.getElementById('error-message');


const weatherIcon = document.getElementById("weather-icon");
const locationEl = document.getElementById('location');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const feelsLike = document.getElementById('feels-like');
const pressure = document.getElementById('pressure');

async function fetchWeather(cityName){

    if (!cityName){
        return;
    };

    const url = `${baseurl}?q=${cityName}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);
        const data = await response.json();


        if (!response.ok){
            errorDiv.textContent = data.message //converts to error message
            errorDiv.classList.remove("hidden"); //error is shown
            weatherBody.classList.add("hidden"); //weather data is hidden
            return;
        }

        errorDiv.classList.add("hidden"); //errors are hidden
        weatherBody.classList.remove("hidden"); //weather data is shown

        locationEl.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent =  `${Math.round(data.main.temp)}`;
        description.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${data.wind.speed} m/s`;
        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        pressure.textContent = `${data.main.pressure} hPa`;

        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;  

    } catch(errors) {
        errorDiv.textContent = "Something went wrong. Please try again.";
        errorDiv.classList.remove("hidden");
        weatherBody.classList.add("hidden");
        console.error(errors);
    }
    
}



searchBtn.addEventListener("click", () => {

    fetchWeather(cityInput.value);
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchWeather(cityInput.value);
    }
});