import { useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { ToastAndroid } from "react-native";

import useBoundStore from "../zustand/useBoundStore";

/*
 * Custom image reader. From string convert to encrypted base 64 image format
 *
 */
const useImageReader = (setImageUri) => {
  const globalStateProfilePath = useBoundStore(
    (state) => state.profilePicturePath
  );

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (globalStateProfilePath) {
          const imageBase64 = await FileSystem.readAsStringAsync(
            globalStateProfilePath,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );
          setImageUri(`data:image/*;base64,${imageBase64}`);
        }
      } catch (error) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      }
    };

    fetchImage();
  }, [globalStateProfilePath]);
};

export default useImageReader;
