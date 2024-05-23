import { Alert, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import React from "react";
import auth from "@react-native-firebase/auth";

function ForgotPass({ navigation }) {
  const [email, setEmail] = React.useState("");
  const handlResetPass = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => Alert.alert("Error..."))
      .catch((e) => Alert.alert(e.message));
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 30,
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: 50,
          fontWeight: "bold",
          marginBottom: 15,
          color: "#F08080",
        }}
      >
        Forget Pass
      </Text>
      <TextInput
        style={{
          marginBottom: 10,
          backgroundColor: "none",
          borderRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          borderWidth: 1,
          borderColor: "grey",
        }}
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        underlineColor="transparent"
        underlineStyle={0}
      />
      <Button
        style={{
          marginTop: 20,
          padding: 5,
          backgroundColor: "#F08080",
        }}
        mode="contained"
        onPress={handlResetPass}
      >
        Send Email
      </Button>
      <View style={{ flexDirection: "column" }}>
        <Button onPress={() => navigation.navigate("Login")}>Back</Button>
      </View>
    </View>
  );
}
export default ForgotPass;