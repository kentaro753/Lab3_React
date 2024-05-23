import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Login from "../Login";
import Register from "../Register";
import ForgetPass from "../screens/ForgetPass";
import Customer from "../screens/Customer";
import Admin from "../screens/Admin";
import ChangePass from "../screens/ChangePass";
import { useMyContextProvider } from "..";
import EditProfile from "../screens/EditProfile";
import Profile from "../screens/Profile";

export default function Router({ navigation }) {
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerMode: "none" }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: "Register",
            headerMode: "screen",
            headerStyle: { backgroundColor: "#F08080" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Stack.Screen name="ForgetPass" component={ForgetPass} />
        <Stack.Screen
          name="ChangePass"
          component={ChangePass}
          options={{
            headerTitle: "Change Password",
            headerMode: "screen",
            headerStyle: { backgroundColor: "#F08080" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Customer" component={Customer} />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: "Profile",
            headerMode: "screen",
            headerStyle: { backgroundColor: "#F08080" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "#fff" },
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerTitle: "Edit Profile",
            headerMode: "screen",
            headerStyle: { backgroundColor: "#F08080" },
            headerTintColor: "#fff",
            headerTitleStyle: { color: "#fff" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
