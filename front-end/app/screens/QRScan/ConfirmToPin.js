import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import ConfirmPinImg from '../../assets/images/confirmPin.png';
import Button from '../../components/button';

const ConfirmToPin = () => {
  return (
    <View style={styles.container}>
      <Image source={ConfirmPinImg} resizeMethod="center" />
      <Text>Money Sent!</Text>
      <Text>500.00 USD</Text>
      <Text>To Mariana Dickey</Text>
      <View>
        <Button text={'Done'} />
        <Button text={'Share Reciept'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ConfirmToPin;
