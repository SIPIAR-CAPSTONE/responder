import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/config";
import { ToastAndroid } from "react-native";
import useBoundStore from "../zustand/useBoundStore";

export default function useBroadcast() {
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const responderId = userMetaData?.id;
  const [assignedEmergencyAlert, setAssignedEmergencyAlert] = useState({});
  const [loading, setLoading] = useState(false);
  const assignedEmergencyAlertLength = assignedEmergencyAlert.length;
  let pollingInterval;

  const fetchAssignedAlert = async () => {
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
        ToastAndroid.show(
          `Error fetching alerts: ${error.message}`,
          ToastAndroid.SHORT
        );
      }
      if (data.length > 0) {
        setAssignedEmergencyAlert(data[0]);
      }
      if (data.length === 0) {
        setAssignedEmergencyAlert({});
      }
    } catch (error) {
      ToastAndroid.show(
        `Error fetching alerts: ${error.message}`,
        ToastAndroid.SHORT
      );
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
    fetchAssignedAlert();

    //refetch every 20 seconds
    pollingInterval = setInterval(() => {
      fetchAssignedAlert();
    }, 20000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

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
        { event: "*", schema: "public", table: "broadcast" },
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
