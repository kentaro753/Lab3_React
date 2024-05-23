import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import { logout, useMyContextProvider } from '..';

export default function Setting({navigation}) {
  const [controller, dispatch] = useMyContextProvider();
  const {userLogin} = controller;
  useEffect(() => {
    if (userLogin == null) navigation.navigate('Login');
  }, [navigation, userLogin]);
  const onSubmit = () => {
    logout(dispatch);
  };
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('ChangePass')}>
        Đổi mât khẩu
      </Button>
      <Button style={styles.button} mode="contained" onPress={onSubmit}>
        Đăng xuất
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#F08080',
  },
});