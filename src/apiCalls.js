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

function postTrip(tripData) {
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    body: JSON.stringify(tripData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(
            `Error: ${response.status} ${response.statusText} - ${err.message}`
          );
        });
      }
      return response.json();
    })
    .then((json) => {
      console.log("JSON", json);
      successfulTripBooked();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      // displayErrorMessage() doesnt exist but would be nice for UX
    });
}

export { getAllData, postTrip, nextTripId };
