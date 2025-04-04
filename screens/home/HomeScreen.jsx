import { Text } from "react-native-paper";
import Layout from "../../components/common/Layout";
import AppBar from "../../components/ui/AppBar";
import LogoTitle from "../../components/navigation/LogoTitle";
import AssignedEmergencyAlert from "../../components/home/AssignedEmergencyAlert";
import useBoundStore from "../../zustand/useBoundStore";
import usePushNotification from "../../hooks/usePushNotification";

const HomeScreen = () => {
  const session = useBoundStore((state) => state.session);
  usePushNotification({ userId: session?.user?.id });

  const CustomAppBar = () => (
    <AppBar>
      <LogoTitle />
    </AppBar>
  );

  return (
    <Layout
      scrollable
      AppbarComponent={CustomAppBar}
      contentContainerStyle={{ paddingBottom: 20 }}
      addNoInternetAlert
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
