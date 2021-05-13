function getWeatherData(city) {
  return fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b175c2aefe32be480ff27b12fc78e51`,
    { mode: "cors" }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      console.log({
        temperature: kToC(data.main.temp),
        weatherDes: data.weather[0].main,
      });
      let loading = document.querySelector(".loader");
      setTimeout(() => {
        loading.style.visibility = "hidden";
      }, 1000);
      return {
        temperature: kToC(data.main.temp),
        weatherDes: data.weather[0].main,
      };
    })
    .catch((err) => {
      console.log("error");
      alert("Error, didnt find city!");
      let loading = document.querySelector(".loader");
      loading.style.visibility = "hidden";
      return;
    });
}

// Init Berlin
let weather = getWeatherData("Berlin").then((data) => {
  console.log(data);
  let info = document.querySelector(".info");

  let city = document.createElement("h3");
  city.textContent = "Berlin";
  let temp = document.createElement("h3");
  temp.setAttribute("id", "temp");
  temp.textContent = data.temperature + " °C";
  let des = document.createElement("h3");
  des.textContent = data.weatherDes;

  info.append(city, temp, des);
  changeBackground(data.weatherDes);
});

const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const swapBtn = document.querySelector("#swapBtn");

searchBtn.addEventListener("click", () => {
  let loading = document.querySelector(".loader");
  loading.style.visibility = "visible";
  let weather = getWeatherData(`${searchInput.value}`);
  weather.then((res) => {
    console.log(res);
    let info = document.querySelector(".info");
    info.innerHTML = "";

    let city = document.createElement("h3");
    city.textContent = searchInput.value;
    let temp = document.createElement("h3");
    temp.setAttribute("id", "temp");
    temp.textContent = res.temperature + " °C";
    let des = document.createElement("h3");
    des.textContent = res.weatherDes;

    info.append(city, temp, des);
    changeBackground(res.weatherDes);
  });
});

swapBtn.addEventListener("click", () => {
  let temp = document.querySelector("#temp");
  let curTemp = temp.textContent.split(" ");
  console.log(curTemp);
  if (swapBtn.textContent == "°F") {
    temp.textContent = cToF(curTemp[0]) + " °F";
    swapBtn.textContent = "°C";
    return;
  } else if (swapBtn.textContent == "°C") {
    temp.textContent = fToC(curTemp[0]) + " °C";
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
