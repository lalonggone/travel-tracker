function getAllData() {
    return Promise.all([
        fetch('http://localhost:3001/api/v1/travelers').then(resp => resp.json()),
        fetch('http://localhost:3001/api/v1/trips').then(resp => resp.json()),
        fetch('http://localhost:3001/api/v1/destinations').then(resp => resp.json())
    ])
    .then(([travelers, trips, destinations]) => {
        return {
            travelers: travelers.travelers,
            trips: trips.trips,
            destinations: destinations.destinations
        };
    })
    .catch(error => console.error(error));
}

export {
    getAllData
}
