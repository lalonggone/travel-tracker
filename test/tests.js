import { expect } from 'chai';
import { processTrips, calculateTotalTripCost } from './functions';

describe('Travel Tracker Functions', function() {
    let travelerTrips;
    let processedTrips;
    let totalCost;
    let sampleDestinations;
    let sampleTrips;
    let sampleTravelers;
    const currentTravelerId = 1;

    beforeEach(() => {
      sampleDestinations = [
          { id: 1, destination: "Paris, France", estimatedLodgingCostPerDay: 150, estimatedFlightCostPerPerson: 300, image: "https://example.com/paris.jpg", alt: "Eiffel Tower at sunset" },
          { id: 2, destination: "Tokyo, Japan", estimatedLodgingCostPerDay: 200, estimatedFlightCostPerPerson: 700, image: "https://example.com/tokyo.jpg", alt: "Shibuya Crossing from above" },
          { id: 3, destination: "New York, USA", estimatedLodgingCostPerDay: 250, estimatedFlightCostPerPerson: 200, image: "https://example.com/newyork.jpg", alt: "Statue of Liberty with skyline" }
      ];

      sampleTrips = [
          { id: 1, userID: 1, destinationID: 1, travelers: 2, date: "2023-04-15", duration: 7, status: "approved", suggestedActivities: [] },
          { id: 2, userID: 1, destinationID: 2, travelers: 1, date: "2023-05-10", duration: 5, status: "approved", suggestedActivities: [] },
          { id: 3, userID: 2, destinationID: 3, travelers: 4, date: "2023-07-20", duration: 10, status: "pending", suggestedActivities: [] }
      ];

      sampleTravelers = [
        { id: 1, name: "Alice Johnson", travelerType: "thrill-seeker" },
        { id: 2, name: "Bob Smith", travelerType: "photographer" },
        { id: 3, name: "Charlie Brown", travelerType: "foodie" }
    ]

      travelerTrips = sampleTrips.filter(trip => trip.userID === currentTravelerId);
      console.log(travelerTrips);
      console.log(sampleDestinations);
      
      processedTrips = processTrips(travelerTrips, sampleDestinations);
      totalCost = calculateTotalTripCost(travelerTrips, sampleDestinations);
    });

    describe('processTrips function', function() {
      it('should process trips and destinations into an organized array of ojects', function() {
          expect(processedTrips).to.be.an('array')
          expect(processedTrips[0].destination).to.equal('Paris, France')
          expect(processedTrips[0].status).to.equal("approved")
          expect(processedTrips[0].travelers).to.equal(2)
      });
    })

    describe('calculateCost function', function() {
      it('should calculate total cost of all traveler\'s trips', function() {
          expect(totalCost).to.be.a('number')
          expect(totalCost).to.equal(3350)
      })
    })
});
