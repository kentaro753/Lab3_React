import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, View } from "react-native";
import {
  Button,
  Dialog,
  HelperText,
  Portal,
  TextInput,
  Text,
  IconButton,
} from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useMyContextProvider } from "..";
import ImageCropPicker from "react-native-image-crop-picker";
import { Image } from "react-native";
import storage from "@react-native-firebase/storage";

const ServiceDetail = ({ navigation, route }) => {
  const { id } = route.params.item;
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [service, setService] = useState({});
  const [visible, setVisible] = useState(false);

  const SERVICES = firestore().collection("SERVICES");

  const hasErrorServiceName = () => service.serviceName === "";
  const hasErrorPrice = () => Number(service.price) <= 0;

  useEffect(() => {
    const unsubscribe = SERVICES.doc(id).onSnapshot((response) => {
      const data = response.data();
      setService(data);
    });
    return () => unsubscribe();
  }, [id]);

  const handleUpdateService = () => {
    const serviceToUpdate = {
      serviceName: service.serviceName,
      price: Number(service.price),
      updatedBy: userLogin.fullName,
    };

    SERVICES.doc(id)
      .update(serviceToUpdate)
      .then(() => {
        if (service.image && typeof service.image === 'string') {
          const refImage = storage().ref("/images/" + id + ".jpg");
          refImage
            .putFile(service.image)
            .then(() => refImage.getDownloadURL())
            .then((link) => {
              SERVICES.doc(id)
                .update({
                  ...serviceToUpdate,
                  image: link,
                })
                .then(() => {
                  Alert.alert("Update success!");
                  navigation.goBack();
                })
                .catch((e) => Alert.alert("Update failed", e.message));
            })
            .catch((e) => console.error("Upload image failed", e));
        } else {
          Alert.alert("Update success!");
          navigation.goBack();
        }
      })
      .catch((e) => Alert.alert("Update failed", e.message));
  };

  const handleUploadImage = () => {
    ImageCropPicker.openPicker({
      height: 300,
      width: 400,
      mediaType: "photo",
      cropping: true,
    })
      .then((response) => setService({ ...service, image: response.path }))
      .catch((e) => console.log(e.message));
  };

  const handleDeleteService = () => {
    SERVICES.doc(id)
      .delete()
      .then(() => navigation.navigate("Service"))
      .catch((e) => console.log("Delete failed:", e.message));
  };

  const hideDialog = () => setVisible(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <IconButton
          icon="delete"
          {...props}
          onPress={() => setVisible(true)}
          iconColor="white"
        />
      ),
    });
  }, [navigation]);

  return (
    service && (
      <View style={{ flex: 1, padding: 10 }}>
        <Button onPress={handleUploadImage}>Upload Image</Button>
        {service.image && (
          <Image source={{ uri: service.image }} style={{ height: 300 }} />
        )}
        <TextInput
          style={{ marginTop: 50 }}
          label="Input service name"
          value={service.serviceName}
          onChangeText={(text) =>
            setService((prevService) => ({ ...prevService, serviceName: text }))
          }
        />
        <HelperText type="error" visible={hasErrorServiceName()}>
          Service Name not empty
        </HelperText>
        <TextInput
          keyboardType="numeric"
          label="Input Price"
          value={String(service.price)}
          onChangeText={(text) =>
            setService((prevService) => ({ ...prevService, price: text }))
          }
        />
        <HelperText type="error" visible={hasErrorPrice()}>
          Price must be greater than 0
        </HelperText>
        <Button
          mode="contained"
          onPress={handleUpdateService}
          buttonColor="blue"
          style={{
            borderRadius: 10,
            marginTop: 20,
            padding: 5,
            backgroundColor: "#F08080",
          }}
          disabled={hasErrorPrice() || hasErrorServiceName()}
        >
          Update Service
        </Button>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Confirm Delete Service</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Do you want to delete this service?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDeleteService}>Yes</Button>
              <Button onPress={hideDialog}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    )
  );
};

export default ServiceDetail;