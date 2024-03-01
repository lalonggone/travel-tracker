// import { initiateUserFunctions, initiateHydrationFunctions, initiateSleepFunctions } from "./scripts"
// import { displayError } from "./domUpdates"

function getAllData() {
    const singleTraveler = fetch('http://localhost:3001/api/v1/travelers/20')
        .then(resp => resp.json())

    const allTrips = fetch('http://localhost:3001/api/v1/trips')
        .then(resp => resp.json())

    const allDestinations = fetch('http://localhost:3001/api/v1/destinations')
        .then(resp => resp.json())

    Promise.all([singleTraveler, allTrips, allDestinations])
        .then((data) => {
            let [singleTraveler, allTrips, allDestinations] = data
            console.log(singleTraveler, allTrips, allDestinations)
        })
        .catch(error => console.log(error))
}

export {
    getAllData
}