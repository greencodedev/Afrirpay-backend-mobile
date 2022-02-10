import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {IconlyProvider, ChevronLeft, Scan} from 'react-native-iconly';
import WalletSuccessImg from '../../assets/images/Wallet_Success.png';
import GlobalStyles from '../../style/globalStyle';
import Button from '../../components/Button';

const WalletConfirm = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={GlobalStyles.justifyBetweenContent}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconlyProvider
            set="light"
            primaryColor={'#182D64'}
            secondaryColor={'#182D64'}
            stroke="bold"
            size="medium">
            <ChevronLeft />
          </IconlyProvider>
        </TouchableOpacity>
      </View>
      <View style={{display: 'flex', alignItems: 'center'}}>
        <Image source={WalletSuccessImg} resizeMode="contain" />
        <Text style={styles.notificationText}>Coin Sent!</Text>
        <Text style={styles.amountText}>3.094782 ETH</Text>
        <Text style={styles.recipientText}>To Samuel Wellington</Text>
      </View>
      <View>
        <Button text="Done" bordered={true} onPress={() => alert('')} />
        <View style={{marginTop: 15}}>
          <Button
            text="Share Reciept"
            bordered={true}
            type="outlined"
            onPress={() => navigation.navigate('Referral')}
          />
        </View>
      </View>
    </View>
  );
};

export default WalletConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  notificationText: {
    fontSize: 24,
    color: '#252B48',
    lineHeight: 29,
    marginTop: 15,
  },
  amountText: {
    color: '#252B48',
    fontWeight: 'bold',
    fontSize: 25,
    lineHeight: 30,
    marginTop: 30,
    marginBottom: 8,
  },
  recipientText: {
    fontSize: 18,
    lineHeight: 21,
    color: '#252B48',
  },
});
