import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  Keyboard,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from 'react-native';

import {Radio, RadioGroup, Text} from '@ui-kitten/components';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {
  IconlyProvider,
  Home,
  Notification,
  User,
  Call,
  Phone,
} from 'react-native-iconly';

const CELL_COUNT = 4;
import {COLORS, SIZES} from '../../constants/index';
import Logo from '../../assets/images/logo.png';

import GradientText from '../../constants/gradientText';
import Button from '../../components/Button';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import * as yup from 'yup';
import {Formik} from 'formik';
export default function ResetPassoword({navigation, route}) {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const phoneOrEmailRegExp = /^(?:\d{11}|\w+@\w+\.\w{2,3})$/;

  let resetPinSchema = yup.object().shape({
    phone: yup
      .string()
      .required('Please enter your phone number or email ')
      .matches(phoneOrEmailRegExp, 'Phone number or email is not valid'),
  });

  return (
    <Formik
      initialValues={{phone: ''}}
      onSubmit={values => {
        let data = JSON.stringify({
          phone: values.phone,
        });

        let config = {
          method: 'post',
          url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/validate-phone',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            alert(response.data.message);
            navigation.navigate('ResetOtp', {userPhoneNumber: values.phone});

            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }}
      validateOnMount={true}
      validationSchema={resetPinSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
              <View style={styles.inner}>
                <View style={styles.topContain}>
                  <Image style={styles.logo} source={Logo} />

                  <View>
                    <Text style={styles.text}>
                      Enter your recovery phone number or email address on which
                      you will receive an OTP
                    </Text>
                  </View>
                </View>

                <View>
                  <View style={styles.resetPasswordContainer}>
                    <IconlyProvider
                      set="light"
                      primaryColor="#959FBA"
                      secondaryColor="#959FBA"
                      stroke="bold"
                      size="large">
                      <Call />
                    </IconlyProvider>
                    <TextInput
                      keyboardType="number-pad"
                      style={styles.passwordinput}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                      placeholder="Phone"></TextInput>
                  </View>

                  {touched.phone && errors.phone && (
                    <Text style={styles.error} status="danger">
                      {errors.phone}
                    </Text>
                  )}
                </View>

                <View>
                  <Button
                    text="Reset Pin"
                    type="filled"
                    bordered
                    isDisabled={!isValid}
                    size="large"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    backgroundColor: '#fff',
  },

  inner: {
    flex: 1,
    justifyContent: 'space-around',
    width: '80%',
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
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    alignItems: 'center',
    justfiyContent: 'center',
    textAlign: 'center',
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

  resetPasswordContainer: {
    backgroundColor: COLORS.dark_8,
    borderRadius: 6,
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordinput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 15,
    color: '#4E5C80',
    fontWeight: '400',
    fontSize: 14,
  },
  number: {
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 10,
    paddingVertical: 5,
    paddingRight: 8,
    borderRightWidth: 2,
    borderRightColor: '#D3D8E8',
  },
  error: {
    fontSize: 11,
  },
});
