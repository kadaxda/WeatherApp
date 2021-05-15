const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn");
const swapBtn = document.querySelector("#swapBtn");

async function getWeatherData(city) {
  let response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b175c2aefe32be480ff27b12fc78e51`,
    { mode: "cors" }
  );
  let data = await response.json();
  let loading = document.querySelector(".loader");
  setTimeout(() => {
    loading.style.visibility = "hidden";
  }, 1000);
  return {
    temperature: kToC(data.main.temp),
    weatherDes: data.weather[0].main,
  };
}

// Init Berlin
getWeatherData("Berlin").then((data) => {
  let info = document.querySelector(".info");

  let city = document.createElement("h3");
  city.textContent = "BERLIN";
  let temp = document.createElement("h3");
  temp.setAttribute("id", "temp");
  temp.textContent = data.temperature + " °C";
  let des = document.createElement("h3");
  des.textContent = data.weatherDes;

  info.append(city, temp, des);
  changeBackground(data.weatherDes);
});

searchBtn.addEventListener("click", () => {
  let loading = document.querySelector(".loader");
  loading.style.visibility = "visible";
  let weather = getWeatherData(`${searchInput.value}`);
  weather
    .then((res) => {
      let info = document.querySelector(".info");
      info.innerHTML = "";

      let city = document.createElement("h3");
      city.textContent = searchInput.value.toUpperCase();
      let temp = document.createElement("h3");
      temp.setAttribute("id", "temp");
      temp.textContent = res.temperature + " °C";
      let des = document.createElement("h3");
      des.textContent = res.weatherDes;

      info.append(city, temp, des);
      changeBackground(res.weatherDes);
    })
    .catch((err) => {
      alert("Error, didnt find city!");
      let loading = document.querySelector(".loader");
      loading.style.visibility = "hidden";
      return;
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
