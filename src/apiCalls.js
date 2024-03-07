import { successfulTripBooked, processNewTrip } from "./domUpdates";
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
      const newTrip = json.newTrip
      getDestinationForProcessing(newTrip);
      successfulTripBooked();
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      // displayErrorMessage() doesnt exist but would be nice for UX
    });
}

function getDestinationForProcessing(newTrip) {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((resp) => resp.json())
    .then((data) => {
      const destinations = data.destinations;
      const destination = destinations.find(dest => dest.id === newTrip.destinationID);
      console.log(destination)
      return destination;
    });
}


export { getAllData, postTrip, nextTripId };
