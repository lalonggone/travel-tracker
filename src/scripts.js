// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

import { getAllData } from './apiCalls';
import { updateWelcomeTitle, clearTripContainers, addTripToContainer, checkAndDisplayEmptyMessage } from './domUpdates';

let currentTraveler;

document.addEventListener('DOMContentLoaded', () => {
    // replace ID with actual login...
    const currentTravelerId = 27;

    getAllData().then(data => {
        const { travelers, trips, destinations } = data;
        
        currentTraveler = travelers.find(traveler => traveler.id === currentTravelerId);
        // console.log('currentTraveler', currentTraveler)
        const travelerTrips = trips.filter(trip => trip.userID === currentTravelerId);
        // console.log('travelerTrips', travelerTrips)
        updateWelcomeTitle(currentTraveler.name);
        clearTripContainers();

        travelerTrips.forEach(trip => {
            const destination = destinations.find(dest => dest.id === trip.destinationID);
            console.log("DESTINATION", destination)
            const tripWithDetails = {
                destination: destination.destination,
                image: destination.image,
                alt: destination.alt,
                travelers: trip.travelers,
                date: trip.date,
                duration: trip.duration,
                status: trip.status
            };
            // console.log(tripWithDetails)

            if (trip.status === 'approved') {
                addTripToContainer(tripWithDetails, '.approved-trips-container');
                addTripToContainer(tripWithDetails, '.past-trips-container');
            } else if (trip.status === 'pending') {
                addTripToContainer(tripWithDetails, '.pending-trips-container');
            } else {
            }

        checkAndDisplayEmptyMessage('.pending-trips-container', 'pending');
        checkAndDisplayEmptyMessage('.past-trips-container', 'past');
        checkAndDisplayEmptyMessage('.approved-trips-container', 'upcoming');
        });
    });
});