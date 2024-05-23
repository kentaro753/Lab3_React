import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Text, View } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import Transaction from "./Transaction";
import Setting from "./Setting";
import Customer from "./Customer";
import RouterService from "../routers/RouterService";
import Customers from "./Customers";

const Tab = createMaterialBottomTabNavigator();
const Admin = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="RouterService"
        component={RouterService}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: () => <Icon source="home" color="#F08080" size={26} />,
          tabBarLabelStyle: { color: "#F08080", fontSize: 13 },
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: "Transaction",
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
      <Tab.Screen
        name="Customer"
        component={Customers}
        options={{
          tabBarLabel: "Customer",
          tabBarIcon: () => (
            <Icon source="account-multiple" color="#F08080" size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default Admin;
