import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Icon, IconButton } from "react-native-paper";
import Setting from "./Setting";

import RouterServiceCustomer from "../routers/RouterServiceCustomer";
import RouterAppointment from "../routers/RouterAppoinment";

const Tab = createMaterialBottomTabNavigator();
const Customer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterService"
        component={RouterServiceCustomer}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: () => <Icon source="home" color="#F08080" size={26} />,
          tabBarLabelStyle: { color: "#F08080", fontSize: 13 },
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={RouterAppointment}
        options={{
          tabBarLabel: "Appointments",
          tabBarIcon: () => <Icon source="cash" color="#F08080" size={26} />,
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarLabel: "Setting",
          tabBarIcon: () => <Icon source="cog" color="#F08080" size={26} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default Customer;
