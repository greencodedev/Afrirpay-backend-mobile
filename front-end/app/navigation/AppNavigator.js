import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Resetpassword from '../screens/ResetPassword/index';
import ResetPasswordOtp from '../screens/ResetPassword/ResetPasswordOtp';
import NewPin from '../screens/ResetPassword/NewPin';
import ConfirmNewPin from '../screens/ResetPassword/ConfirmNewPin';
import Menu from '../screens/Menu';
import WalletConfirm from '../screens/Wallet/WalletConfirm';
import EscrowRequest from '../screens/Wallet/EscrowRequest';
import Refferal from '../screens/Wallet/Refferal';

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <AppStack.Navigator initialRouteName="Dashboard">
      <AppStack.Screen
        name="Main"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name="Resetpassword"
        component={Resetpassword}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />
      <AppStack.Screen
        name="ResetOtp"
        component={ResetPasswordOtp}
        options={{
          title: 'OTP Code',
          headerShadowVisible: false,

          headerTitleAlign: 'center',
        }}
      />
      <AppStack.Screen
        name="NewPin"
        component={NewPin}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />

      <AppStack.Screen
        name="ConfirmNewPin"
        component={ConfirmNewPin}
        options={{
          headerShadowVisible: false,
          title: '',
        }}
      />

      {/* SignUp screens ends*/}
      <AppStack.Screen
        name="Menu"
        component={Menu}
        options={{headerShadowVisible: false, title: '', headerShown: false}}
      />
      <AppStack.Screen
        name="WalletConfirm"
        component={WalletConfirm}
        options={{headerShadowVisible: false, title: '', headerShown: false}}
      />
      <AppStack.Screen
        name="EscrowRequest"
        component={EscrowRequest}
        options={{headerShadowVisible: false, title: '', headerShown: false}}
      />
      <AppStack.Screen
        name="Referral"
        component={Refferal}
        options={{headerShadowVisible: false, title: '', headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigator;
