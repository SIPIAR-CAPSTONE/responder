import moment from "moment";

/*
 *
 * get the time gap between the given date and the current date
 *
 *
 */
const getTimeGap = (datetimeCreated, isFormatted = true) => {
  const createdDate = moment(datetimeCreated).toDate();
  const currentDate = moment().toDate();

  const MILLISECONDS_IN_A_MINUTE = 1000 * 60;
  const MILLISECONDS_IN_AN_HOUR = MILLISECONDS_IN_A_MINUTE * 60;
  const MILLISECONDS_IN_A_DAY = MILLISECONDS_IN_AN_HOUR * 24;
  const MILLISECONDS_IN_A_MONTH = MILLISECONDS_IN_A_DAY * 30;

  const differenceInMillis = Math.abs(currentDate - createdDate);

  const monthsDifference = Math.floor(
    differenceInMillis / MILLISECONDS_IN_A_MONTH
  );
  const daysDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_A_MONTH) / MILLISECONDS_IN_A_DAY
  );
  const hoursDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_A_DAY) / MILLISECONDS_IN_AN_HOUR
  );
  const minutesDifference = Math.floor(
    (differenceInMillis % MILLISECONDS_IN_AN_HOUR) / MILLISECONDS_IN_A_MINUTE
  );

  if (isFormatted) {
    return formatTimeGap(
      monthsDifference,
      daysDifference,
      hoursDifference,
      minutesDifference
    );
  }

  return [monthsDifference, daysDifference, hoursDifference, minutesDifference];
};

//format: "1 month ago"
const formatTimeGap = (months, days, hours, minutes) => {
  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
};

/*
 *
 *
 *  the distance between user device location and the given selected location
 *
 *
 */
function getDistanceGap(userCoordinate, selectedCoordinate) {
  //handle empty or falsy coordiantes
  if (
    isInvalidCoordinate(userCoordinate) ||
    isInvalidCoordinate(selectedCoordinate)
  ) {
    return " - ";
  }

  const EARTH_RADIUS_KM = 6371;
  const userLatRadians = toRadians(userCoordinate.latitude);
  const userLonRadians = toRadians(userCoordinate.longitude);
  const selectedLatRadians = toRadians(selectedCoordinate.latitude);
  const selectedLonRadians = toRadians(selectedCoordinate.longitude);

  const deltaLat = selectedLatRadians - userLatRadians;
  const deltaLon = selectedLonRadians - userLonRadians;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(userLatRadians) *
      Math.cos(selectedLatRadians) *
      Math.sin(deltaLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distanceKm = EARTH_RADIUS_KM * c;

  return formatDistance(distanceKm);
}

/*
 *
 * getDistanceGap helper function
 *
 */
//check if user or selected coordinates are empty or falsy
const isInvalidCoordinate = (coordinate) => {
  return (
    !coordinate ||
    (typeof coordinate === "object" && Object.keys(coordinate).length === 0)
  );
};

//convert degrees to radians
const toRadians = (degrees) => degrees * (Math.PI / 180);

// Function to format the distance into a human-readable string
const formatDistance = (distanceKm) => {
  return distanceKm >= 1
    ? `${distanceKm.toFixed(1)} km`
    : `${(distanceKm * 1000).toFixed(0)} m`;
};

export { getTimeGap, getDistanceGap };
