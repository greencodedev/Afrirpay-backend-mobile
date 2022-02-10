import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import SpecialOfferImg from '../../assets/images/SpecialOffer.png';

const SpecialOffer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBar}>
        <Text style={styles.title}>Special Offer!</Text>
        <Text style={[styles.description, styles.mb10]}>
          Flat $0 Cashback on Your First Payment.
        </Text>
      </View>
      <View style={styles.rightBar}>
        <Image source={SpecialOfferImg} style={styles.img} resizeMode="cover" />
      </View>
    </View>
  );
};

export default SpecialOffer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 22,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 24,
    marginVertical: 15,
  },
  leftBar: {
    display: 'flex',
    width: '50%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  mb10: {
    marginBottom: 10,
  },
  rightBar: {
    width: '50%',
    paddingHorizontal: 5,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
  },
  img: {
    // width: 145,
    // height: 100,
  },
});
