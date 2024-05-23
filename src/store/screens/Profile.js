import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Icon, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useMyContextProvider } from "..";

export default function Profile({ navigation }) {
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [imageAvatar, setImageAvatar] = useState("");
  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate("Login");
    }
    const loadInfo = async () => {
      const userDoc = await firestore()
        .collection("USERS")
        .doc(userLogin.email)
        .get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setImageAvatar(userData.image);
      }
    };
    loadInfo();
  }, [userLogin]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F08080",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Image
          style={{
            height: 155,
            width: 155,
            borderColor: "white",
            borderWidth: 2,
          }}
          size={150}
          source={
            imageAvatar
              ? { uri: imageAvatar }
              : require("../assets/stelle1.png")
          }
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          padding: 10,
          marginTop: 20,
          margin: 10,
        }}
      >
        <View style={styles.viewTxt}>
          <Icon source="account" size={30} />
          <Text style={styles.txt}>User Name: </Text>
          <Text style={styles.txtInfo}>
            {userLogin !== null && userLogin.fullName}
          </Text>
        </View>
        <View style={styles.viewTxt}>
          <Icon source="email" size={30} />
          <Text style={styles.txt}>Email: </Text>
          <Text style={styles.txtInfo}>
            {userLogin !== null && userLogin.email}
          </Text>
        </View>
        <View style={styles.viewTxt}>
          <Icon source="phone" size={30} />
          <Text style={styles.txt}>Phone: </Text>
          <Text style={styles.txtInfo}>
            {userLogin !== null && userLogin.phone}
          </Text>
        </View>
        <Button
          style={{
            margin: 10,
            marginTop: 100,
            borderRadius: 5,
            padding: 10,
            backgroundColor: "#F08080",
          }}
          mode="contained"
          onPress={() =>
            navigation.navigate("EditProfile", {
              email: userLogin.email,
            })
          }
        >
          Edit
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewTxt: {
    flexDirection: "row",
    margin: 10,
  },
  txt: {
    marginLeft: 10,
    marginRight: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
  txtInfo: {
    fontSize: 20,
  },
});
