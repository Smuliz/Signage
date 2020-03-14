const apiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

const queryForNextRidesByStopId = (id) => {
    return `{
        stop(id: "HSL:${id}") {
            name
            stoptimesWithoutPatterns {
                scheduledArrival
                realtimeArrival
                arrivalDelay
                scheduledDeparture
                realtimeDeparture
                departureDelay
                realtime
                realtimeState
                serviceDay
                headsign
                trip {
                  routeShortName
                  tripHeadsign
                }
        }
    }
}`;
};

const getTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) - (hours * 60);
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};

const HSLData = {
    url: apiUrl,
    queryForNextRidesByStopId,
    getTime
};

export default HSLData;
