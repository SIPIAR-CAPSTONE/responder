import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

const useInternet = () => {
  const [hasInternet, setHasInternet] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setHasInternet(state.isConnected);
      if (!state.isConnected) {
        setHasInternet(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { hasInternet };
};

export default useInternet;
