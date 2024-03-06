// lets see what we're working with!
// get that DATA and send it to scripts.js
import { successfulTripBooked, fillOutAllFields } from "./domUpdates";
let nextTripId;

function getAllData() {
  return Promise.all([
    fetch("http://localhost:3001/api/v1/travelers").then((resp) => resp.json()),
    fetch("http://localhost:3001/api/v1/trips").then((resp) => resp.json()),
    fetch("http://localhost:3001/api/v1/destinations").then((resp) =>
      resp.json()
    ),
  ])
    .then(([travelers, trips, destinations]) => {
      nextTripId = trips.trips.length + 1;
      console.log("next trip id", nextTripId)
      return {
        travelers: travelers.travelers,
        trips: trips.trips,
        destinations: destinations.destinations,
      };
    })
    .catch((error) => console.error(error));
}

function postTrip(tripData) {

  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(tripData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if(!response.ok) {
        console.log(response)
        throw new Error('Response is NOT OK! :(')
      }
      return response.json()
    })
    .then((json) => {
      console.log(json)
      if(response.ok) {
      successfulTripBooked();
      }
    })
    .catch((err) => console.log(err, "error"));
}

export { getAllData, postTrip, nextTripId };
