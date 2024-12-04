import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function useConfirmBack() {
  const navigation = useNavigation();
  const [visibleAlert, setVisibleAlert] = useState(false);

  const showAlert = () => setVisibleAlert(true);
  const hideAlert = () => setVisibleAlert(false);
  const confirmBack = () => {
    setVisibleAlert(false);
    navigation.goBack();
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        showAlert();
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return { visibleAlert, showAlert, hideAlert, confirmBack };
}
