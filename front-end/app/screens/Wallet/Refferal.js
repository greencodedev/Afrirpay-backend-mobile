import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {IconlyProvider, ChevronLeft, Scan} from 'react-native-iconly';
import {useNavigation} from '@react-navigation/core';

import ReferralImg from '../../assets/images/Referral.png';
import GlobalStyles from '../../style/globalStyle';
import {COLORS} from '../../constants';
import Button from '../../components/Button';

const Refferal = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={[GlobalStyles.justifyBetweenContent, {marginBottom: 20}]}>
        <View style={GlobalStyles.rowContainer}>
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
          <Text style={styles.title}>Refer and Earn</Text>
        </View>
        <IconlyProvider
          set="light"
          primaryColor={'#B2B9CE'}
          secondaryColor={'#B2B9CE'}
          stroke="bold"
          size="medium">
          <Scan />
        </IconlyProvider>
      </View>
      <View style={[styles.card, {marginVertical: 10}]}>
        <Text
          style={[
            GlobalStyles.font20,
            GlobalStyles.fontBold,
            {color: COLORS.dark_1},
          ]}>
          Referral
        </Text>
        <View style={GlobalStyles.justifyBetweenContent}>
          <Text
            style={[
              GlobalStyles.font12,
              GlobalStyles.fontBold,
              {color: COLORS.text3},
            ]}>
            Total No of referral
          </Text>
          <Text
            style={[
              GlobalStyles.font14,
              GlobalStyles.fontBold,
              {color: COLORS.text3},
            ]}>
            12
          </Text>
        </View>
        <View style={GlobalStyles.justifyBetweenContent}>
          <Text
            style={[
              GlobalStyles.font12,
              GlobalStyles.fontBold,
              {color: COLORS.text3},
            ]}>
            Total No of Qualified referral
          </Text>
          <Text
            style={[
              GlobalStyles.font14,
              GlobalStyles.fontBold,
              {color: COLORS.darkBlue},
            ]}>
            05
          </Text>
        </View>
      </View>
      <View style={[styles.card, styles.center, {marginBottom: 10}]}>
        <Image source={ReferralImg} resizeMode="contain" />
        <Text
          style={[
            GlobalStyles.fontBold,
            styles.marginVertical10,
            {color: COLORS.dark_1},
          ]}>
          Refer and Earn Free Token
        </Text>
        <Text style={[GlobalStyles.font12, styles.marginVertical10]}>
          {' '}
          Introducing AfrirPay Referral. As part of this new program we will be
          giving away upto 100% of our earning from your referral. And it does
          not stop there. You get a chance to win upto 10,000 free tokens.
          Refer, like, share and Earn.
        </Text>
      </View>
      <Text style={[GlobalStyles.font14, {color: COLORS.dark_1}]}>
        Your Referal Link
      </Text>
      <View
        style={[
          GlobalStyles.justifyBetweenContent,
          styles.marginVertical10,
          styles.linkContent,
        ]}>
        <Text style={[GlobalStyles.font12, {color: COLORS.text3}]}>
          https://www.afrirpay.com/?refcode=RRPSFAS
        </Text>
        <Button text="Copy" bordered size="small" />
      </View>
      <Button text="Initiate Transaction" bordered size="large" />
      <View style={[GlobalStyles.autoCenter, styles.marginVertical10]}>
        <Text style={[GlobalStyles.font14, {color: COLORS.darkBlue}]}>
          Terms and Conditions Applied
        </Text>
      </View>
    </View>
  );
};

export default Refferal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginLeft: 15,
    fontSize: 16,
    color: COLORS.dark_1,
    fontWeight: 'bold',
  },
  card: {
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
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DFE2E4',
  },
  marginVertical10: {
    marginVertical: 10,
  },
});
