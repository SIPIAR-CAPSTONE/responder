import { View, FlatList, ToastAndroid } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import moment from "moment";

import AppBar from "../../components/ui/AppBar";
import { createStyleSheet, useStyles } from "../../hooks/useStyles";
import CircularIcon from "../../components/ui/CircularIcon";
import IncidentCard from "../../components/history/IncidentCard";
import StatusBar from "../../components/common/StatusBar";
import AppBarTitle from "../../components/ui/AppBarTitle";
import { supabase } from "../../utils/supabase/config";
import useBoundStore from "../../zustand/useBoundStore";
import SortBottomSheet from "../../components/history/SortBottomSheet";
import NotInternetAlert from "../../components/common/NoInternetAlert";
import { useFocusEffect } from "@react-navigation/native";

const HistoryScreen = () => {
  const { styles } = useStyles(stylesheet);
  const [joinedData, setJoinedData] = useState([]);
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const setBroadcastId = useBoundStore((state) => state.setBroadcastId);

  const bottomSheetRef = useRef(null);
  const [showSortSheet, setShowSortSheet] = useState(false);
  const [selectedSort, setSelectedSort] = useState("created_at");
  const closeSortSheet = () => setShowSortSheet(false);

  const sortedIReport = joinedData.sort((a, b) => {
    if (selectedSort === "created_at") {
      return new Date(a.created_at) - new Date(b.created_at);
    } else if (selectedSort === "address") {
      return a.address > b.address ? 1 : -1;
    }
    //TODO: change this to created at later
    else if (selectedSort === "condition") {
      return a.condition > b.condition ? 1 : -1;
    }
  });

  const fetchBroadcastData = async (id) => {
    const { data, error } = await supabase
      .from("broadcast")
      .select(
        `
        broadcast_id,
        address,
        barangay,
        landmark,
        created_at,
        incident_history (
            incident_id,
            emergency_type,
            condition,
            remarks,
            is_created
        ),
        bystander:user_id (
            first_name,
            last_name,
            phone_number
        )
    `
      )
      .eq("isActive", "No")
      .eq("responder_id", userMetaData["id"]);

    if (error) {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    } else {
      // Sort data by created_at
      const sortedData = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      // Update Zustand with the first broadcast_id (or other logic for setting it)
      if (sortedData.length > 0) {
        setBroadcastId(sortedData[0].broadcast_id);
      }

      // Update the component's local state
      setJoinedData(sortedData);
    }
  };

  useEffect(() => {
    fetchBroadcastData();

    const broadcastChannel = supabase
      .channel("broadcast-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "broadcast" },
        async (payload) => {
          const { data, error } = await supabase
            .from("broadcast")
            .select(
              `
            broadcast_id,
            address,
            created_at,
            incident_history (
              incident_id,
              emergency_type,
              condition,
              remarks
            )
          `
            )
            .eq("broadcast_id", payload.new.broadcast_id)
            .eq("isActive", "No")
            .eq("responder_id", userMetaData["id"]);

          if (!error && data.length > 0) {
            // Update Zustand with the new broadcast_id
            setBroadcastId(payload.new.broadcast_id);

            setJoinedData((prevData) => {
              const updatedData = prevData.filter(
                (item) => item.broadcast_id !== payload.new.broadcast_id
              );
              return [...updatedData, data[0]].sort(
                (a, b) => moment(b.created_at) - moment(a.created_at)
              );
            });
          }
        }
      )
      .subscribe();

    return () => {
      broadcastChannel.unsubscribe();
    };
  }, [userMetaData["id"]]);

  //* when screen is focus refetch  incident report history records
  useFocusEffect(
    useCallback(() => {
      fetchBroadcastData();
    }, [])
  );

  return (
    <>
      <StatusBar />
      <AppBar>
        <AppBarTitle>Response History</AppBarTitle>
        <CircularIcon
          name="filter"
          onPress={() => setShowSortSheet((prevShowSheet) => !prevShowSheet)}
        />
      </AppBar>
      <FlatList
        data={sortedIReport}
        keyExtractor={(item) => item.broadcast_id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <IncidentCard
            incident_id={item.incident_history[0].incident_id}
            address={item.address}
            barangay={item.barangay}
            landmark={item.landmark}
            created_at={item.created_at}
            phone_number={item.bystander?.phone_number}
            remarks={item.incident_history[0].remarks}
            condition={item.incident_history[0].condition}
            is_created={item.incident_history[0].is_created}
            first_name={item?.bystander?.first_name}
            last_name={item?.bystander?.last_name}
          />
        )}
        contentContainerStyle={styles.content}
      />
      <SortBottomSheet
        ref={bottomSheetRef}
        isVisible={showSortSheet}
        close={closeSortSheet}
        selectedOption={selectedSort}
        setSelectedOption={setSelectedSort}
      />
      <NotInternetAlert />
    </>
  );
};

export default HistoryScreen;

const stylesheet = createStyleSheet(() => ({
  content: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
}));
