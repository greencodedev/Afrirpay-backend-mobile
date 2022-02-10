import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {IconlyProvider, ChevronLeft} from 'react-native-iconly';

const SettingParentContainer = ({children, title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
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
        <Text style={styles.title}>{title}</Text>
        <View style={{width: 30}} />
      </View>
      {children}
    </View>
  );
};

export default SettingParentContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // backgroundColor: '#F1F3FA',
  },
  topContent: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: '#182D64',
    fontWeight: '700',
  },
});
