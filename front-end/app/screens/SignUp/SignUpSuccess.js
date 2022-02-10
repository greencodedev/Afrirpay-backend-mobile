import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  Alert,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {Text} from '@ui-kitten/components';

const CELL_COUNT = 4;
import {COLORS, SIZES} from '../../constants/index';
import Logo from '../../assets/images/logo.png';

import GradientText from '../../constants/gradientText';
import Thankyou from '../../assets/images/thankyou.svg';
import successBg from '../../assets/images/successBg.png';

import Button from '../../components/Button';

export default function SignUpSuccess({navigation, route}) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={successBg}
        style={styles.bgimage}
        resizeMode="contain">
        <View style={styles.inner}>
          <View style={styles.topContain}>
            <Image style={styles.logo} source={Logo} />

            {/* <Text style={styles.phoneNumber}>{realPhoneNumber}</Text> */}
          </View>

          <View style={styles.topContain}>
            <Thankyou />

            <Text style={styles.thankyoutext} category="h1">
              Thank You
            </Text>

            <Text style={styles.signuptext} category="p1">
              You have successfully signup
            </Text>
          </View>
          <View>
            <Button
              text="Let's Go"
              type="filled"
              bordered
              size="large"
              onPress={onPress}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },

  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },

  input: {
    backgroundColor: 'red',
    padding: SIZES.base * 1,
    backgroundColor: '#F1F3FA',
    borderRadius: SIZES.base * 1,
  },
  //   style for inputText
  inputText: {
    fontSize: SIZES.base * 2,
    color: COLORS.appPrimary,
    fontWeight: 'bold',
    marginRight: SIZES.base * 2,
    backgroundColor: '#F1F3FA',
    padding: SIZES.base * 1,
    borderRadius: SIZES.base * 1,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
    color: COLORS.appPrimary,
  },

  text: {
    color: '#4E5C80',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 20,
  },

  topContain: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  root: {padding: 20, minHeight: 200},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 5},
  cell: {
    width: 60,
    height: 50,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#E9ECF4',
    textAlign: 'center',
    backgroundColor: '#F1F3FA',
    borderRadius: 10,
    paddingTop: 5,
  },
  focusCell: {
    borderColor: '#F1F3FA',
  },

  phoneNumber: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    color: COLORS.dark_2,
    //   color:Color.dark_2,
  },

  thankyoutext: {
    fontWeight: '700',
    color: COLORS.dark_1,
    fontSize: 24,
    marginTop: 13,
  },

  signuptext: {
    color: COLORS.dark_4,
    marginVertical: 10,
  },

  bgimage: {
    flex: 1,
    justifyContent: 'center',
    // width: 100, height: '50%'
  },
});
