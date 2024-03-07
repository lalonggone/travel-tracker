import { successfulTripBooked, appendNewTripToDOM } from "./domUpdates";
import { processNewTrip } from "./scripts";

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
      const newTrip = json.newTrip;
      successfulTripBooked();
      nextTripId += 1
      return fetch("http://localhost:3001/api/v1/destinations")
        .then((resp) => resp.json())
        .then((data) => {
          const destinations = data.destinations;
          return {
            newTrip,
            destination: destinations.find(dest => dest.id === newTrip.destinationID)
          };
        });
    })
    .then(({ newTrip, destination }) => {
      if (destination) {
        const processedTripForDom = processNewTrip(newTrip, destination);
        appendNewTripToDOM(processedTripForDom, 'pending-trips-container')
      } else {
        console.log("Destination not found for the new trip");
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      // displayErrorMessage() does not exist yet but when it does, call it here
    });
}


function getDestinationForProcessing(newTrip) {
}


export { getAllData, postTrip, nextTripId };
