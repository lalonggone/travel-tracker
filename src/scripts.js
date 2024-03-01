// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


import { getAllData } from "./apiCalls";

getAllData()



function categorizeTrips(trips, currentDate) {
    const pastTrips = [];
    const upcomingTrips = [];
    const pendingTrips = [];

    trips.forEach(trip => {
        const tripDate = new Date(trip.date);
        if (tripDate < currentDate) {
            pastTrips.push(trip);
        } else if (tripDate > currentDate) {
            upcomingTrips.push(trip);
        } else {
            pendingTrips.push(trip);
        }
    });

    return { pastTrips, upcomingTrips, pendingTrips };
}
