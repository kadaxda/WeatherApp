async function getWeatherData(city) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7b175c2aefe32be480ff27b12fc78e51`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  return {
    temperature: weatherData.main.temp,
    feelsLike: weatherData.main.feels_like,
    weatherDes: weatherData.weather[0].main,
    obj: weatherData,
  };
}

let weather = getWeatherData("London");
weather.then((res) => {
  console.log(res);
});

const search = document.querySelector("#search");
const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", () => {
  let weather = getWeatherData(`${search.value}`);
  weather.then((res) => {
    console.log(res);
  });
});
