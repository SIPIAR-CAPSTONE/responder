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
  const [selectedSort, setSelectedSort] = useState("date");
  const closeSortSheet = () => setShowSortSheet(false);

  const sortedIReport = joinedData.sort((a, b) => {
    if (selectedSort === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (selectedSort === "address") {
      return a.address > b.address ? 1 : -1;
    }
    //TODO: change this to created at later
    else if (selectedSort === "condition") {
      return a.condition > b.condition ? 1 : -1;
    }
  });

  const fetchBroadcastData = async () => {
    const { data, error } = await supabase
      .from("BROADCAST")
      .select(`
        *,
        USER:user_id (
          *
        )`
      )
      .eq('responder_id', userMetaData['id'])

    if (error) {
      ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
    } else {
      console.log('HISTORY - DATA', data);
      // Sort data by created_at
      const sortedData = data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Update Zustand with the first broadcast_id (or other logic for setting it)
      if (sortedData.length > 0) {
        setBroadcastId(sortedData[0].broadcast_id);
      }

      // Update the component's local state
      setJoinedData(sortedData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBroadcastData();
    }, [])
  );

  useEffect(() => {
    fetchBroadcastData();

    const broadcastChannel = supabase
      .channel("broadcast-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "BROADCAST" },
        async () => {
          console.log('NEW INCIDENT - DATA');
          fetchBroadcastData()
        }
      )
      .subscribe();

    return () => {
      broadcastChannel.unsubscribe();
    };
  },[]);

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
            broadcastId={item.broadcast_id}
            incident_id={item.broadcast_id}
            address={item.address}
            barangay={item.barangay}
            landmark={item.landmark}
            created_at={item.date}
            phone_number={item.USER?.phone_number}
            remarks={item.remarks}
            condition={item.condition}
            status={item.status}
            first_name={item?.USER?.first_name}
            last_name={item?.USER?.last_name}
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
