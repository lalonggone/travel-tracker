import { calculateSingleTripCost, processTrips } from "./scripts";
import { postTrip, nextTripId } from "./apiCalls";

const applicationContainer = document.querySelector(".application-container");

function renderInvalidLogin() {
  const invalidLoginSection = document.querySelector(".invalid-login-section");
  invalidLoginSection.innerHTML = `<p class="invalid-login-message">invalid login</p>`;

  setTimeout(() => {
    invalidLoginSection.innerHTML = "";
  }, 3000);
}

function renderDashboard(data) {
  clearLogin();
  renderDashboardHeader(data.name, data.totalSpent);
  renderBookingForm(data);
  setupTripSections();
  renderTripsToSections(data);
}

function clearLogin() {
  const loginForm = document.querySelector(".login-form");
  loginForm.remove();
}

function renderDashboardHeader(username, totalSpent) {
  const header = document.createElement("header");
  header.classList.add("dashboard-header");
  header.setAttribute("role", "banner");
  header.innerHTML = `
        <h1 class="header-title">TRAVEL TRACKER</h1>
        <section class="header" aria-label="user information">
          <h2 class="welcome-title">${username}'s personal</h2>
          <h3 class="total-spent">You've spent $${totalSpent} traveling the world</h3>
        </section>
        <div class="blur-overlay"></div>
    `;
  applicationContainer.appendChild(header);
}

function renderBookingForm(data) {
  const bookingSection = document.createElement("section");
  bookingSection.id = "book-trip-container";
  bookingSection.className = "book-trip-section";
  bookingSection.innerHTML = `
        <h2 class="booking-title">PLAN YOUR NEXT ADVENTURE</h2>
        <form id="book-trip-form" class="form" aria-label="Book your trip">
            <div class="booking-sections" role="group" aria-labelledby="destLabel">
                <label for="destinationMenu">Select destination:
                    <select required class="input" name="destination-menu" id="destinationMenu" aria-haspopup="listbox">
                        <option value="0">Select destination</option>
                    </select>
                </label>
            </div>
            <div class="booking-sections" role="group" aria-labelledby="startDateLabel">
                <label for="startDateMenu">Departure date:
                    <input required class="input" name="start-date-menu" id="startDateMenu" type="date" min="2019-01-01" max="2030-12-31">
                </label>
            </div>
            <div class="booking-sections" role="group" aria-labelledby="durationLabel">
                <label for="durationInput">Duration of trip:
                    <input required class="input" name="duration-input" id="durationInput" type="number" min="1" placeholder="days">
                </label>
            </div>
            <div class="booking-sections" role="group" aria-labelledby="travelersLabel">
                <label for="numTravelersInput">Number of travelers:
                    <input required class="input" name="travelers-input" id="numTravelersInput" type="number" min="1" placeholder="travlers">
                </label>
            </div>
            <div class="booking-btns">
                <button class="cost-button" id="costBtn" type="button" role="button">Estimate Trip Cost</button>
                <button class="book-button" id="bookBtn" type="button" role="button">Book Trip</button>
            </div>
        </form>
    `;
  applicationContainer.appendChild(bookingSection);

  populateDestinationOptions(data.destinations);
  setupFormEventListeners(data);
}

function setupTripSections() {
  applicationContainer.appendChild(
    createTripSection("YOUR UPCOMING TRIPS", "approved-trips-container")
  );
  applicationContainer.appendChild(
    createTripSection("YOUR PENDING TRIPS", "pending-trips-container")
  );
}

function renderTripsToSections(data) {
  const organizedTrips = organizeTrips(
    processTrips(data.trips, data.destinations)
  );

  renderTrips(organizedTrips);
}

function renderTrips(organizedTrips) {
  addTripsToContainer(organizedTrips.approved, "approved-trips-container");
  addTripsToContainer(organizedTrips.pending, "pending-trips-container");
}

function populateDestinationOptions(data) {
  const destinations = data;

  const destinationMenu = document.getElementById("destinationMenu");
  destinations.forEach((destination) => {
    const option = document.createElement("option");
    option.value = destination.id;
    if (destination.destination.length > 20) {
      const parts = destination.destination.split(", ");
      option.textContent =
        parts.length > 1 ? parts[parts.length - 1] : destination.destination;
    } else {
      option.textContent = destination.destination;
    }
    destinationMenu.appendChild(option);
  });
}

function setupFormEventListeners(data) {
  const costBtn = document.getElementById("costBtn");
  const bookBtn = document.getElementById("bookBtn");

  costBtn.addEventListener("click", () =>
    singleTripCostButton(data.destinations)
  );
  bookBtn.addEventListener("click", () => bookTripButton(data));
}

