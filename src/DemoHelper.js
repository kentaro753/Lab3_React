import { useState } from "react";
import { View, Text } from "react-native";
import { HelperText, TextInput } from "react-native-paper";

export default function DemoHelper() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const checkEmailError = () => {
    return !email.includes("@");
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        label={
          <Text style={{ color: checkEmailError() ? "red" : "blue" }}>
            nhập Email
          </Text>
        }
        value={email}
        onChangeText={setEmail}
        left={<TextInput.Icon icon={"email"} />}
      />
      <HelperText tpye="error" visible={checkEmailError()}>
        Sai địa chỉ Email
      </HelperText>
      <TextInput
        label={
          <Text style={{ color: checkEmailError() ? "red" : "blue" }}>
            nhập Password
          </Text>
        }
        value={password}
        onChangeText={setPassword}
        left={<TextInput.Icon icon={"key"} />}
        right={
          <TextInput.Icon
            icon={"eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        secureTextEntry={!showPassword}
      />
      <HelperText tpye="error" visible={checkEmailError()}>
        Sai địa chỉ Email
      </HelperText>
    </View>
  );
}
