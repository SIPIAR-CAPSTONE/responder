import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import AppBar from '../../components/ui/AppBar'
import { createStyleSheet, useStyles } from '../../hooks/useStyles'
import CircularIcon from '../../components/ui/CircularIcon'
import IncidentCard from '../../components/history/IncidentCard'
import StatusBar from '../../components/common/StatusBar'
import AppBarTitle from '../../components/ui/AppBarTitle'
import { supabase } from '../../utils/supabase/config'
import useBoundStore from '../../zustand/useBoundStore'

const HistoryScreen = () => {
  const { styles } = useStyles(stylesheet)
  const [joinedData, setJoinedData] = useState([])
  const userMetaData = useBoundStore((state) => state.userMetaData)
  const setBroadcastId = useBoundStore((state) => state.setBroadcastId)

  const fetchBroadcastData = async (id) => {
    const { data, error } = await supabase
      .from('broadcast')
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
            remarks
        ),
        bystander:user_id (
            first_name,
            last_name,
            phone_number
        )
    `,
      )
      .eq('isActive', 'No')
      .eq('responder_id', userMetaData['id'])

    if (error) {
      console.error('Error fetching joined data:', error)
    } else {
      // Sort data by created_at
      const sortedData = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      )

      // Update Zustand with the first broadcast_id (or other logic for setting it)
      if (sortedData.length > 0) {
        setBroadcastId(sortedData[0].broadcast_id)
        console.log('INITIAL LOAD B-ID: ', sortedData[0].broadcast_id);
      }

      // Update the component's local state
      setJoinedData(sortedData)
    }
  }

  useEffect(() => {
    fetchBroadcastData()

    const broadcastChannel = supabase
      .channel('broadcast-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'broadcast' },
        async (payload) => {
          const { data, error } = await supabase
            .from('broadcast')
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
          `,
            )
            .eq('broadcast_id', payload.new.broadcast_id)
            .eq('isActive', 'No')
            .eq('responder_id', userMetaData['id'])

          if (!error && data.length > 0) {
            // Update Zustand with the new broadcast_id
            setBroadcastId(payload.new.broadcast_id)

            setJoinedData((prevData) => {
              const updatedData = prevData.filter(
                (item) => item.broadcast_id !== payload.new.broadcast_id,
              )
              return [...updatedData, data[0]].sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at),
              )
            })
          }
        },
      )
      .subscribe()

    return () => {
      broadcastChannel.unsubscribe()
    }
  }, [userMetaData['id']])

  return (
    <>
      <StatusBar />
      <AppBar>
        <AppBarTitle>Response History</AppBarTitle>
        <CircularIcon
          name="filter"
          onPress={() => console.log('open bottom sheet')}
        />
      </AppBar>
      <FlatList
        data={joinedData}
        keyExtractor={(item) => item.broadcast_id}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <IncidentCard
            incident_id={item.incident_history[0].incident_id}
            address={item.address}
            barangay={item.barangay}
            landmark={item.landmark}
            emergency_type={item.emergency_type}
            created_at={item.created_at}
            first_name={item.first_name}
            last_name={item.last_name}
            phone_number={item.phone_number}
            remarks={item.remarks}
            condition={item.condition}
          />
        )}
        contentContainerStyle={styles.content}
      />
    </>
  )
}

export default HistoryScreen

const stylesheet = createStyleSheet(() => ({
  content: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
}))
