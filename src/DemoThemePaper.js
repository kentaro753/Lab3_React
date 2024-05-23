import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  useTheme,
  IconButton,
  Icon,
  Avatar,
} from "react-native-paper";

const DemoTheme = () => {
  const [darkMode, setDarkMode] = useState(true);
  const { theme } = useMaterial3Theme();
  const paperTheme = darkMode
    ? { ...MD3DarkTheme, color: theme.dark }
    : { ...MD3LightTheme, color: theme.light };
  return (
    <View style={{ flex: 1 }}>
      <IconButton
        icon={darkMode ? "white-balance-sunny" : "moon-waxing-crescent"}
        size={30}
        onPress={() => setDarkMode(!darkMode)}
      />
      <View
        style={{ ...myStyles.box, backgroundColor: paperTheme.colors.primary }}
      >
        <Text style={{ color: paperTheme.colors.onPrimary }}>Hello</Text>
      </View>
      <View
        style={{
          ...myStyles.box,
          backgroundColor: paperTheme.colors.secondary,
        }}
      >
        <Text style={{ color: paperTheme.colors.onSecondary }}>Hello</Text>
      </View>
      <View
        style={{ ...myStyles.box, backgroundColor: paperTheme.colors.error }}
      >
        <Text style={{ color: paperTheme.colors.onError }}>Hello</Text>
      </View>
      <Avatar.Text label="ABC" size={40}/>
    </View>
  );
};
export default DemoTheme;
const myStyles = StyleSheet.create({
  box: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
