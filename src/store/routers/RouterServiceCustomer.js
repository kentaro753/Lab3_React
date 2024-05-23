import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import ServiceDetail from "../screens/ServiceDetail";
import ServiceCustomer from "../screens/ServiceCustomer";
import AddNewAppointment from "../screens/AddNewAppointment";
import AppointmentDetail from "../screens/AppointmentDetail";

const Stack = createStackNavigator();
const RouterServiceCustomer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServiceCustomer"
        component={ServiceCustomer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="AddNewAppointment" component={AddNewAppointment} />
      
    </Stack.Navigator>
  );
};
export default RouterServiceCustomer;
