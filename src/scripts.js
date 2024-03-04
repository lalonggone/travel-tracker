// this is where the magic happens :)

import "./css/styles.scss";
import { getAllData } from "./apiCalls";
import {
  renderInvalidLogin,
  renderDashboard,
  updateWelcomeTitle,
  buildBookingSection,
  singleTripCostButton,
  bookTripButton,
  clearTripContainers,
  addTripToContainer,
  checkAndDisplayEmptyMessage,
  displayTotalCost,
} from "./domUpdates";


document.addEventListener("DOMContentLoaded", () => {
  logIn()
});

function logIn() {
  const logInButton = document.querySelector('#login-button')
  
  logInButton.addEventListener("click", (event) => {
    event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const travelerId = +username.match(/\d+/)[0];
      
      getAllData().then((data) => {
        let { travelers } = data
        const currentTraveler = travelers.find(traveler => traveler.id === travelerId)
        if(currentTraveler && password === 'travel'){
          travelerDashboardData(currentTraveler)
          
        } else {
          renderInvalidLogin()
        }
      })
    });
  }
  
  function travelerDashboardData(currentTraveler) {
    const dashboardData = {
      name: currentTraveler.name
    }
    getAllData().then((data) => {
      const { travelers, trips, destinations } = data
      const currentTravelerTrips = travelerTrips(currentTraveler.id, trips)

      dashboardData.trips = currentTravelerTrips
      dashboardData.totalSpent = calculateTotalSpent(currentTravelerTrips, destinations)
      renderDashboard(dashboardData)
  }
)}

function travelerTrips(userID, trips) {
  travelerTrips = trips.filter(
    (trip) => trip.userID === userID
  )
  return travelerTrips
}

document.addEventListener("balm", () => {
  getAllData().then((data) => {
    const { travelers, trips, destinations } = data;
    currentTraveler = travelers.find(
      (traveler) => traveler.id === currentTravelerId
    );

    updateWelcomeTitle(currentTraveler.name);
    clearTripContainers();

    const processedTrips = processTrips(travelerTrips, destinations);
    const totalCost = calculateTotalTripCost(travelerTrips, destinations);

    processedTrips.forEach((processedTrip) => {
      if (processedTrip.status === "approved") {
        addTripToContainer(processedTrip, ".approved-trips-container");
      } else if (processedTrip.status === "pending") {
        addTripToContainer(processedTrip, ".pending-trips-container");
      } else {
        addTripToContainer(processedTrip, ".past-trips-container");
      }
    });

    logIn()
    displayTotalCost(totalCost);
    buildBookingSection(destinations);
    singleTripCostButton(destinations);
    bookTripButton();
    checkAndDisplayEmptyMessage(".pending-trips-container", "pending");
    checkAndDisplayEmptyMessage(".past-trips-container", "past");
    checkAndDisplayEmptyMessage(".approved-trips-container", "upcoming");
  });
});

// function processTrips(travelerTrips, destinations) {
//   return travelerTrips.map((trip) => {
//     const destination = destinations.find(
//       (dest) => dest.id === trip.destinationID
//     );
//     return {
//       destination: destination.destination,
//       image: destination.image,
//       alt: destination.alt,
//       travelers: trip.travelers,
//       date: trip.date,
//       duration: trip.duration,
//       status: trip.status,
//     };
//   });
// }

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

// function calculateSingleTripCost(
//   destinationID,
//   numTravelers,
//   numDays,
//   destinations
// ) {
//   const destination = destinations.find((dest) => dest.id === destinationID);

//   const tripFlightCost =
//     destination.estimatedFlightCostPerPerson * numTravelers;
//   const tripLodgingCost = destination.estimatedLodgingCostPerDay * numDays;

//   const costBeforeAgentFee = tripFlightCost + tripLodgingCost;
//   const totalCost = costBeforeAgentFee + costBeforeAgentFee * 0.1;

//   return totalCost;
// }

// export { calculateSingleTripCost, currentTravelerId };
export { travelerDashboardData };
