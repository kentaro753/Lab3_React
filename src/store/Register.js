import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { createAccount } from "./index";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const handleCreateAccount = () => {
    const role = "customer";
    createAccount(email, password, fullName, phone, role);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 50,
          fontWeight: "bold",
          marginBottom: 15,
          color: "#F08080",
        }}
      >
        Register
      </Text>
      <TextInput
        style={styles.textInput}
        label={"Email"}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        label={"Full Name"}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.textInput}
        label={"Phone"}
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.textInput}
        label={"Password"}
        value={password}
        onChangeText={setPassword}
      />
      <Button style={{ marginTop: 20, padding: 5, backgroundColor: "#F08080" }} mode="contained" onPress={handleCreateAccount}>
        Create Account
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    marginBottom: 10,
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "grey",
  },
});
