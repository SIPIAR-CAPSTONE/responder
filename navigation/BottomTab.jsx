import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import BroadcastScreen from "../screens/broadcast/BroadcastScreen";
import HistoryScreen from "../screens/history/HistoryScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import TabBarIcon from "../components/navigation/TabBarIcon";
import { createStyleSheet, useStyles } from "../hooks/useStyles";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme, styles } = useStyles(stylesheet);

  const screenOptions = {
    tabBarStyle: styles.tabBar,
    tabBarActiveTintColor: theme.colors.primary,
    tabBarLabelStyle: styles.tabBarLabel,
    headerStyle: styles.header,
    headerTitleStyle: styles.headerTitle,
    headerRightContainerStyle: styles.headerRightContainer,
  };

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.sceneContainer}
      screenOptions={screenOptions}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="BroadcastScreen"
        component={BroadcastScreen}
        options={{
          title: "Broadcast",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="archive" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const stylesheet = createStyleSheet((theme) => ({
  sceneContainer: {
    backgroundColor: theme.colors.background,
  },
  tabBar: {
    height: 46,
    backgroundColor: theme.colors.background,
    paddingTop: 2,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    paddingBottom: 2,
  },
  header: {
    elevation: 0,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 22,
    color: theme.colors.text,
  },
  headerRightContainer: {
    marginEnd: 14,
  },
}));
