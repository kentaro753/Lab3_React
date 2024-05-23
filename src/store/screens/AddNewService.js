import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { Button, HelperText, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useMyContextProvider } from "..";
import ImageCropPicker from "react-native-image-crop-picker";
import { Image } from "react-native";
import storage from "@react-native-firebase/storage";

const AddNewService = ({ navigation }) => {
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [serviceName, setServiceName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const hasErrorServiceName = () => serviceName == "";
  const hasErrorPrice = () => price <= 0;
  const SERVICES = firestore().collection("SERVICES");
  const handleAddNewService = () => {
    SERVICES.add({ serviceName, price, createBy: userLogin.fullName })
      .then((response) => {
        const refImage = storage().ref("/images/" + response.id + ".jpg");
        if (image != "") {
          refImage
            .putFile(image)
            .then(() => {
              refImage
                .getDownloadURL()
                .then((link) =>
                  SERVICES.doc(respone.id).update({ image: link })
                );
            })
            .catch((e) => console.log(e.message));
        }
        SERVICES.doc(response.id).update({ id: response.id });
        Alert.alert("Add new service success");
        navigation.goBack();
      })
      .catch((e) => Alert.alert(e.message));
  };
  const handleUploadImage = () => {
    ImageCropPicker.openPicker({
      height: 300,
      width: 400,
      mediaType: "photo",
      cropping: true,
    })
      .then((pic) => setImage(pic.path))
      .catch((e) => console.log(e.message));
  };
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button onPress={handleUploadImage}>Upload Image</Button>
      {image != "" && <Image source={{ uri: image }} style={{ height: 300 }} />}

      <TextInput
        style={{ marginTop: 50 }}
        label={"Input service name"}
        value={serviceName}
        onChangeText={setServiceName}
      />
      <HelperText type="error" visible={hasErrorServiceName}>
        Service Name not empty
      </HelperText>
      <TextInput
        keyboardType="numeric"
        label={"Input Price"}
        value={price}
        onChangeText={setPrice}
      />
      <HelperText type="error" visible={hasErrorPrice}>
        {"Price > 0"}
      </HelperText>
      <Button
        mode="contained"
        onPress={handleAddNewService}
        buttonColor="blue"
        style={{
          borderRadius: 10,
          marginTop: 20,
          padding: 5,
          backgroundColor: "#F08080",
        }}
      >
        Add Service
      </Button>
    </View>
  );
};
export default AddNewService;
