let icon = document.querySelector("#icon-div");
let details = document.querySelector("#details-div");

const openWeather = (e) => {
  const cityID = 6691859;
  const key = 'c64908872eaceaee4658ca8d247e6599';
  const url = 'https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key;
  fetch(url)
  .then(response => response.json())
  .then(data =>{
    console.log(data);
    getWeatherToday(data);
  })
  .catch(err => console.log(err));

};

const getWeatherToday = (data) =>{
  let windSpeed = Math.floor(data.wind.speed * 0.44704);
  icon.innerHTML = `
  <img class= "icon" src="${selectIcon(data.weather[0].icon)}">
  <h2 class="celsius"  id="fahrenheit">
        ${celsius(data.main.temp)}°C
</h2>
<br>
<h3 class="headerJs">
    Wind: ${windSpeed} m/s
    <br>
    Humidity: ${data.main.humidity} %
</h3>
<br>
  `;

  details.innerHTML = `
    <!--<h2 class="headerJs">Myyrmäki, ${data.sys.country}</h2>-->
    <br>
    <section>
        <h3 class="headerJsDate">${getDateHour()}</h3>
        <h3 class="headerJs">${cityCase(data.weather[0].description)}</h3>
</section>
  `;

};

/**
 * select icon
 */

const selectIcon = (iconCode) =>{

  const iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  return iconUrl;



  /*const N = iconCode.replace(/\D/g,"");
  const iconMap = {
    "01":"wi wi-day-sunny",
    "02":"wi wi-night-cloudy",
    "03":"wi wi-cloud",
    "04":"wi wi-cloudy",
    "09":"wi wi-showers",
    "10":"wi wi-rain",
    "11":"wi wi-thunderstorm",
    "13":"wi wi-snow-wind",
    "50":"wi wi-fog"
  };
  return iconMap[N] ? iconMap[N] : "wi wi-day-sunny";

   */
};

/**
 * to uppercase
 */
const cityCase = (str) =>{
  let city = str.toUpperCase();
  return city;
  /*return str
      .split(" ")
      .map(word => word[0].toUpperCase() + word.substring(1))
      .join(" ");

   */
} ;
/**
 * get hour and date
 */

const getDateHour = () =>{
  let now = new Date();
  let dayName = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
  );
  return `${dayName[now.getDay()]} ${now.getHours()}:${getMinutes(now)}`;
};

const getMinutes = (time) =>{
  let min = ("0" + time.getMinutes()).slice(-2);
  return min;
};

/**
 * convert temperature in kelvin
 */

const celsius =(tempKelvin)=> {
  const celsius = Math.round(tempKelvin - 273.15);
  return celsius;
};

const fahrenheit = (tempKelvin) =>{
  const fahrenheit = Math.round((tempKelvin -273.15) * 1.8 + 32);
  return fahrenheit;
};
openWeather();