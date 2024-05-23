import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import Service from "../screens/Service";
import ServiceDetail from "../screens/ServiceDetail";
import AddNewService from "../screens/AddNewService";

const Stack = createStackNavigator();
const RouterService = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Service"
        component={Service}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={{
          headerTitle: "Service Detail",
          headerMode: "screen",
          headerStyle: { backgroundColor: "#F08080" },
          headerTintColor: "#fff",
          headerTitleStyle: { color: "#fff" },
        }}
      />
      <Stack.Screen
        name="AddNewService"
        component={AddNewService}
        options={{
          headerTitle: "Add New Detail",
          headerMode: "screen",
          headerStyle: { backgroundColor: "#F08080" },
          headerTintColor: "#fff",
          headerTitleStyle: { color: "#fff" },
        }}
      />
    </Stack.Navigator>
  );
};
export default RouterService;
