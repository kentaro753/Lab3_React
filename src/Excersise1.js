import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ImageBackground,
  Image,
} from "react-native";
import { TouchableHighlight } from "react-native";

const App = () => {
  const [name, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const onPress = () => {
    Alert.alert(
      `Đăng nhập thành công với Username=${name} và Password=${pass}`
    );
  };
  return (
    <View style={myStyle.container}>
      <ImageBackground
        style={myStyle.bg_image}
        source={require("../image/ADSdt01.jpg")}
        resizeMode="cover"
      >
        <View style={myStyle.inner_container}>
          <Image source={require("../image/stelle1.png")} />
          <Text style={{alignSelf:'flex-end', color:'black', fontStyle: 'italic'}}>REGISTER</Text>
          <TextInput
            style={myStyle.textInput}
            onChangeText={setUserName}
            placeholder="USERNAME"
          />
          <TextInput
            style={myStyle.textInput}
            onChangeText={setPass}
            secureTextEntry
            placeholder="PASSWORD"
          />
          <TouchableHighlight style={myStyle.button} onPress={onPress}>
            <Text style={myStyle.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    </View>
  );
};
export default App;

const myStyle = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: "column-reverse",
    // backgroundColor: "aqua",
    // alignItems: "center"
  },
  inner_container:{
    flex: 1,
    justifyContent:"center"
    
  },
  textInput: {
    borderWidth: 0,
    padding: 10,
    backgroundColor: 'hsla(175, 7%, 50%, 0.7)'
  },
  
  bg_image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    height: 50,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
