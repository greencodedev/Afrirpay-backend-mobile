import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import P1 from '../../assets/images/p1.png';
import P2 from '../../assets/images/p2.png';
import P3 from '../../assets/images/p3.png';
import P4 from '../../assets/images/p4.png';

const lists = [
  {
    id: 0,
    image: P1,
    name: 'Amin Ayub',
    date: 'Feb 09, 2020',
    range: '+0.002',
    currency: 'BTC',
    color: '#F89E00',
  },
  {
    id: 1,
    image: P2,
    name: 'Babla Khan',
    date: 'Feb 08, 2020',
    range: '+0.12',
    currency: 'ETC',
    color: '#5665DB',
  },
  {
    id: 2,
    image: P3,
    name: 'Samson Malik',
    date: 'Feb 01, 2020',
    range: '+0.003',
    currency: 'BTC',
    color: '#F89E00',
  },
  {
    id: 3,
    image: P4,
    name: 'Miftah Jaman',
    date: 'Jan 29, 2020',
    range: '+0.1',
    currency: 'MTC',
    color: '#5DB2F3;',
  },
];

const renderItem = ({item}) => {
  return (
    <View key={item.id} style={styles.item}>
      <View style={styles.row}>
        <Image source={item.image} style={styles.image} />
        <View style={{marginLeft: 15}}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          alignItems: 'flex-end',
        }}>
        <Text>{item.range}</Text>
        <View style={styles.row}>
          <View style={[styles.dot, {backgroundColor: item.color}]}></View>
          <Text style={styles.date}>{item.currency}</Text>
        </View>
      </View>
    </View>
  );
};

const Transactions = () => {
  return (
    <View style={{flex: 1, width: '100%'}}>
      <FlatList style={styles.container} data={lists} renderItem={renderItem} />
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    width: '100%',
    flexGrow: 1,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#EDECEC',
    borderBottomWidth: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fefefe',
  },
  name: {
    color: '#444444',
    fontSize: 14,
    fontWeight: 'bold',
  },
  date: {
    color: '#A8A8A8',
    fontSize: 12,
  },
  range: {
    fontSize: 12,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginRight: 3,
  },
});
