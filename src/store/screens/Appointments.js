import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { IconButton, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { useMyContextProvider } from "..";

export default function Appointments({ navigation }) {
  const cAPPOINTMENT = firestore().collection("APPOINTMENTS");
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [appointmentLst, setAppoimentLst] = useState([]);


  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
      return;
    }

    const list = cAPPOINTMENT
      .where("email", "==", userLogin.email)
      .onSnapshot(async (response) => {
        const newArr = [];
        for (const doc of response.docs) {
          const appointmentData = doc.data();
          const serviceDocRef = firestore()
            .collection("SERVICES")
            .doc(appointmentData.serviceId);

          const serviceDoc = await serviceDocRef.get();
          if (serviceDoc.exists) {
            const serviceData = serviceDoc.data();
            const appointmentWithServiceName = {
              ...appointmentData,
              service: serviceData.serviceName,
            };
            newArr.push(appointmentWithServiceName);
          }
        }
        setAppoimentLst(newArr);
      });
    return () => list();
  }, [userLogin]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AppointmentDetail", { id: item.id })
        }
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "grey",
            marginBottom: 10,
            margin: 10,
            borderRadius: 20,
            paddingTop: 20,
            paddingBottom: 20,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              padding: 5,
              marginLeft: 5,
              marginRight: 5,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                User name:{" "}
              </Text>
              <Text style={{ fontSize: 18 }}>{item.customerId}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Service name:{" "}
              </Text>
              <Text style={{ fontSize: 18 }}>{item.service}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Date: </Text>
              <Text style={{ fontSize: 18 }}>
                {item.datetime.toDate().toLocaleString()}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              left: 59,
            }}
          >
            <IconButton
              icon={
                item.complete ? "check-circle" : "checkbox-blank-circle-outline"
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text variant="headlineSmall" style={{color: '#000', fontWeight: 'bold'}}>
        Danh sách dịch vụ đăng kí
      </Text>
      <FlatList
        data={appointmentLst}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}