import { View } from "react-native";
import { Text, Avatar } from "react-native-paper";
import { useStyles, createStyleSheet } from "../../hooks/useStyles";

const UserProfileCard = ({ name, imageSource, email, renderFooter }) => {
  const { styles } = useStyles(stylesheet);
  const firstNameInitial = name[0];

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

      <Text variant="titleMedium">{name}</Text>
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
