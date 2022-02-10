import React, {useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import axios from 'axios';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;
import {COLORS, SIZES} from '../../constants/index';
import Logo from '../../assets/images/logo.png';

import GradientText from '../../constants/gradientText';
import Button from '../../components/Button';
// import { LinearGradient } from 'expo-linear-gradient';
export default function ConfirmPin({navigation, route}) {
  const [value, setValue] = useState('');

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  let {pin, phone} = route.params;

  const onPress = () => {
    let data = JSON.stringify({
      phone: phone,
      pin: pin,
      confirm_pin: value,
    });

    let config = {
      method: 'post',
      url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/create-pin',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        navigation.navigate('SignUpSuccess');
      })
      .catch(error => {
        console.log(error);
        alert(
          error.response.data.message && 'Pin does not match check pin again',
        );
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.topContain}>
          <Image style={styles.logo} source={Logo} />

          <Text style={styles.text}>Please Confirm PIN for</Text>

          <Text style={styles.phoneNumber}>{phone}</Text>
        </View>

        <View>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={(styles.codeFieldRoot, styles.inputContainer)}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
        </View>
        <View>
          <Button
            text="Continue"
            type="filled"
            bordered
            size="large"
            onPress={onPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
  },

  inner: {
    flex: 1,
    justifyContent: 'space-around',
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
});
