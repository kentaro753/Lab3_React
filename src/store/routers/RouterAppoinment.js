import { createStackNavigator } from "@react-navigation/stack";

import AppointmentDetail from "../screens/AppointmentDetail";
import Appointments from "../screens/Appointments";

const Stack = createStackNavigator();
const RouterAppointment = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServiceCustomer"
        component={Appointments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
        options={{
          headerTitle: 'Appointment Detail',
          headerMode: 'screen',
          headerStyle: {backgroundColor: '#F08080'},
          headerTintColor: '#fff',
          headerTitleStyle: {color: '#fff'},
        }}
      />
      
    </Stack.Navigator>
  );
};
export default RouterAppointment;
