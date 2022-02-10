import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {IconlyProvider, ChevronLeft, Scan} from 'react-native-iconly';
import {useNavigation} from '@react-navigation/core';

import Goods from '../../assets/images/escrow_goods.png';
import Service from '../../assets/images/escrow_service.png';
import Crypto from '../../assets/images/escrow_crypto.png';
import Loan from '../../assets/images/escrow_loan.png';
import GlobalStyles from '../../style/globalStyle';
import {COLORS} from '../../constants';

const lists = [
  {
    id: 1,
    title: 'Goods Escrow',
    description:
      'Lock up funds until goods purchased are delivered and received in satisfactor conditions.',
    image: Goods,
  },
  {
    id: 2,
    title: 'Service Escrow',
    description:
      'Lock up funds until both parties are satisfied with the outcome of the transaction.',
    image: Service,
  },
  {
    id: 3,
    title: 'Crypto Escrow',
    description:
      'Buy and sell crypto assets the secure way. Secure payment on Afrirpay to avoid the risk of fraud.',
    image: Crypto,
  },
  {
    id: 4,
    title: 'Loan Escrow',
    description:
      'Buy and sell crypto assets the secure way. Secure payment on Afrirpay to avoid the risk of fraud.',
    image: Loan,
  },
];

const Wallet = () => {
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
        <IconlyProvider
          set="light"
          primaryColor={'#B2B9CE'}
          secondaryColor={'#B2B9CE'}
          stroke="bold"
          size="medium">
          <Scan />
        </IconlyProvider>
      </View>
      <Text
        style={[
          GlobalStyles.font16,
          GlobalStyles.fontBold,
          {color: COLORS.dark_1, paddingVertical: 20},
        ]}>
        Choose Transaction Type
      </Text>
      {lists.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          onPress={() => navigation.navigate('EscrowRequest')}>
          <View style={styles.leftContent}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
          <Image source={item.image} resizeMode="contain" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F3FA',
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  leftContent: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '75%',
  },
  title: {
    fontSize: 14,
    color: '#182D64',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
    color: '#2C3A4B',
  },
});
