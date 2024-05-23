import { View } from "react-native";
import { Button, Text } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button mode="contained" onPress={() => navigation.navigate("Profile")}>
        go to Profile
      </Button>
    </View>
  );
};
export default HomeScreen;
