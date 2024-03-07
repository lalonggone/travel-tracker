function processTrips(travelerTrips, destinations) {
  return travelerTrips.map((trip) => {
    const destination = destinations.find(
      (dest) => dest.id === trip.destinationID
    );
    return {
      destination: destination.destination,
      image: destination.image,
      alt: destination.alt,
      travelers: trip.travelers,
      date: trip.date,
      duration: trip.duration,
      status: trip.status,
    };
  });
}

function calculateTotalTripCost(travelerTrips, destinations) {
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

function calculateSingleTripCost(
  destinationID,
  numTravelers,
  numDays,
  destinations
) {
  const destination = destinations.find((dest) => dest.id === destinationID);

  const tripFlightCost =
    destination.estimatedFlightCostPerPerson * numTravelers;
  const tripLodgingCost = destination.estimatedLodgingCostPerDay * numDays;

  const costBeforeAgentFee = tripFlightCost + tripLodgingCost;
  const singleTripCost = costBeforeAgentFee + costBeforeAgentFee * 0.1;

  return singleTripCost;
}

export { processTrips, calculateTotalTripCost, calculateSingleTripCost };
