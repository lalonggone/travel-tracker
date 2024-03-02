// this is where the magic happens :)

import './css/styles.scss';
import { getAllData } from './apiCalls';
import { 
    updateWelcomeTitle, 
    clearTripContainers, 
    addTripToContainer, 
    checkAndDisplayEmptyMessage,
    displayTotalCost, } from './domUpdates';

let currentTraveler;

document.addEventListener('DOMContentLoaded', () => {
    // replace ID with actual login...
    const currentTravelerId = 45;

    getAllData().then(data => {
        const { travelers, trips, destinations } = data;
        currentTraveler = travelers.find(traveler => traveler.id === currentTravelerId)
        
        updateWelcomeTitle(currentTraveler.name);
        clearTripContainers();
        
        const travelerTrips = trips.filter(trip => trip.userID === currentTravelerId);
        const processedTrips = processTrips(travelerTrips, destinations);
        const totalCost = calculateTotalTripCost(travelerTrips, destinations);
        
        processedTrips.forEach(processedTrip => {
            if (processedTrip.status === 'approved') {
                addTripToContainer(processedTrip, '.approved-trips-container');
            } else if (processedTrip.status === 'pending') {
                addTripToContainer(processedTrip, '.pending-trips-container');
            } else {
                addTripToContainer(processedTrip, '.past-trips-container');
            }
        });

        displayTotalCost(totalCost)
        checkAndDisplayEmptyMessage('.pending-trips-container', 'pending');
        checkAndDisplayEmptyMessage('.past-trips-container', 'past');
        checkAndDisplayEmptyMessage('.approved-trips-container', 'upcoming');
    });
});

function processTrips(travelerTrips, destinations) {
    return travelerTrips.map(trip => {
        const destination = destinations.find(dest => dest.id === trip.destinationID);
        return {
            destination: destination.destination,
            image: destination.image,
            alt: destination.alt,
            travelers: trip.travelers,
            date: trip.date,
            duration: trip.duration,
            status: trip.status
        };
    });
}

function calculateTotalTripCost(travelerTrips, destinations) {
    let totalCost = 0;

    travelerTrips.forEach(trip => {
        const destination = destinations.find(dest => dest.id === trip.destinationID);

            const tripFlightCost = destination.estimatedFlightCostPerPerson * trip.travelers;
            const tripLodgingCost = destination.estimatedLodgingCostPerDay * trip.duration;
            // console.log(tripFlightCost, tripLodgingCost);

            totalCost += tripFlightCost + tripLodgingCost;
    });

    return totalCost; 
}

