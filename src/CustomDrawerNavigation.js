import { View } from "react-native";
import { Drawer } from "react-native-paper";

const CustomDrawerNavigation = ({ navigation }) => {
  return (
    <Drawer.Section style={{ paddingTop: 40 }}>
      <Drawer.Item
        label="Home"
        icon={"home"}
        onPress={() => navigation.navigate("Home")}
      />
      <Drawer.Item
        label="Profile"
        icon={"star"}
        onPress={() => navigation.navigate("Profile")}
      />
    </Drawer.Section>
  );
};

export default CustomDrawerNavigation;
