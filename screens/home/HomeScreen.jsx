import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import LogoTitle from "../../components/navigation/LogoTitle";
import AssignedEmergencyAlert from "../../components/home/AssignedEmergencyAlert";

const HomeScreen = () => {
  const navigation = useNavigation();

  const CustomAppBar = () => (
    <AppBar>
      <LogoTitle />
      <CircularIcon
        name="notifications"
        onPress={() => navigation.navigate("NotificationScreen")}
      />
    </AppBar>
  );

  return (
    <Layout
      scrollable
      AppbarComponent={CustomAppBar}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <Text
        variant="titleMedium"
        style={{
          marginTop: 16,
          marginBottom: 10,
        }}
      >
        Assigned Emergency Alert
      </Text>
      <AssignedEmergencyAlert />
    </Layout>
  );
};

export default HomeScreen;
