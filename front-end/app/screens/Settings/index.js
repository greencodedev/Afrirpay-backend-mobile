import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import CancelImg from '../../assets/images/Cancel.png';
import {useNavigation} from '@react-navigation/core';
import Sheet from './Sheet';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={CancelImg} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
        <View style={{width: 20}} />
      </View>
      <View style={styles.nameContent}>
        <Text style={styles.name}>Abdul Fouad</Text>
        <Text style={styles.phone}>+23456789001</Text>
      </View>
      <Sheet />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F8FC',
    paddingTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
  },
  topContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  nameContent: {
    marginVertical: 30,
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '600',
    color: '#182D64',
  },
  phone: {
    fontSize: 16,
    lineHeight: 20,
  },
  itemContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
