import Layout from "../../components/common/Layout";
import EmergencyAlerts from "../../components/home/EmergencyAlerts";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import LogoTitle from "../../components/navigation/LogoTitle";
import AssignedEmergencyAlert from "../../components/home/AssignedEmergencyAlert";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const CustomAppBar = () => (
    <AppBar>
      <LogoTitle />
      <CircularIcon
        name="notifications"
        onPress={() => navigation.navigate("Notification")}
      />
    </AppBar>
  );

  return (
    <Layout
      scrollable
      removeDefaultPaddingHorizontal
      AppbarComponent={CustomAppBar}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <AssignedEmergencyAlert />
      <EmergencyAlerts />
    </Layout>
  );
};

export default HomeScreen;
