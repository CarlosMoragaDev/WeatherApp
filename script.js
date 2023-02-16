
const API_KEY = "c9ec3fbc9ce3c9720330917d00e6df05";

const fetchData = position =>{
    const { latitude, longitude} = position.coords;
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=sp&appid=${API_KEY}`).then(response => response.json()).then(data => setWeatherData(data))   
}

const setWeatherData = data => {
    console.log(data);

    const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity + " " + "%",
        wind: data.wind.speed + " " + "km/h",
        temperature: data.main.temp + " " + "°",
        date: getDate(),
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    cleanUp();
}

const cleanUp = () => {
   let container = document.getElementById('container'); 
   let ldsspinner = document.getElementById('lds-spinner');

   ldsspinner.style.display = 'none';
   container.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}