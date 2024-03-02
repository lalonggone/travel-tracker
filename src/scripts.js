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
        const processedDestinations = processDestinations(travelerTrips, destinations);
        const totalCost = calculateTotalTripCost(travelerTrips, processedDestinations);
        
        processedDestinations.forEach(tripWithDetails => {
            if (tripWithDetails.status === 'approved') {
                addTripToContainer(tripWithDetails, '.approved-trips-container');
            } else if (tripWithDetails.status === 'pending') {
                addTripToContainer(tripWithDetails, '.pending-trips-container');
            } else {
                addTripToContainer(tripWithDetails, '.past-trips-container');
            }
        });

        displayTotalCost(totalCost)
        checkAndDisplayEmptyMessage('.pending-trips-container', 'pending');
        checkAndDisplayEmptyMessage('.past-trips-container', 'past');
        checkAndDisplayEmptyMessage('.approved-trips-container', 'upcoming');
    });
});

function processDestinations(travelerTrips, destinations) {
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

function calculateTotalTripCost(travelerTrips, processedDestinations) {



}
