import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { login, useMyContextProvider } from "./index";

export default function Login({ navigation }) {
  const [controller, dispatch] = useMyContextProvider();
  const [email, setEmail] = useState("toan@gmail.com");
  const [password, setPassword] = useState("159753852");
  const [showPass, setShowPass] = useState(false);
  const { userLogin } = controller;
  useEffect(() => {
    if (userLogin != null) {
      if (userLogin.role === "admin") navigation.navigate("Admin");
      else if (userLogin.role === "customer") navigation.navigate("Customer");
    }
    console.log("User Login: " + userLogin);
  }, [userLogin]);
  const handleLogin = () => {
    login(dispatch, email, password);
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
        Login
      </Text>
      <TextInput
        label={"Email"}
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor: "white",
          marginBottom: 20,
          borderWidth: 2,
          borderColor: "lightgrey",
          borderRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        underlineColor="white"
      />
      <TextInput
        label={"Password"}
        value={password}
        secureTextEntry={!showPass}
        onChangeText={setPassword}
        style={{
          backgroundColor: "white",
          marginBottom: 20,
          borderWidth: 2,
          borderColor: "lightgrey",
          borderRadius: 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        underlineColor="white"
        right={
          showPass ? (
            <TextInput.Icon
              icon={"eye-off"}
              onPress={() => setShowPass(!showPass)}
            />
          ) : (
            <TextInput.Icon
              icon={"eye"}
              onPress={() => setShowPass(!showPass)}
            />
          )
        }
      />

      <Button
        mode="contained"
        onPress={handleLogin}
        style={{ marginTop: 20, padding: 5, backgroundColor: "#F08080" }}
      >
        Login
      </Button>
      <View style={{ flexDirection: "row" }}>
        <Button onPress={() => navigation.navigate("Register")}>
          Create new Account
        </Button>
        <Button onPress={() => navigation.navigate("ForgetPass")}>
          Forgot password?
        </Button>
      </View>
    </View>
  );
}
