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
import {CheckBox} from '@ui-kitten/components';

import Button from '../../components/Button';

import EtherPNG from '../../assets/images/Ether.png';
import CardanoPNG from '../../assets/images/Cardano.png';
import TronxPNG from '../../assets/images/Tronx.png';
import DogeCoinPNG from '../../assets/images/Dogecoin.png';

import GlobalStyles from '../../style/globalStyle';
import {COLORS} from '../../constants';
import Contacts from '../Dashboard/Contacts';

const coinLists = [
  {
    id: 0,
    name: 'Ethereum',
    image: EtherPNG,
    description: '1 ETH - $1000',
  },
  {
    id: 1,
    name: 'Cardano',
    image: CardanoPNG,
    description: '1 ADA - $1000',
  },
  {
    id: 2,
    name: 'Tronx',
    image: TronxPNG,
    description: '1 ADA - $1000',
  },
  {
    id: 3,
    name: 'Dogecoin',
    image: DogeCoinPNG,
    description: '1 ADA - $1000',
  },
];

const EscrowRequest = () => {
  const navigation = useNavigation();
  const [selectedCoin, setCoin] = useState(-1);
  const [checked, setCheck] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
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
      <Contacts title="Transact with" description="Recent" isFlag showAll />
      <View>
        <Text
          style={[
            GlobalStyles.font14,
            GlobalStyles.fontBold,
            {color: COLORS.dark_1},
          ]}>
          Coin to be exchanged
        </Text>
        <View style={styles.coinContainer}>
          {coinLists.map((coinlist, index) => (
            <TouchableOpacity
              key={coinlist.id}
              style={[
                styles.coinCard,
                {
                  backgroundColor:
                    index === selectedCoin ? '#4A5AFF' : COLORS.grey,
                },
              ]}
              onPress={() => setCoin(coinlist.id)}>
              <Image source={coinlist.image} resizeMode="contain" />
              <Text
                style={[
                  GlobalStyles.font10,
                  {color: index === selectedCoin ? 'white' : COLORS.dark_1},
                ]}>
                {coinlist.name}
              </Text>
              <Text
                style={[
                  GlobalStyles.font8,
                  {color: index === selectedCoin ? 'white' : COLORS.dark_1},
                ]}>
                {coinlist.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={GlobalStyles.flexEnd}>
          <Text
            style={[
              GlobalStyles.font14,
              {color: COLORS.darkBlue, fontWeight: '500'},
            ]}>
            Show Portfolio
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingVertical: 10}}>
        <Text
          style={[
            GlobalStyles.font14,
            GlobalStyles.fontBold,
            {color: COLORS.dark_1, marginBottom: 10},
          ]}>
          How much are you exchanging?
        </Text>
        <TextInput placeholder="Coin Value" style={styles.cointTextInput} />
        <TextInput placeholder="Dollar Value" style={styles.cointTextInput} />
      </View>
      <CheckBox
        checked={checked}
        onChange={e => setCheck(e)}
        style={{marginBottom: 20}}>
        I Agree to <Text style={styles.hightlightText}>Terms of Service</Text>{' '}
        and <Text style={styles.hightlightText}>Terms of Use </Text>
      </CheckBox>
      <Button
        text="Initiate Transaction"
        isDisabled={!checked || selectedCoin == -1}
        bordered={true}
        onPress={() => navigation.navigate('WalletConfirm')}
      />
    </SafeAreaView>
  );
};

export default EscrowRequest;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 20,
    // display: 'flex',
    // justifyContent: 'space-between',
  },
  coinContainer: {
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  coinCard: {
    // backgroundColor: COLORS.grey,
    padding: 10,
    borderRadius: 10,
  },
  cointTextInput: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: COLORS.grey,
    fontSize: 14,
    color: COLORS.dark_2_0,
    borderRadius: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  hightlightText: {
    color: '#4A5AFF',
  },
});
