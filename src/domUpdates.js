// function definitions that update the elusive 'DOM'
// later called in scrips.js

import { calculateSingleTripCost, currentTravelerId } from "./scripts";
import { postTrip, nextTripId } from "./apiCalls";

function logIn() {
  const logInButton = document.querySelector('#login-button')

  logInButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("inputStuff")
  })
  // if username contains traveler.id then that is the cuurent traveler
  // and password must === travel
  // else display 'invalid log in'
}

function updateWelcomeTitle(name) {
  const welcomeTitle = document.querySelector(".welcome-title");
  welcomeTitle.textContent = `Welcome, ${name}`;
}

function buildBookingSection(destinations) {
  let menu = document.querySelector("#destinationMenu");
  destinations.forEach((place) => {
    const optionElement = `<option value="${place.id}">${place.destination}</option>`;

    menu.insertAdjacentHTML("beforeend", optionElement);
  });
}

function singleTripCostButton(destinations) {
  const estimateCostBtn = document.getElementById("costBtn");

  estimateCostBtn.addEventListener("click", () => {
    console.log(currentTravelerId);
    const destinationID = +document.getElementById("destinationMenu").value;
    const numDays = +document.getElementById("durationInput").value;
    const numTravelers = +document.getElementById("travelersInput").value;

    if (destinationID && numDays > 0 && numTravelers > 0) {
      const singleTripCost = calculateSingleTripCost(
        destinationID,
        numTravelers,
        numDays,
        destinations
      );
      const container = document.querySelector("#book-trip-container");
      const costElement = document.createElement("h2");
      costElement.classList.add("estimated-cost");
      costElement.textContent = `Estimated Trip Cost: $${singleTripCost}`;

      const previousCost = container.querySelector(".estimated-cost");
      if (previousCost) {
        container.removeChild(previousCost);
      }
      container.appendChild(costElement);
    } else {
      document.querySelector(
        ".booking-title"
      ).innerText = `Please fill out all form fields!`;
    }
  });
}

function bookTripButton() {
  const bookTripButton = document.getElementById("bookBtn");

  bookTripButton.addEventListener("click", () => {
    const tripId = nextTripId;
    const travelerId = currentTravelerId;
    const destinationID = +document.getElementById("destinationMenu").value;
    const numTravelers = +document.getElementById("travelersInput").value;
    const date = document
      .getElementById("startDateMenu")
      .value.replace(/-/g, "/");
    const numDays = +document.getElementById("durationInput").value;

    postTrip(tripId, travelerId, destinationID, numTravelers, date, numDays);
  });
}

function successfulTripBooked() {
  document.querySelector(
    ".booking-title"
  ).innerText = `Trip Booked! Awaiting agent approval`;
}

function clearTripContainers() {
  document.querySelector(".past-trips-container").innerHTML = "";
  document.querySelector(".approved-trips-container").innerHTML = "";
  document.querySelector(".pending-trips-container").innerHTML = "";
}

function addTripToContainer(trip, containerClass) {
  const container = document.querySelector(containerClass);
  const tripArticle = document.createElement("article");
  tripArticle.classList.add("card");
  tripArticle.innerHTML = `
        <h3 class="card-destination">${trip.destination}</h3>
        <img class="card-image" src="${trip.image}" alt="${trip.alt}">
        <p class="card-travelers">${trip.travelers} travelers</p>
        <p class="card-date">${trip.date}</p>
        <p class="card-duration">${trip.duration} days</p>                                                                                                                                                                                                                                                                                                                                                                                                                  
    `;
  container.appendChild(tripArticle);
}

function checkAndDisplayEmptyMessage(containerClass, tripType) {
  const container = document.querySelector(containerClass);
  if (container.children.length === 0) {
    const messageElement = document.createElement("p");
    messageElement.textContent = `You have no ${tripType} trips.`;
    container.appendChild(messageElement);
  }
}

function displayTotalCost(totalCost) {
  const costDisplayElement = document.querySelector(".total-spent");
  costDisplayElement.textContent = `You've spent $${totalCost} on traveling the world!`;
}

export {
  logIn,
  updateWelcomeTitle,
  buildBookingSection,
  singleTripCostButton,
  bookTripButton,
  successfulTripBooked,
  clearTripContainers,
  addTripToContainer,
  checkAndDisplayEmptyMessage,
  displayTotalCost,
};
