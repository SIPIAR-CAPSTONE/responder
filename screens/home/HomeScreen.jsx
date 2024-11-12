import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import CircularIcon from "../../components/ui/CircularIcon";
import LogoTitle from "../../components/navigation/LogoTitle";
import { useNavigation } from "@react-navigation/native";
import AssignedEmergencyAlert from "../../components/home/AssginedEmergencyAlert";
import { Text } from "react-native-paper";

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
        Assigned Emergency Request
      </Text>
      <AssignedEmergencyAlert />
    </Layout>
  );
};

export default HomeScreen;
