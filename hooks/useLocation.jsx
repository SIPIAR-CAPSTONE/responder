import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { promptForEnableLocationIfNeeded } from "react-native-android-location-enabler";
import { useNavigation } from "@react-navigation/native";
import { Linking, Alert } from "react-native";

const useLocation = () => {
  const [userLocation, setUserLocation] = useState({});
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // On first screen load ask user permision to access their location
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setLoading(false);

          Alert.alert(
            "Permission Denied",
            "You cannot access this feature because you denied the permision request. Please go to the app setting and change the Location permision to access this feature.",
            [
              {
                text: "Open Settings",
                onPress: () => {
                  navigation.navigate("ProfileScreen");
                  Linking.openSettings();
                },
              },
              {
                text: "back",
                onPress: () => navigation.navigate("ProfileScreen"),
                style: "cancel",
              },
            ]
          );
          return;
        }

        // Listen to user location to track user location changes
        const foregroundSubscrition = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            distanceInterval: 1,
          },
          (location) => {
            setUserLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
            setLoading(false);
          }
        );
        return () => foregroundSubscrition.remove();
      } catch (error) {
        if (error.code == "ERR_LOCATION_SETTINGS_UNSATISFIED") {
          Alert.alert(
            "Warning: Location not enabled",
            "To access this feature your location should be turned on.",
            [
              {
                text: "Enable Location",
                onPress: () => handleEnabledPressed(),
              },
              {
                text: "back",
                onPress: () => navigation.navigate("ProfileScreen"),
                style: "cancel",
              },
            ]
          );
        } else {
          Alert.alert("Unexpected Error: ", error.message);
        }
      }
    })();
  }, []);

  /**
   * Ask user to enable location.
   */
  async function handleEnabledPressed() {
    try {
      const enableResult = await promptForEnableLocationIfNeeded();
      // The user has accepted to enable the location services
      // data can be :
      //  - "already-enabled" if the location services has been already enabled
      //  - "enabled" if user has clicked on OK button in the popup
    } catch (error) {
      if (error instanceof Error) {
        if (error.code == "EUNSPECIFIED") {
          // Display warning alert
          Alert.alert(
            `Warning: `,
            "You still reject to turn on your location. Please restart the application.",
            [
              {
                text: "back",
                onPress: () => navigation.navigate("ProfileScreen"),
                style: "cancel",
              },
            ]
          );
        } else {
          Alert.alert("Unexpected Error: ", error.message, [
            {
              text: "back",
              onPress: () => navigation.navigate("ProfileScreen"),
              style: "cancel",
            },
          ]);
        }
        // The user has not accepted to enable the location services or something went wrong during the process
        // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
        // codes :
        //  - ERR00 : The user has clicked on Cancel button in the popup
        //  - ERR01 : If the Settings change are unavailable
        //  - ERR02 : If the popup has failed to open
        //  - ERR03 : Internal error
      }
    }
  }

  async function reverseGeocode({ longitude, latitude }) {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      latitude: latitude,
      longitude: longitude,
    });
    return reverseGeocodedAddress;
  }

  return { userLocation, loading, reverseGeocode };
};

export default useLocation;
