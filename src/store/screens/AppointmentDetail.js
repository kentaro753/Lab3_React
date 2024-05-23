import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import {Text, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import { useMyContextProvider } from '..';

const AppointmentDetail = ({navigation}) => {
  const [controller, dispatch] = useMyContextProvider();
  const {userLogin} = controller;
  const route = useRoute();
  const {id} = route.params;
  const APPOIMENTS = firestore().collection('APPOINTMENTS');
  const dSERVICE = firestore().collection('SERVICES');
  const [datetime, setDatetime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState('');
  const handleUpdateAppointment = () => {
    APPOIMENTS.doc(id)
      .update({
        datetime,
        stateUpdate: 'fix',
      })
      .then(e => console.log(e.meassage));
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Delete',
      'Do you want to delete this appointment',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('Hủy xóa'),
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: handleDelete,
        },
      ],
      {cancelable: false},
    );
  };

  const handleDelete = () => {
    APPOIMENTS.doc(id)
      .delete()
      .then(() => {
        Alert.alert('Delete susscess');
        navigation.goBack();
      })
      .catch(e => Alert.alert('Delete fail', e.message));
  };

  useEffect(() => {
    if (userLogin == null) {
      navigation.navigate('Signin');
    }

    const getDetailAppointment = APPOIMENTS.doc(id).onSnapshot(doc => {
      if (doc.exists) {
        const appointmentData = doc.data();
        const serviceId = appointmentData.serviceId;
        dSERVICE
          .doc(serviceId)
          .get()
          .then(serviceDoc => {
            if (serviceDoc.exists) {
              const serviceName = serviceDoc.data().serviceName;
              const price = serviceDoc.data().price;
              const image = serviceDoc.data().image;
              const appointmentWithServiceName = {
                ...appointmentData,
                serviceName: serviceName,
                price: price,
                image: image,
              };
              setAppointment(appointmentWithServiceName);
            } else {
              console.log('Dịch vụ không tồn tại');
            }
          });
      } else getDetailAppointment(null);
    });
    return () => getDetailAppointment();
  }, [userLogin]);

  return (
    <View style={{flex: 1, padding: 20}}>
      {appointment ? (
        <>
          <View style={{marginBottom: 10}}>
            {appointment.image && (
              <Image source={{uri: appointment.image}} style={{height: 300}} />
            )}
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={styles.txtName}>Customer name: </Text>
            <Text style={{fontSize: 18}}>{appointment.customerId}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={styles.txtName}>Seivce name: </Text>
            <Text style={{fontSize: 18}}>{appointment.serviceName}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={styles.txtName}>Price: </Text>
            <Text style={{fontSize: 18}}>{appointment.price}</Text>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 10}}>
            <Text style={styles.txtName}>Date: </Text>
            <Text style={{fontSize: 18}}>
              {appointment.datetime.toDate().toLocaleString()}
            </Text>
          </View>
          <View
            style={{
              marginBottom: 10,
              borderWidth: 1,
              borderColor: '#000',
              borderRadius: 5,
              padding: 5,
            }}>
            <TouchableOpacity onPress={() => setOpen(true)}>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Choose date time:{' '}
              </Text>
              <Text style={{fontSize: 18}}>
                {datetime.toLocaleDateString() +
                  ' ' +
                  datetime.toLocaleTimeString()}
              </Text>
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            open={open}
            date={datetime}
            onConfirm={date => {
              setOpen(false);
              setDatetime(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <Button
            mode="contained"
            onPress={handleUpdateAppointment}
            style={{
              borderRadius: 5,
              backgroundColor: '#F08080',
              marginTop: 10,
            }}
            disabled={appointment.complete ? true : false}>
            Update
          </Button>
          <Button
            mode="contained"
            onPress={confirmDelete}
            style={{
              borderRadius: 5,
              backgroundColor: '#F08080',
              marginTop: 10,
            }}
            disabled={appointment.complete ? true : false}>
            Cancel service
          </Button>
        </>
      ) : (
        <Text style={{fontSize: 18}}>Appointment not found or deleted</Text>
      )}
    </View>
  );
};

export default AppointmentDetail;

const styles = StyleSheet.create({
  txtName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});