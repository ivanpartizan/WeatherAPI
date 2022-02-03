const cityInput = document.querySelector("#cityInput");
const card = document.querySelector(".card");

const pressEnter = (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
};

cityInput.addEventListener("keydown", pressEnter);

async function getWeather() {
  let city = cityInput.value;
  let url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
      "x-rapidapi-key": "dd246daf8emsh5c56367f132b388p1c9a77jsnb0b04a526d60",
    },
  });
  const data = await response.json();
  console.log(data);

  displayData(data);
  cityInput.value = "";
}

const displayData = (city) => {
  if (city.error) {
    card.innerHTML = `<div><h1 class="errorMessage">${city.error.message} ${cityInput.value} is not in our database. </h1></div>`;
  } else {
    card.style.opacity = "1";
    card.innerHTML = `<div class="cityCard">
    <h1>${city.location.name}, ${city.location.country}</h1>
    <br>
    <div class="data"><h3>Time zone: ${city.location.tz_id
      .split("_")
      .join(" ")}</h3>
    <h3>Local date and time: ${city.location.localtime}</h3></div>
    <br>
    <div class="today"><h2>Now: ${city.current.temp_c} °C / ${
      city.current.temp_f
    } °F</h2>
    <div class="conditions"><img src=${
      city.current.condition.icon
    } height='50' class='flag' /><h2>${city.current.condition.text}</h2></div>
    <h2>Feels like: ${city.current.feelslike_c} °C / ${
      city.current.feelslike_f
    } °F</h2>
    <h2>Wind: ${city.current.wind_kph} km/h - ${
      city.current.wind_dir
    }</h2></div>
    <div class="group"><h2>Pressure: ${city.current.pressure_mb} mbar</h2> 
    <h2>Humidity: ${city.current.humidity} %</h2></div>
    <div class="group"><h2>Precipitation: ${city.current.precip_mm} mm</h2> 
    <h2>Cloud cover: ${city.current.cloud} %</h2></div> 
    <div class="today"><h2>UV Index: ${city.current.uv}</h2></div>
    </div>
    <br>
    <div class="tomorrow">
    <h3>Tomorrow: </h3>
    <div class="conditions"><img src=${
      city.forecast.forecastday[1].day.condition.icon
    } height='50' class='flag' /> <h2>${
      city.forecast.forecastday[1].day.condition.text
    }</h2></div>
    <h3>Max: ${city.forecast.forecastday[1].day.maxtemp_c} °C / ${
      city.forecast.forecastday[1].day.maxtemp_f
    } °F</h3>
    <h3>Min: ${city.forecast.forecastday[1].day.mintemp_c} °C / ${
      city.forecast.forecastday[1].day.mintemp_f
    } °F</h3></div>
    <div class="group"><h3>Precipitation: ${
      city.forecast.forecastday[1].day.totalprecip_mm
    } mm</h3>
    <h3>Maximum wind speed: ${
      city.forecast.forecastday[1].day.maxwind_kph
    } km/h</h3></div>
    <br>
    <div class="dayAfterTomorrow">
    <h3>On ${city.forecast.forecastday[2].date}: </h3>
    <div class="conditions"><img src=${
      city.forecast.forecastday[2].day.condition.icon
    } height='50' class='flag' /> <h2>${
      city.forecast.forecastday[2].day.condition.text
    }</h2></div>
    <h3>Max: ${city.forecast.forecastday[2].day.maxtemp_c} °C / ${
      city.forecast.forecastday[2].day.maxtemp_f
    } °F</h3>
    <h3>Min: ${city.forecast.forecastday[2].day.mintemp_c} °C / ${
      city.forecast.forecastday[2].day.mintemp_f
    } °F</h3></div>
    <div class="group"><h3>Precipitation: ${
      city.forecast.forecastday[2].day.totalprecip_mm
    } mm</h3>
    <h3>Maximum wind speed: ${
      city.forecast.forecastday[2].day.maxwind_kph
    } km/h</h3></div>    
    </div>`;

    card.style.animation = "appear 2s linear";
    card.addEventListener("animationend", function () {
      card.style.animation = "";
    });
  }
};