function addTripsToContainer(trips, containerClass) {
  const container = document.querySelector("." + containerClass);

  container.innerHTML = "";

  if (trips.length === 0) {
    const noTripsMessage = document.createElement("p");
    noTripsMessage.classList.add("no-trips-message");

    const tripType = containerClass.split("-")[0];
    noTripsMessage.textContent = `You have no ${tripType} trips.`;
    container.appendChild(noTripsMessage);
  } else {
    trips.forEach((trip) => {
      const tripArticle = document.createElement("article");
      tripArticle.classList.add("card");
      tripArticle.innerHTML = `
          <h3 class="card-destination">${trip.destination}</h3>
          <div class="image-container">
            <img class="card-image" src="${trip.image}" alt="${trip.alt}">
          </div>
          <p class="card-travelers">${trip.travelers} travelers</p>
          <p class="card-date">${trip.date}</p>
          <p class="card-duration">${trip.duration} days</p>
      `;
      container.appendChild(tripArticle);
    });
  }
}

function createTripSection(title, containerClass) {
  const sectionElement = document.createElement("section");
  sectionElement.className = "trip-section";

  const header = document.createElement("h2");
  header.className = "trip-header";
  header.textContent = title;

  const containerDiv = document.createElement("div");
  containerDiv.className = containerClass;

  sectionElement.appendChild(header);
  sectionElement.appendChild(containerDiv);

  return sectionElement;
}

function organizeTrips(trips) {
  const organizedTrips = {
    approved: [],
    pending: [],
  };

  trips.forEach((trip) => {
    if (trip.status === "approved") {
      organizedTrips[trip.status].push(trip);
    } else if (trip.status === "pending") {
      organizedTrips[trip.status].push(trip);
    }
  });

  return organizedTrips;
}

function buildBookingSection(destinations) {
  let menu = document.querySelector("#destinationMenu");
  destinations.forEach((place) => {
    const optionElement = `<option value="${place.id}">${place.destination}</option>`;

    menu.insertAdjacentHTML("beforeend", optionElement);
  });
}

function getBookingInputs() {
  const destinationID = +document.getElementById("destinationMenu").value;
  const numDays = +document.getElementById("durationInput").value;
  const numTravelers = +document.getElementById("numTravelersInput").value;

  return [destinationID, numDays, numTravelers];
}

function singleTripCostButton(destinations) {
  // DESTRUCTURING.. this is how to use the return val in HERE from the helper funtion out THERE
  const [destinationID, numDays, numTravelers] = getBookingInputs();

  if (destinationID && numDays > 0 && numTravelers > 0) {
    const singleTripCost = calculateSingleTripCost(
      destinationID,
      numTravelers,
      numDays,
      destinations
    );
    displayTripCost(singleTripCost);
  } else {
    fillOutAllFields();
  }
}

function displayTripCost(cost) {
  const container = document.querySelector("#book-trip-container");
  const costElement = document.createElement("h2");
  costElement.classList.add("estimated-cost");
  costElement.textContent = `Estimated Trip Cost: $${cost.toFixed(2)}`;

  const previousCost = container.querySelector(".estimated-cost");
  if (previousCost) {
    container.removeChild(previousCost);
  }
  container.appendChild(costElement);
}

function bookTripButton(data) {
  const [destinationID, numDays, numTravelers] = getBookingInputs();

  if (destinationID && numDays > 0 && numTravelers > 0) {
    processPostTripData(data);
    successfulTripBooked();
  } else {
    fillOutAllFields();
  }
}

function processPostTripData(data) {
  const tripData = {
    id: nextTripId,
    userID: data.travelerId,
    destinationID: +document.getElementById("destinationMenu").value,
    travelers: +document.getElementById("numTravelersInput").value,
    date: document.getElementById("startDateMenu").value.replace(/-/g, "/"),
    duration: +document.getElementById("durationInput").value,
    status: "pending",
    suggestedActivities: [],
  };
  postTrip(tripData);
}

function successfulTripBooked() {
  document.querySelector(
    ".booking-title"
  ).innerText = `Trip Booked! Awaiting agent approval`;
}

function fillOutAllFields() {
  document.querySelector(
    ".booking-title"
  ).innerText = `Please fill out all form fields!`;
}

function clearTripContainers() {
  document.querySelector(".approved-trips-container").innerHTML = "";
  document.querySelector(".pending-trips-container").innerHTML = "";
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
  renderInvalidLogin,
  renderDashboard,
  buildBookingSection,
  singleTripCostButton,
  bookTripButton,
  successfulTripBooked,
  fillOutAllFields,
  clearTripContainers,
  checkAndDisplayEmptyMessage,
  displayTotalCost,
};
