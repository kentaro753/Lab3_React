import { useState,useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { FlatList } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { useMyContextProvider } from "..";

export default function Customers({ navigation }) {
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [userLst, setUserlst] = useState([]);
  const cUSER = firestore().collection("USERS");

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
    }
    cUSER
      .where("role", "in", ["customer", "admin"])
      .orderBy("role", "asc")
      .onSnapshot((response) => {
        var arr = [];
        response.forEach((doc) => arr.push(doc.data()));
        setUserlst(arr);
      });
  }, [userLogin]);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ProfileAllUser", {
            fullname: item.fullName,
            role: item.role,
            email: item.email,
            phone: item.phone,
          })
        }
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: "grey",
            margin: 10,
            borderRadius: 10,
            padding: 7,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "column",
              padding: 5,

            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Email: </Text>
              <Text style={{ fontSize: 18 }}>{item.email}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                User name:{" "}
              </Text>
              <Text style={{ fontSize: 18 }}>{item.fullName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Role: </Text>
              <Text style={{ fontSize: 18 }}>{item.role}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
      >
        <Text
          variant="headlineSmall"
          style={{ color: "#000", fontWeight: "bold" }}
        >
          Danh sách người dùng
        </Text>
        <IconButton
          icon="plus-circle"
          size={40}
          iconColor="#F08080"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
      <FlatList
        data={userLst}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}
