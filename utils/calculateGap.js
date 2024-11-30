import { convertDistance, getPreciseDistance } from "geolib";
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
  //handle empty or falsy coordinates
  if (
    isInvalidCoordinate(userCoordinate) ||
    isInvalidCoordinate(selectedCoordinate)
  ) {
    return " - ";
  }

  const gapDistance = getPreciseDistance(userCoordinate, selectedCoordinate);
  const distanceLength = String(gapDistance).length;
  const formattedGapDistance =
    distanceLength > 2
      ? `${convertDistance(gapDistance, "km").toFixed(1)} km`
      : `${gapDistance} m`;

  return formattedGapDistance;
}

//check if user or selected coordinates are empty or falsy
const isInvalidCoordinate = (coordinate) => {
  return (
    !coordinate ||
    (typeof coordinate === "object" && Object.keys(coordinate).length === 0)
  );
};

export { getTimeGap, getDistanceGap };
