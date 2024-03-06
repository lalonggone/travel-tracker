 import { travelerDashboardData, processTrips } from "./scripts";

const applicationContainer = document.querySelector(".application-container");

function renderInvalidLogin() {
  const invalidLoginSection = document.querySelector(".invalid-login-section");
  invalidLoginSection.innerHTML = `<p class="invalid-login-message">invalid login</p>`

  setTimeout(() => {
    invalidLoginSection.remove();
  }, 1000000);
}

function renderDashboard(data) {
  clearLogin();
  renderDashboardHeader(data.name, data.totalSpent);
  renderBookingForm(data.destinations);
  setupTripSections();
  renderTripsToSections(data)
  
  
  }

  function clearLogin() {
    const loginForm = document.querySelector(".login-form");
    loginForm.remove();
  }
  
  function renderDashboardHeader(username, totalSpent) {
    const header = document.createElement("header");
    header.classList.add("dashboard-header");
    header.innerHTML = `
        <h1 class="header-title">TRAVEL TRACKER</h1>
        <section class="header-right">
          <h2 class="welcome-title">${username}'s personal</h2>
          <h3 class="total-spent">You've spent $${totalSpent} on traveling the world!</h3>
        </section>
        <div class="blur-overlay"></div>
    `;
    applicationContainer.appendChild(header);
  }

  function renderBookingForm(data) {
    const bookingSection = document.createElement('section');
    bookingSection.id = 'book-trip-container';
    bookingSection.className = 'book-trip-section';
    bookingSection.innerHTML = `
        <h2 class="booking-title">PLAN YOUR NEXT ADVENTURE</h2>
        <form id="book-trip-form" class="form">
            <div class="booking-sections">
                <label for="destinationMenu">Select destination:
                    <select required class="input" name="destination-menu" id="destinationMenu">
                        <option value="0">Select destination</option>
                    </select>
                </label>
            </div>
            <div class="booking-sections">
                <label for="startDateMenu">Departure date:
                    <input required class="input" name="start-date-menu" id="startDateMenu" type="date" min="2019-01-01" max="2030-12-31">
                </label>
            </div>
            <div class="booking-sections">
                <label for="durationInput">Duration of trip:
                    <input required class="input" name="duration-input" id="durationInput" type="number" min="1" placeholder="days">
                </label>
            </div>
            <div class="booking-sections">
                <label for="travelersInput">Number of travelers:
                    <input required class="input" name="travelers-input" id="travelersInput" type="number" min="1" placeholder="travlers">
                </label>
            </div>
            <div class="booking-btns">
                <button class="cost-button" id="costBtn" type="button">Estimate Trip Cost</button>
                <button class="book-button" id="bookBtn" type="button">Book Trip</button>
            </div>
        </form>
    `;
    applicationContainer.appendChild(bookingSection);
  
    populateDestinationOptions(data);
    setupFormEventListeners();
  }

  function setupTripSections() {
    applicationContainer.appendChild(
      createTripSection("YOUR PAST TRIPS", "past-trips-container")
    );
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
    addTripsToContainer(organizedTrips.past, "past-trips-container");
  }



function populateDestinationOptions(data) {
  const destinations = data
  
  const destinationMenu = document.getElementById('destinationMenu');
  destinations.forEach(destination => {
      const option = document.createElement('option');
      option.value = destination.id;
      option.textContent = destination.name;
      destinationMenu.appendChild(option);
  });
}

function setupFormEventListeners() {
  const costBtn = document.getElementById('costBtn');
  const bookBtn = document.getElementById('bookBtn');

  // costBtn.addEventListener('click', estimateTripCost);
  // bookBtn.addEventListener('click', bookTrip); 
}

function addTripsToContainer(trips, containerClass) {
  const container = document.querySelector("." + containerClass);

  container.innerHTML = "";

  if (trips.length === 0){
    const noTripsMessage = document.createElement("p");
    noTripsMessage.classList.add("no-trips-message");

    const tripType = containerClass.split('-')[0];
    console.log(tripType);
    noTripsMessage.textContent = `You have no ${tripType} trips.`
    container.appendChild(noTripsMessage)
  } else {
  trips.forEach((trip) => {
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
  });
}
}

function createTripSection(title, containerClass) {
  const sectionElement = document.createElement("section");
  sectionElement.className = "trip-section"
  
  const header = document.createElement("h2");
  header.className = "trip-header"
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
    past: [],
  };

  trips.forEach((trip) => {
    if (trip.status === "approved") {
      organizedTrips[trip.status].push(trip);
    } else if (trip.status === "pending") {
      organizedTrips[trip.status].push(trip);
    } else {
      organizedTrips["past"].push(trip);
    }
  });

  return organizedTrips;
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
      fillOutAllFields();
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
    ".booking-title").innerText = `Trip Booked! Awaiting agent approval`;
}

function fillOutAllFields() {
  document.querySelector(
    ".booking-title"
  ).innerText = `Please fill out all form fields!`;
}

function clearTripContainers() {
  document.querySelector(".past-trips-container").innerHTML = "";
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
  updateWelcomeTitle,
  buildBookingSection,
  singleTripCostButton,
  bookTripButton,
  successfulTripBooked,
  fillOutAllFields,
  clearTripContainers,
  checkAndDisplayEmptyMessage,
  displayTotalCost,
};
