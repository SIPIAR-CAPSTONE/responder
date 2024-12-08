import { useState } from "react";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { ToastAndroid } from "react-native";

export default function useMapDirection() {
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  const fetchRoute = async (origin, destination) => {
    if (
      origin?.latitude &&
      origin?.longitude &&
      destination?.latitude &&
      destination?.longitude
    ) {
      try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        const response = await axios.get(url);
        const points = response.data.routes[0].overview_polyline.points;

        const decodedPoints = polyline.decode(points).map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        }));
        setRouteCoordinates(decodedPoints);
      } catch (error) {
        ToastAndroid.show(
          `Error fetching route: ${error.message}`,
          ToastAndroid.SHORT
        );
        return null;
      }
    }
  };

  return { routeCoordinates, fetchRoute };
}
