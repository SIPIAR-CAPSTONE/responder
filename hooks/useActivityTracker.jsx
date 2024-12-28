import { useEffect } from "react";
import useBoundStore from "../zustand/useBoundStore";
import useLocation from "./useLocation";
import { supabase } from "../utils/supabase/config";
import moment from "moment";

export default function useActivityTracker() {
  const { userLocation, loading } = useLocation();
  const session = useBoundStore((state) => state.session);
  const userId = session?.user?.id;

  const updateActivity = async () => {
    if (!session || !userId || loading || !userLocation) return;

    const { error } = await supabase.from("USER ACTIVITY").upsert({
      user_id: userId,
      last_active: moment(),
      status: "active",
      latitude: userLocation?.latitude,
      longitude: userLocation?.longitude,
      location_updated_at: moment(),
      role: "responder",
    });

    if (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!loading) {
      updateActivity();
    }

    const intervalId = setInterval(() => {
      if (!loading) {
        updateActivity();
      }
    }, 10000);

    return () => clearInterval(intervalId);
  }, [loading]);
}
