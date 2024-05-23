import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";
import { useMyContextProvider } from "..";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { IconButton, TextInput } from "react-native-paper";

const Service = ({ navigation }) => {
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [services, setServices] = useState([]);
  const [servicesData, setServicesData] = useState([]);
  const cSERVICE = firestore().collection("SERVICES");
  const [name, setName] = useState([]);
  //fetch
  useEffect(() => {
    cSERVICE.onSnapshot((response) => {
      var arr = [];
      response.forEach((doc) => {
        doc.data().id != null && arr.push(doc.data());
      });
      setServices(arr);
      setServicesData(arr);
    });
  }, []);
  useEffect(() => {
    setServicesData(services.filter((s) => s.serviceName.includes(name)));
  }, [name]);
  const renderItem = ({ item }) => {
    const { serviceName, price } = item;
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          borderWidth: 1,
          height: 50,
          borderRadius: 10,
          padding: 10,
          margin: 5,
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onPress={() => navigation.navigate("ServiceDetail", { item: item })}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{serviceName}</Text>
        <Text style={{ fontSize: 18 }}>{price} VND</Text>
      </TouchableOpacity>
    );
  };

  return (
    // <View style={{ flex: 1 }}>
    //   <Text>Service</Text>
    //   <TextInput
    //     label={"Search Service By Name"}
    //     style={{ margin: 10 }}
    //     value={name}
    //     onChangeText={setName}
    //   />
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#F08080",
          height: 50,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          variant="displaySmall"
          style={{ marginLeft: 10, color: "white", fontSize: 20 }}
        >
          {userLogin !== null && userLogin.fullName.toUpperCase()}
        </Text>
        <IconButton
          icon="account-circle"
          size={40}
          iconColor="white"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Image
          source={require("../assets/logo.png")}
          style={{ margin: 20, padding: 10, alignSelf: "center" }}
        />

        <TextInput
          label={"Search name"}
          value={name}
          onChangeText={setName}
          underlineColor="transparent"
          underlineStyle={0}
          style={{
            margin: 10,
            backgroundColor: "none",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderWidth: 1,
            borderColor: "grey",
          }}
        />
        <View
          style={{
            height: 50,
            backgroundColor: "white",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <Text
            variant="headlineSmall"
            style={{ color: "#000", fontWeight: "bold", fontSize: 20 }}
          >
            Danh sách dịch vụ
          </Text>
          <IconButton
            icon="plus-circle"
            size={40}
            iconColor="#F08080"
            onPress={() => navigation.navigate("AddNewService")}
          />
        </View>
      </View>
      <FlatList
        style={{
          flex: 1,
        }}
        data={servicesData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};
export default Service;
