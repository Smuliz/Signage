
import HSLData from "./modules/hsl";
import { fetchPost } from "./modules/network";

const startTime = () => {
    let today = new Date();
    let h = today.getHours() + 2;
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('kello').innerHTML =
    h + ":" + m + ":" + s;
    let t = setTimeout(startTime, 500);
}

const checkTime = (i) => {
    if (i < 10) {i = "0" + i};
    return i;
}


const HSLDataByStopId = (container, stopId) => {
    const stopElement = document.createElement('div');
    const queryData = HSLData.queryForNextRidesByStopId(stopId);
    console.log("query data" , queryData);
    fetchPost(HSLData.url, 'application/graphql', queryData).then((response) => {
        console.log('hsl data response', response.data.stop);
        const stop = response.data.stop;
        stopElement.innerHTML = `<h1>Seuraavat Bussit ${stop.name}ltä</h1><ul>`;
        for (const ride of stop.stoptimesWithoutPatterns) {
            stopElement.innerHTML += `<li><b>${ride.trip.routeShortName}</b>
            > ${ride.headsign !== null ? ride.headsign : ride.trip.tripHeadsign}<br>
            ${HSLData.getTime(ride.scheduledDeparture)}
            </li>`;
        }
        stopElement.innerHTML += `</ul>`;
        container.appendChild(stopElement);
    });
};

const time = () => {
    setTimeout(() => {
        window.location.replace("http://users.metropolia.fi/~mikaemul/Media15.1.20/CSS_Html/LogoMetro/");
    }, 20000);
};

time();

const container1 = document.querySelector('.hsldata1');
container1.innerHTML = '';

const container2 = document.querySelector('.hsldata2');
container2.innerHTML = '';

HSLDataByStopId(container1, 4150201);
HSLDataByStopId(container2, 4150296);
startTime();