import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth";

export default function Login({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => Alert.alert("Đăng nhập thành công"))
      .catch((e) => Alert.alert(e.message));
  };
  return (
    <View style={{ flex1, justifyContent: "center" }}>
      <Text>Register</Text>
      <TextInput label={"Email"} value={email} onChangeText={setEmail} />
      <TextInput
        label={"Password"}
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <View style={{flexDirection:"row"}}>
        <Button onPress={() => navigation.navigate("Register")}>Create new Account</Button>
        <Button>Forgot password?</Button>
      </View>
    </View>
  );
}
