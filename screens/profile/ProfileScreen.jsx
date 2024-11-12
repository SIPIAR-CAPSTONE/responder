import { View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import * as FileSystem from 'expo-file-system'

import { createStyleSheet, useStyles } from '../../hooks/useStyles'
import Layout from '../../components/common/Layout'
import AppBar from '../../components/ui/AppBar'
import UserProfileCard from '../../components/profile/UserProfileCard'
import ListItem from '../../components/ui/ListItem'
import NextActionIcon from '../../components/common/NextActionIcon'
import CircularIcon from '../../components/ui/CircularIcon'
import ConfirmationDialog from '../../components/ui/ConfirmationDialog'
import AppBarTitle from '../../components/ui/AppBarTitle'
import { supabase } from '../../utils/supabase/config'
import { LargeSecureStore } from '../../utils/SecureLocalStorage'
import useBoundStore from '../../zustand/useBoundStore'
import useUserMetadata from '../../hooks/useUserMetadata'

const ProfileScreen = () => {
  const { styles } = useStyles(stylesheet)
  const navigation = useNavigation()

  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false)
  const hideLogoutDialog = () => setIsLogoutDialogVisible(false)
  const showLogoutDialog = () => setIsLogoutDialogVisible(true)
  const largeSecureStore = new LargeSecureStore()
  const removeSession = useBoundStore((state) => state.removeSession)
  const { removeState } = useUserMetadata()
  const removeProfilePicturePath = useBoundStore(
    (state) => state.removeProfilePicturePath,
  )
  const globalStateProfilePath = useBoundStore(
    (state) => state.profilePicturePath
  );

  const CustomAppBar = () => {
    return (
      <AppBar centerContent>
        <AppBarTitle>Profile</AppBarTitle>
      </AppBar>
    )
  }

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      //* remove encrypted session from secure local storage
      await largeSecureStore.removeItem('session')
      //* remove encrypted session as a global state
      removeSession()

      // //* remove global state variable
      removeState()

      //* remove profile picture in local storage
      await FileSystem.deleteAsync(globalStateProfilePath)

      //* remove profile picture global variable
      removeProfilePicturePath()
    }
  }

  return (
    <Layout scrollable AppbarComponent={CustomAppBar}>
      <UserProfileCard
        name="Verseler kerr Handuman"
        email="handuman.verselerkerr@gmail.com"
        imageSource=""
      />
      <View style={styles.listItems}>
        <ListItem
          size="medium"
          title="My Account"
          renderIcon={() => (
            <CircularIcon name="person" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate('MyAccountScreen')}
        />
        <ListItem
          size="medium"
          title="Settings"
          renderIcon={() => (
            <CircularIcon name="settings" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={() => navigation.navigate('SettingsScreen')}
        />
        <ListItem
          size="medium"
          title="Sign Out"
          renderIcon={() => (
            <CircularIcon name="exit" variant="primary" size={12} />
          )}
          renderActionIcon={() => <NextActionIcon />}
          onPress={showLogoutDialog}
        />

        <ConfirmationDialog
          title="Are you sure you want to Sign Out?"
          isVisible={isLogoutDialogVisible}
          onPressConfirmation={handleLogout}
          onPressCancel={hideLogoutDialog}
        />
      </View>
    </Layout>
  )
}

export default ProfileScreen

const stylesheet = createStyleSheet(() => ({
  listItems: {
    marginTop: 40,
    rowGap: 7,
  },
}))
