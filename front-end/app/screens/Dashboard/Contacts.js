import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import Person1 from '../../assets/images/p1.png';
import Person2 from '../../assets/images/p2.png';
import Person3 from '../../assets/images/p3.png';
import Person4 from '../../assets/images/p4.png';
import Person5 from '../../assets/images/p5.png';
import Person6 from '../../assets/images/p6.png';
import {COLORS} from '../../constants';
import GlobalStyles from '../../style/globalStyle';

const lists = [
  {
    id: 0,
    image: Person1,
    countryCode: 'se',
  },
  {
    id: 1,
    image: Person2,
    countryCode: 'de',
  },
  {
    id: 2,
    image: Person3,
    countryCode: 'ch',
  },
  {
    id: 3,
    image: Person4,
    countryCode: 'gs',
  },
  {
    id: 4,
    image: Person5,
    countryCode: 'cn',
  },
  {
    id: 5,
    image: Person6,
    countryCode: 'no',
  },
];

const Contacts = ({title, description, isFlag, showAll}) => {
  const [selected, setSelect] = useState(-1);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {paddingLeft: isFlag ? 0 : 24}]}>
        {title}
      </Text>
      {description && <Text style={styles.description}>{description}</Text>}
      <ScrollView horizontal>
        {lists.map((item, idx) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelect(item.id)}
            style={[
              {borderWidth: selected === idx ? 1 : 0},
              styles.avatarContainer,
            ]}>
            <Image source={item.image} style={styles.image} />
            {isFlag && (
              <View style={styles.flagContent}>
                <CountryFlag
                  size={15}
                  isoCode={item.countryCode}
                  style={styles.flag}
                />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      {showAll && (
        <TouchableOpacity style={styles.showAll}>
          <Text
            style={[
              GlobalStyles.font14,
              {color: COLORS.darkBlue, fontWeight: '500'},
            ]}>
            Show all contacts
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    color: '#4E5C80',
    // paddingLeft: 24,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  description: {
    fontSize: 12,
    color: COLORS.dark_4,
    marginLeft: 10,
    marginBottom: 10,
  },
  scrollview: {
    marginVertical: 15,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 2,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#4A5AFF80',
    marginLeft: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  showAll: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  flagContent: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 3,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
});
