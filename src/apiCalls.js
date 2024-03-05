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
      return {
        travelers: travelers.travelers,
        trips: trips.trips,
        destinations: destinations.destinations,
      };
    })
    .catch((error) => console.error(error));
}

function postTrip(id, userID, destinationID, numTravelers, date, numDays) {
  const tripData = {
    id: id,
    userID: userID,
    destinationID: destinationID,
    travelers: numTravelers,
    date: date,
    duration: numDays,
    status: "pending",
    suggestedActivities: [],
  };

  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(tripData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if(response.status === 422) {
        fillOutAllFields()
      }
      response.json()
    })
    .then((json) => {
      if(response.ok) {
      successfulTripBooked();
      console.log("JSON DERULOOO", json);
      }
    })
    .catch((err) => console.log(err, "error"));
}

export { getAllData, postTrip, nextTripId };
