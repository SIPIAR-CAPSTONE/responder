import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";

import { supabase } from "../utils/supabase/config";
import useBoundStore from "../zustand/useBoundStore";

export default function useBroadcast() {
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const responderId = userMetaData?.id;
  const [assignedEmergencyAlert, setAssignedEmergencyAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const assignedEmergencyAlertLength = assignedEmergencyAlert.length;
  let pollingInterval;

  const fetchAssignedAlert = async () => {
    if (!responderId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("BROADCAST")
        .select(
          `
        *,
        USER: user_id (first_name, last_name)
      `
        )
        .eq("responder_id", responderId)
        .neq("status", "Completed");

      if (error) {
        if (!error.message === "TypeError: Network request failed") {
          ToastAndroid.show(
            `Error fetching alerts: ${error?.message}`,
            ToastAndroid.SHORT
          );
        }
      }
      if (data?.length > 0) {
        setAssignedEmergencyAlert(data[0]);
      }
      if (data?.length === 0) {
        setAssignedEmergencyAlert({});
      }
    } catch (error) {
      if (!error.message === "TypeError: Network request failed") {
        ToastAndroid.show(
          `Error fetching alerts: ${error?.message}`,
          ToastAndroid.SHORT
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /*
   *
   * Get initial broadcast data in first load
   *
   */
  useEffect(() => {
    if (!responderId) return;

    fetchAssignedAlert();

    //refetch every 10 seconds
    pollingInterval = setInterval(() => {
      fetchAssignedAlert();
    }, 10000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [responderId]);

  /*
   *
   * Observe the broadcast table for changes then refetch
   *
   */
  useEffect(() => {
    const channels = supabase
      .channel("broadcast-all-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "BROADCAST" },
        async () => {
          fetchAssignedAlert();
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  return {
    assignedEmergencyAlert,
    assignedEmergencyAlertLength,
    refetchAssignedAlert: fetchAssignedAlert,
    loading,
  };
}
