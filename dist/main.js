(()=>{const e=document.querySelector("#searchInput"),t=document.querySelector("#searchBtn"),n=document.querySelector("#swapBtn");async function r(e){let t=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${e}&appid=7b175c2aefe32be480ff27b12fc78e51`,{mode:"cors"}),n=await t.json(),r=document.querySelector(".loader");return setTimeout((()=>{r.style.visibility="hidden"}),1e3),{temperature:c(n.main.temp),weatherDes:n.weather[0].main}}function o(e){"Rain"==e?document.body.style.backgroundImage="url('css/rain.jpg')":"Clouds"==e?document.body.style.backgroundImage="url('css/clouds.jpg')":"Clear"==e&&(document.body.style.backgroundImage="url('css/sun.jpg')")}function c(e){let t=e-273.15;return Math.round(100*t)/100}r("Berlin").then((e=>{let t=document.querySelector(".info"),n=document.createElement("h3");n.textContent="BERLIN";let r=document.createElement("h3");r.setAttribute("id","temp"),r.textContent=e.temperature+" °C";let c=document.createElement("h3");c.textContent=e.weatherDes,t.append(n,r,c),o(e.weatherDes)})),t.addEventListener("click",(()=>{document.querySelector(".loader").style.visibility="visible",r(`${e.value}`).then((t=>{let n=document.querySelector(".info");n.innerHTML="";let r=document.createElement("h3");r.textContent=e.value.toUpperCase();let c=document.createElement("h3");c.setAttribute("id","temp"),c.textContent=t.temperature+" °C";let u=document.createElement("h3");u.textContent=t.weatherDes,n.append(r,c,u),o(t.weatherDes)})).catch((e=>{alert("Error, didnt find city!"),document.querySelector(".loader").style.visibility="hidden"}))})),n.addEventListener("click",(()=>{let e=document.querySelector("#temp"),t=e.textContent.split(" ");if(console.log(t),"°F"==n.textContent)return e.textContent=function(e){let t=1.8*e+32;return Math.round(100*t)/100}(t[0])+" °F",void(n.textContent="°C");"°C"==n.textContent&&(e.textContent=function(e){let t=5/9*(e-32);return Math.round(100*t)/100}(t[0])+" °C",n.textContent="°F")}))})();