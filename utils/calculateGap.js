import moment from "moment";
import { convertDistance, getPreciseDistance } from "geolib";

//* get the time gap between the given date and the current date
const getTimeGap = (datetimeCreated) => {
  if (!datetimeCreated) return " ";

  return moment(datetimeCreated).fromNow();
};

//* the distance between user device location and the given selected location coordinate
function getDistanceGap(userCoordinate, selectedCoordinate) {
  //handle empty or falsy coordiantes
  if (
    isInvalidCoordinate(userCoordinate) ||
    isInvalidCoordinate(selectedCoordinate)
  ) {
    return " - ";
  }

  const gapDistance = getPreciseDistance(userCoordinate, selectedCoordinate, 2);
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
    !coordinate.longitude ||
    !coordinate.latitude ||
    (typeof coordinate === "object" && Object.keys(coordinate).length === 0)
  );
};

const objectIsFalsy = (obj) => {
  return !Object.keys(obj).some(function (k) {
    return obj[k];
  });
};

export { getDistanceGap, getTimeGap, objectIsFalsy };
