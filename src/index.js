async function getWeatherData(city) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b175c2aefe32be480ff27b12fc78e51`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  return {
    temperature: kToC(weatherData.main.temp),
    weatherDes: weatherData.weather[0].main,
    obj: weatherData,
  };
}
// Init
let weather = getWeatherData("Berlin");
weather.then((res) => {
  console.log(res);
  let info = document.querySelector(".info");

  let city = document.createElement("h3");
  city.textContent = "Berlin";
  let temp = document.createElement("h3");
  temp.setAttribute("id", "temp");
  temp.textContent = res.temperature;
  let des = document.createElement("h3");
  des.textContent = res.weatherDes;

  info.append(city, temp, des);
  changeBackground(res.weatherDes);
});

const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
const swapBtn = document.querySelector("#swapBtn");

searchBtn.addEventListener("click", () => {
  let weather = getWeatherData(`${search.value}`);
  weather.then((res) => {
    console.log(res);
    let info = document.querySelector(".info");
    info.innerHTML = "";

    let city = document.createElement("h3");
    city.textContent = search.value;
    let temp = document.createElement("h3");
    temp.setAttribute("id", "temp");
    temp.textContent = res.temperature;
    let des = document.createElement("h3");
    des.textContent = res.weatherDes;

    info.append(city, temp, des);
    changeBackground(res.weatherDes);
  });
});

swapBtn.addEventListener("click", () => {
  let temp = document.querySelector("#temp");
  let curTemp = temp.textContent;
  if (swapBtn.textContent == "°F") {
    temp.textContent = cToF(curTemp);
    swapBtn.textContent = "°C";
    break;
  } else if (swapBtn.textContent == "°C") {
    temp.textContent = fToC(curTemp);
    swapBtn.textContent = "°F";
  }
});

function changeBackground(wetter) {
  console.log(wetter);
  if (wetter == "Rain") {
    document.body.style.backgroundImage = "url('css/rain.jpg')";
  } else if (wetter == "Clouds") {
    document.body.style.backgroundImage = "url('css/clouds.jpg')";
  } else if (wetter == "Clear") {
    document.body.style.backgroundImage = "url('css/sun.jpg')";
  }
}

function cToF(temp) {
  let a = temp * (9 / 5) + 32;
  return Math.round(a * 100) / 100;
}
function fToC(temp) {
  let a = (temp - 32) * (5 / 9);
  return Math.round(a * 100) / 100;
}
function kToC(temp) {
  let a = temp - 273.15;
  return Math.round(a * 100) / 100;
}
