import { View } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";
import useBoundStore from "../../zustand/useBoundStore";
import { useState } from "react";
import useImageReader from "../../hooks/useImageReader";

const UserProfileCard = ({ renderFooter }) => {
  const { styles } = useStyles(stylesheet);
  const userMetaData = useBoundStore((state) => state.userMetaData);
  const fullName = `${userMetaData["firstName"]} ${userMetaData["middleName"]} ${userMetaData["lastName"]} ${userMetaData["suffix"]}`;
  const firstNameInitial = fullName[0];
  const email = userMetaData["email"];
  const [imageSource, setImageSource] = useState(null);
  useImageReader(setImageSource);

  const UserAvatar = imageSource ? (
    <Avatar.Image
      size={124}
      source={{ uri: imageSource }}
      style={styles.avatar}
    />
  ) : (
    <Avatar.Text size={124} label={firstNameInitial} style={styles.avatar} />
  );

  return (
    <View style={styles.header}>
      {UserAvatar}

      <Text variant="titleMedium">{fullName}</Text>
      <Text style={styles.email} variant="bodySmall">
        {email}
      </Text>
      {renderFooter && renderFooter()}
    </View>
  );
};

export default UserProfileCard;

const stylesheet = createStyleSheet((theme) => ({
  avatar: {
    backgroundColor: "#FFDDDD",
  },
  header: {
    alignItems: "center",
    paddingVertical: 11,
  },
  email: {
    color: theme.colors.text3,
  },
}));
