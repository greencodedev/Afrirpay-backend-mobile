import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Recent1Img from '../../assets/images/Recent1.png';
import Recent2Img from '../../assets/images/Recent2.png';
import P1Img from '../../assets/images/p1.png';
import BadgeImage from '../../components/BadgeImage';
import SettingParentContainer from './SettingsParentContainer';

const recentLists = [
  {
    id: 0,
    image: Recent1Img,
    status: '',
    title: 'New Card Added',
    description: 'A new card has been added',
  },
  {
    id: 1,
    image: Recent2Img,
    status: '',
    title: 'Privacy Policy Updated',
    description: 'Privacy Policy has been updated',
  },
  {
    id: 2,
    image: P1Img,
    status: 'green',
    title: 'Anela Smith',
    description: 'Sent you 898.343 worth of USDT',
  },
];

const Notification = () => {
  return (
    <SettingParentContainer title={'Notification'}>
      <View style={styles.recentContent}>
        <Text style={styles.noteText}>Recent Notification</Text>
        {recentLists.map(item => (
          <View style={styles.item} key={item.id}>
            {item.status.length === 0 ? (
              <Image source={item.image} resizeMode="contain" />
            ) : (
              <BadgeImage status={item.status} image={item.image} />
            )}
            <View style={styles.itemTextContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>
      <Text style={styles.noteText}>All Notification</Text>
    </SettingParentContainer>
  );
};
export default Notification;

const styles = StyleSheet.create({
  noteText: {
    fontSize: 14,
    color: '#082431',
    lineHeight: 14,
    letterSpacing: 0.3,
    marginVertical: 20,
  },

  recentContent: {
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7F7',
    marginTop: 20,
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextContent: {
    display: 'flex',
    marginLeft: 10,
    justifyContent: 'space-evenly',
  },
  image: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#252B48',
  },
  description: {
    fontSize: 12,
    color: '#2C3A4B',
  },
});
