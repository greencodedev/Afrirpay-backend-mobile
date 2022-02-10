import React, {useState, useRef, useEffect} from 'react';
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
  Modal,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';

import {COLORS, SIZES} from '../../constants/index';
import Logo from '../../assets/images/logo.png';
import GradientText from '../../constants/gradientText';
import Button from '../../components/Button';
import {Countries} from '../../data/countries';
import axios from 'axios';
import PswIcon from '../../assets/images/PasswordIcon.svg';
import * as yup from 'yup';
import {Formik} from 'formik';
import {Radio, RadioGroup, Text} from '@ui-kitten/components';
import {
  IconlyProvider,
  Home,
  Notification,
  User,
  Call,
  Phone,
} from 'react-native-iconly';

// import { LinearGradient } from 'expo-linear-gradient';
export default function Login({navigation}) {
  let textInput = useRef(null);

  const defaultNumber = '+234';
  const defaulMasktNumberCountry = '345 566 789';

  const [placeholder, setPlaceholder] = useState(defaulMasktNumberCountry);

  const [inputfocus, setInputFocus] = useState(true);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisble, setModalVisble] = useState(false);

  const [dataCountries, setDataCountries] = useState(Countries);

  const [countryCode, setcountryCode] = useState(defaultNumber);

  const phoneRegExp = /^(?=.*\d).{8,}$/;

  let loginSchema = yup.object().shape({
    // password: yup
    //   .string()
    //   .required('Please Enter your password')
    //   .matches(/^(?=.*\d).{8,}$/, 'Must Contain at least 8 Characters'),
    phone: yup
      .string()
      .required('Please Enter your Phone Number')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });
  const onPress = () => {
    let realPhoneNumber = countryCode + phoneNumber;
    // phoneNumber.length === ''
    //   ? navigation.navigate('EnterPin', {realPhoneNumber})
    //   : alert('Please enter a valid phone number');

    navigation.navigate('EnterLoginPin', {realPhoneNumber});
  };

  //onchangephoneNumber
  const onChangePhoneNumber = number => {
    setPhoneNumber(number);
  };

  const onShowHideModal = () => {
    setModalVisble(!modalVisble);
  };

  const onChangeFocus = () => {
    setInputFocus(true);
  };

  const onChangeBlur = () => {
    setInputFocus(false);
  };

  const onCountryChange = item => {
    // setPhoneNumber(item.dialCode);
    setcountryCode(item.dialCode);

    setPlaceholder(item.mask);
    setModalVisble(false);
  };

  // const filterCountries = value => {
  //   if (value) {
  //     const countryData = dataCountries?.filter(obj => {
  //       obj.en.indexOf(value) > -1 || obj.dialCode.indexOf(value) > -1;

  //       setDataCountries(countryData);
  //     });
  //   } else {
  //     setDataCountries(Countries);
  //   }
  // };

  const filterInput = text => {
    //FILTER for  countries
  };

  let renderModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisble}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.modalContainer}>
            {/* <View style={styles.filterInputContainer}>
              <TextInput
                autoFocus={true}
                onChangeText={filterCountries}
                placeholder="Filter"
                focusable={true}
                style={styles.filterInput}
              />
            </View> */}

            <FlatList
              style={{flex: 1}}
              data={dataCountries}
              extraData={dataCountries}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      onCountryChange(item);
                    }}>
                    <View style={styles.countryModalStyle}>
                      <View style={styles.modalItemContainer}>
                        <Text style={styles.modalText}>{item.en} </Text>
                        <Text style={styles.modalText}>({item.dialCode})</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    );
  };

  return (
    <Formik
      initialValues={{ phone: ''}}
      onSubmit={values => {
        // alert(JSON.stringify(values, null, 2));

        let data = JSON.stringify({
          phone: values.phone,
        });

        let config = {
          method: 'post',
          url: 'https://afrirpayuserservice.herokuapp.com/api/v1/auth/login',
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };

        axios(config)
          .then(response => {
            console.log(JSON.stringify(response.data));
          })
          .then(() => {
            navigation.navigate('EnterLoginPin' , {phoneNumber: values.phone});
          })

          .catch(function (error) {
            alert(error.response.data.message);

            console.log(error);
          });
      }}
      validateOnMount={true}
      validationSchema={loginSchema}>
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
            <View style={styles.inner}>
              <View style={styles.topContain}>
                <Image style={styles.logo} source={Logo} />

                <GradientText style={styles.welcomeText}>
                  Welcome to AfrirPay
                </GradientText>
                <Text style={styles.text}>
                  {' '}
                  Please enter your mobile number
                </Text>
              </View>

              <View>
                <View style={styles.signupInputContainer}>
                  <IconlyProvider
                    set="light"
                    primaryColor="#959FBA"
                    secondaryColor="#959FBA"
                    stroke="bold"
                    size="large">
                    <Call />
                  </IconlyProvider>

                  <TextInput
                    keyboardType="numeric"
                    style={styles.signupinput}
                    placeholder="Phone"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}></TextInput>
                </View>
                {touched.phone && errors.phone && (
                  <Text style={styles.error} status="danger">
                    {errors.phone}
                  </Text>
                )}

                {/* <View style={styles.signupInputContainer}>
           

                  <PswIcon />

                  <TextInput
                    style={styles.signupinput}
                    secureTextEntry={true}
                    autoCorrect={false}
                    placeholder="Enter Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}></TextInput>
                </View>

                {touched.password && errors.password && (
                  <Text style={styles.error} status="danger">
                    {errors.password}
                  </Text>
                )} */}
              </View>

              <Button
                text="Continue"
                type="filled"
                bordered
                size="large"
                isDisabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
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
  // style for TextInput

  //style for input
  inputContainer: {
    width: '80%',
    marginTop: SIZES.base * 2,
    marginBottom: SIZES.base * 2,
    borderRadius: SIZES.base * 2,
    backgroundColor: COLORS.WHITE,
    padding: SIZES.base * 2,
    flexDirection: 'row',
    alignItems: 'center',
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
  },

  topContain: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerInput: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomColor: 1,
  },

  openDialogView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  error: {
    fontSize: 11,
  },

  phoneinput: {
    // marginLeft: 10,
    width: '100%',
    flex: 1,
    fontSize: 14,
    color: COLORS.Neutral_100,
    fontWeight: '500',
  },

  countryCode: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.Neutral_100,
    marginTop: 6,
  },
  modalContainer: {
    paddingTop: 10,
    paddingLeft: 25,
    paddingRight: 25,
    flex: 1,
    backgroundColor: '#fff',
  },

  filterInput: {
    flex: 1,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  countryModalStyle: {
    flex: 1,
    borderColor: COLORS.dark_2,
    borderTopWidth: 0,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalItemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingleft: 5,
  },

  modalText: {
    // flex: 1,
    fontSize: 16,
  },

  filterInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelWrapper: {
    flex: 1,
    width: '100%',
    height: 70,
    backgroundColor: COLORS.grey,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  labelWrapperId: {
    height: 65,
    backgroundColor: COLORS.grey,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
  },

  labelIdWrapper: {
    flex: 1,
    width: '100%',
    height: 54,
  },

  labelText: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.Neutral,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  labelTextId: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 2,
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.Neutral,
  },

  signupInputContainer: {
    backgroundColor: COLORS.dark_8,
    borderRadius: 6,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  signupinput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 15,
    color: '#4E5C80',
    fontWeight: '400',
    fontSize: 14,
  },
});
