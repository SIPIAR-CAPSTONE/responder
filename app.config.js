import "dotenv/config";

export default {
  expo: {
    name: "Sipiar EMS",
    slug: "responder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/AppIcon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splashscreen.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      googleServicesFile: "./google-services.json",
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: "./assets/AppIcon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.sipiar.responder",
    },
    web: {
      favicon: "./assets/AppIcon.png",
    },
    extra: {
      eas: {
        projectId: "29cb0939-f35c-495e-9ae9-5dbc060db3df",
      },
      GOOGLE_MAPS_API_KEY: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
    },
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to change your profile picture.",
        },
      ],
    ],
  },
};
