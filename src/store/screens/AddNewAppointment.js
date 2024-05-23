import { useEffect, useLayoutEffect, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
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
import DatePicker from "react-native-date-picker";

const AddNewAppointment = ({ navigation, route }) => {
  const { id } = route.params.item;
  const [controller, dispatch] = useMyContextProvider();
  const { userLogin } = controller;
  const [service, setService] = useState({});
  const [visible, setVisible] = useState(false);

  const SERVICES = firestore().collection("SERVICES");

  const hasErrorServiceName = () => service.serviceName === "";
  const hasErrorPrice = () => Number(service.price) <= 0;
  const [datetime, setDatetime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const APPOIMENTS = firestore().collection("APPOINTMENTS");
  const handleAddNewApppoiment = () => {
    APPOIMENTS.add({
      customerId: userLogin.fullName,
      serviceId: id,
      datetime,
      state: "new",
      complete: false,
      email: userLogin.email,
    }).then((response) =>
      APPOIMENTS.doc(response.id).update({ id: response.id })
    );
    navigation.goBack();
  };

  useEffect(() => {
    const getDetailService = SERVICES.doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setService(doc.data());
      } else setService(null);
    });
    return () => getDetailService();
  }, [id]);

  return (
    service && (
      <View style={{ flex: 1, padding: 10 }}>
        {service.image && (
          <Image source={{ uri: service.image }} style={{ height: 300 }} />
        )}
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Service name:{" "}
          </Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {service.serviceName}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Price:{" "}
          </Text>
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {service.price}
          </Text>
        </View>

        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <Text>
              Choose date time:{" "}
              {datetime.toLocaleDateString() +
                " " +
                datetime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
        </View>
        <DatePicker
          modal
          open={open}
          date={datetime}
          onConfirm={(date) => {
            setOpen(false);
            setDatetime(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Button
          mode="contained"
          onPress={handleAddNewApppoiment}
          style={{
            borderRadius: 10,
            marginTop: 20,
            padding: 5,
            backgroundColor: "#F08080",
          }}
        >
          Add New Appointment
        </Button>
      </View>
    )
  );
};

export default AddNewAppointment;
