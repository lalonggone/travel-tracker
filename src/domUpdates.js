function updateWelcomeTitle(name) {
    const welcomeTitle = document.querySelector('.welcome-title');
    welcomeTitle.textContent = `Welcome, ${name}`;
}

function clearTripContainers() {
    document.querySelector('.past-trips-container').innerHTML = '';
    document.querySelector('.approved-trips-container').innerHTML = '';
    document.querySelector('.pending-trips-container').innerHTML = '';
}

function addTripToContainer(trip, containerClass) {
    const container = document.querySelector(containerClass);
    const tripArticle = document.createElement('article');
    tripArticle.classList.add('card');
    tripArticle.innerHTML = `
        <h3 class="card-destination">${trip.destination}</h3>
        <img class="card-image" src="${trip.image}" alt="${trip.alt}">
        <p class="card-travelers">${trip.travelers} travelers</p>
        <p class="card-date">${trip.date}</p>
        <p class="card-duration">${trip.duration} days</p>
        <p class="card-status">${trip.status}</p>
    `;
    container.appendChild(tripArticle);
}

function checkAndDisplayEmptyMessage(containerClass, tripType) {
    const container = document.querySelector(containerClass);
    if (container.children.length === 0) { 
        console.log(container.children.length)
        const messageElement = document.createElement('p');
        messageElement.textContent = `You have no ${tripType} trips.`;
        container.appendChild(messageElement);
    }
}

// find the destination... if the destination.id === trip.id

// function calculateTotalTripCost(trips, destinations) {
//     const destination = 
// }

export { updateWelcomeTitle, clearTripContainers, addTripToContainer, checkAndDisplayEmptyMessage };