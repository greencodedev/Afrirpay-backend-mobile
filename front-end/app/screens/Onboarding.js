import React from 'react';
import {
  SafeAreaView,
  Image,
  StyleSheet,
  FlatList,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS, SIZES} from '../constants/index';

import OnboardingX from 'react-native-onboarding-swiper';

const {width, height} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const onPressLogin = () => {
    navigation.replace('Login');
  };

  const onPressSignup = () => {
    navigation.replace('Signup');
  };

  const Square = ({isLight, selected}) => {
    let backgroundColor;
    if (isLight) {
      backgroundColor = selected ? '#267DFF' : 'rgba(0, 0, 0, 0.3)';
    } else {
      backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
    }
    return (
      <View
        style={{
          width: 9,
          height: 9,
          borderRadius: 4,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };
  const Footer = () => {
    return (
      <View
        style={{
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
        }}>
     

        {/* Render buttons */}
        <View style={{marginBottom: 20}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btn,
                {
                  backgroundColor: '#8B16FF',
                },
              ]}
              onPress={onPressLogin}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: COLORS.white,
                }}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={{width: 15}} />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPressSignup}
              style={[
                styles.btn,
                {
                  borderColor: COLORS.purple2,
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                },
              ]}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 15,
                  color: COLORS.black,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} />
      <OnboardingX
        showNext={false}
        showSkip={false}
        bottomBarColor={'white'}
        showDone={false}
        DotComponent={Square}
        allowFontScalingText={false}
        titleStyles={{color: COLORS.dark_1, fontSize: 24, fontWeight: 'bold'}}
        subTitleStyles={{color: COLORS.dark_3, fontSize: 12, fontWeight: '500'}}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/Group4.png')} />,
            title: 'Smart payment, make smart lifestyle',
            subtitle:
              'sending money with your mobile device at your own ease making banking less dificult',
          },

          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/Group1.png')} />,
            title: 'Smart payment, make smart lifestyle',
            subtitle:
              'sending money with your mobile device at your own ease making banking less dificult',
          },

          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/Group3.png')} />,
            title: 'Smart payment, make smart lifestyle',

            subtitle:
              'sending money with your mobile device at your own ease making banking less dificult',
          },

          {
            backgroundColor: '#fff',
            image: <Image source={require('../assets/images/Group2.png')} />,
            title: 'Smart payment, make smart lifestyle',
            subtitle:
              'sending money with your mobile device at your own ease making banking less dificult',
          },
        ]}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-around',
  },
  subtitle: {
    color: 'grey',
    fontSize: 13,
    marginTop: 10,
    maxWidth: '60%',
    textAlign: 'center',
    lineHeight: 19,
  },
  title: {
    color: COLORS.black,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    maxWidth: '60%',
    textAlign: 'center',
  },
  image: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
  },
  indicator: {
    height: 9,
    width: 9,
    backgroundColor: 'grey',
    marginHorizontal: 3,
    borderRadius: 5,
  },
  btn: {
    flex: 1,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Onboarding;
