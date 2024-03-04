// lets see what we're working with!
// get that DATA and send it to scripts.js

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
function postTrip(userID, destinationID, numTravelers, date, numDays) {
    const tripData = {
        // shorthand prop names!! you don't have to write the key: value if they are the same. 
        // userID is the same as userID: userID
        userID,
        destinationID,
        numTravelers,
        date,
        numDays,
        status: 'pending',
        suggestedActivities: []
    }

    fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(tripData), 
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err,'error'));

}

export {
    getAllData,
    postTrip
}
