import React ,{ useState } from "react";
import { BottomNavigation } from "react-native-paper";
import Home from "./Home";
import Profile from "./Profile";
export default function DemoBottomNavigation() {
  const [index, setIndex] = useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);
  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    profile: Profile,
  });
  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
