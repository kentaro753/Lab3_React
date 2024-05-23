import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { TouchableHighlight } from "react-native";

const App = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const onPress = ()=>{
    Alert.alert(`Đăng nhập thành công với Email = ${email} và Password = ${pass}`)
  }
  return (
    <View style={myStyle.container}>
      <TextInput
        style={myStyle.textInput}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={myStyle.textInput}
        onChangeText={setPass}
        secureTextEntry
        placeholder="Pass"
      />
      <TouchableHighlight style={myStyle.button}
      onPress={onPress}>
        <Text style={myStyle.buttonText}>Login</Text>
      </TouchableHighlight>
    </View>
  );
};
export default App;

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column-reverse",
    // backgroundColor: "aqua",
    justifyContent: "center",
    // alignItems: "center"
  },
  textInput: {
    borderWidth: 1,
    borderColor: "blue",
    margin: 10,
  },
  button: {
    height: 50,
    backgroundColor: "aqua",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5
  },
  buttonText:{
    color:"blue",
    fontSize:20
  }
});
