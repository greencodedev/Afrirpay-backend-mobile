import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {ChevronLeft, IconlyProvider, ArrowUpSquare} from 'react-native-iconly';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

import Person1 from '../../assets/images/p1.png';
import Person2 from '../../assets/images/p2.png';
import Person3 from '../../assets/images/p3.png';
import Person4 from '../../assets/images/p4.png';
import Person5 from '../../assets/images/p5.png';
import Person6 from '../../assets/images/p6.png';
import Person7 from '../../assets/images/p6.png';
import Recent from '../../assets/images/Scan.png';

import Button from '../../components/Button';

import {COLORS, SIZES} from '../../constants/theme';

const lists = [
  {
    id: 1,
    image: Person1,
  },
  {
    id: 2,
    image: Person2,
  },
  {
    id: 3,
    image: Person3,
  },
  {
    id: 4,
    image: Person4,
  },
  {
    id: 5,
    image: Person5,
  },
  {
    id: 6,
    image: Person6,
  },
  {
    id: 7,
    image: Person7,
  },
];

const QRScan = () => {
  const navigation = useNavigation();

  function renderNumbers() {
    return (
      <View style={{marginTop: SIZES.padding * 2, justifyContent: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between ',
            marginTop: SIZES.padding * 2,
            marginLeft: 23,
          }}>
          <Text
            style={{
              fontSize: SIZES.font * 1.5,
              fontWeight: 'bold',
              color: '#A8A8A8',
            }}>
            Send to
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          {/* Phone Number */}
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              width: 30,
              height: 30,
              left: 0,
            }}>
            <IconlyProvider
              set="light"
              primaryColor={COLORS.primary}
              secondaryColor="blue"
              stroke="bold"
              size="small">
              <ArrowUpSquare set="bold" primaryColor={COLORS.primary} />
            </IconlyProvider>
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              marginVertical: SIZES.padding,
              marginTop: 10,
              color: COLORS.white,
              borderColor: '#d0d2d6',
              borderRadius: 7,
              borderWidth: 1,
              height: 35,
              marginVertical: SIZES.padding,
              backgroundColor: COLORS.dark_5,
              marginLeft: 25,
              maxWidth: 300,
            }}
            placeholder="     Enter Phone Number"
            placeholderTextColor="grey"
            selectionColor={COLORS.primary}
          />

          {/* Scan Code */}
          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              marginHorizontal: 5,
              flexDirection: 'row',
            }}>
            <View style={{justifyContent: 'center', marginLeft: 5}}>
              <Image
                source={Recent}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity>
            <IconlyProvider
              set="light"
              primaryColor={'#A8A8A8'}
              secondaryColor={'#A8A8A8'}
              stroke="bold"
              size="medium">
              <ChevronLeft />
            </IconlyProvider>
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.headerText}>Send money to Contacts</Text>
          </View>
          <Text style={styles.title}>Recents</Text>
          <View
            style={{
              flexDirection: 'column-reverse',
            }}>
            <ScrollView horizontal>
              {lists.map(item => (
                <TouchableOpacity>
                  <Image
                    key={item.id}
                    source={item.image}
                    style={styles.image}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
            {/* <View style={{
       marginTop: 10,
    marginLeft: 23,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'column-reverse',
    backgroundColor: 'pink',
     }}>
            <Text style={{
              fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    alignItems: 'flex-end',
    color: 'red',
    backgroundColor: 'green'
            }}>No recent contacts</Text>
            
            </View> */}
          </View>

          {renderNumbers()}
          <Button
            text="Continue"
            type="filled"
            bordered
            size="large"
            isDisabled={!isValid}
            onPress={() => navigation.navigate('')}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default QRScan;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 23,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4E5C80',
  },
  title: {
    fontSize: 14,
    color: '#A8A8A8',
    paddingLeft: 24,
    fontWeight: 'bold',
    marginVertical: 15,
    marginTop: 32,
  },
  scrollview: {
    marginVertical: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
  },

  // i want to align the text to the right of the screen
  bottom: {
    marginTop: 10,
    marginLeft: 23,
    marginBottom: 20,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'column-reverse',
    backgroundColor: 'pink',
  },
  bottomText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    alignItems: 'flex-end',
    color: 'red',
  },
});
