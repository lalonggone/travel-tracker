import "./css/styles.scss";
import { getAllData } from "./apiCalls";
import { renderInvalidLogin, renderDashboard } from "./domUpdates";

document.addEventListener("DOMContentLoaded", () => {
  logIn();
});

function logIn() {
  const logInButton = document.querySelector("#login-button");

  logInButton.addEventListener("click", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const usernameDigits = username.match(/\d+/);
    const travelerId = usernameDigits ? +usernameDigits[0] : null;

    getAllData().then((data) => {
      let { travelers } = data;
      const currentTraveler = travelers.find(
        (traveler) => traveler.id === travelerId
      );
      if (currentTraveler && password === "travel") {
        travelerDashboardData(currentTraveler);
      } else {
        renderInvalidLogin();
      }
    });
  });
}

function travelerDashboardData(currentTraveler) {
  const dashboardData = {
    name: currentTraveler.name,
    travelerId: currentTraveler.id,
  };
  getAllData().then((data) => {
    const { travelers, trips, destinations } = data;
    const currentTravelerTrips = travelerTrips(currentTraveler.id, trips);

    dashboardData.destinations = destinations;
    dashboardData.trips = currentTravelerTrips;
    dashboardData.totalSpent = calculateTotalSpent(
      currentTravelerTrips,
      destinations
    );
    renderDashboard(dashboardData);
  });
}

function travelerTrips(userID, trips) {
  travelerTrips = trips.filter((trip) => trip.userID === userID);
  return travelerTrips;
}

function processTrips(travelerTrips, destinations) {
  return travelerTrips.map((trip) => {
    const destination = destinations.find(
      (dest) => dest.id === trip.destinationID
    );
    return {
      destination: destination.destination,
      image: destination.image,
      alt: destination.alt,
      travelers: trip.travelers,
      date: trip.date,
      duration: trip.duration,
      status: trip.status,
    };
  });
}
function processNewTrip(newTrip, newDest) {
    return {
      destination: newDest.destination,
      image: newDest.image,
      alt: newDest.alt,
      travelers: newTrip.travelers,
      date: newTrip.date,
      duration: newTrip.duration,
      status: newTrip.status,
    }
}

function calculateTotalSpent(travelerTrips, destinations) {
  let totalCost = 0;

  travelerTrips.forEach((trip) => {
    const destination = destinations.find(
      (dest) => dest.id === trip.destinationID
    );
    const tripFlightCost =
      destination.estimatedFlightCostPerPerson * trip.travelers;
    const tripLodgingCost =
      destination.estimatedLodgingCostPerDay * trip.duration;

    totalCost += tripFlightCost + tripLodgingCost;
  });

  return totalCost;
}

function calculateSingleTripCost(
  destinationID,
  numTravelers,
  numDays,
  destinations
) {
  const destination = destinations.find((dest) => dest.id === destinationID);

  const tripFlightCost =
    destination.estimatedFlightCostPerPerson * numTravelers;
  const tripLodgingCost = destination.estimatedLodgingCostPerDay * numDays;

  const costBeforeAgentFee = tripFlightCost + tripLodgingCost;
  const singleTripCost = costBeforeAgentFee + costBeforeAgentFee * 0.1;

  return singleTripCost;
}

export { calculateSingleTripCost };
export { travelerDashboardData, processTrips, processNewTrip };
