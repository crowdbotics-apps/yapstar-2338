import React from 'react';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createAppContainer
} from 'react-navigation';
import { Text, Dimensions } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen1 from '../pages/SplashScreen1';
import SplashScreen2 from '../pages/SplashScreen2';
import WelcomeScreen1 from '../pages/WelcomeScreen1';
import WelcomeScreen2 from '../pages/WelcomeScreen2';
import WelcomeScreen3 from '../pages/WelcomeScreen3';
import SigninScreen from '../pages/SigninScreen';
import NicknameScreen from '../pages/NicknameScreen';
import LoginScreen from '../pages/Login';
import SignupScreen from '../pages/Signup';
import SignupPhoneScreen from '../pages/SignupPhone';
import SignupNickNameScreen from '../pages/SignupNickName';
import SignupCategoryScreen from '../pages/SignupCategory';
import ProfileScreen from '../pages/Profile';
import MainScreen from '../pages/Main';

import { DrawerMenu } from './../components';
import SingupScreen from '../pages/Signup';

const dm = Dimensions.get('screen');

const AuthNavigator = createStackNavigator(
  {
    signin: {
      screen: SigninScreen
    },
    welcome3: {
      screen: WelcomeScreen3
    },
    nickname: {
      screen: NicknameScreen
    },

    login: {
      screen: LoginScreen
    },
    signup: {
      screen: SignupScreen
    },
    signupphone: {
      screen: SignupPhoneScreen
    },
    signupnickname: {
      screen: SignupNickNameScreen
    },
    signupcategory: {
      screen: SignupCategoryScreen
    }
  },
  {
    headerMode: 'none',
    initialRouteName: 'signin'
  }
);

const MainTabNavigator = createBottomTabNavigator(
  {
    main: MainScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        // custom icon setting.
      },
      tabBarLabel: ({ focused, tintColor }) => {
        // custom label setting.
      }
    }),
    tabBarOptions: {
      activeTintColor: '#81A8D2',
      inactiveTintColor: 'gray',
      safeAreaInset: { bottom: 'never' }
    }
  }
);

const MainNavigator = createDrawerNavigator(
  {
    home: MainTabNavigator,
    profile: ProfileScreen
  },
  {
    drawerWidth: dm.width * 0.6,
    // eslint-disable-next-line react/display-name
    contentComponent: (props) => (
      <DrawerMenu currentScreen={props.navigation.state.routeName} {...props} />
    ),
    initialRouteName: 'home',
    contentOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'white',
      labelStyle: {
        fontSize: 20,
        fontWeight: 'normal',
        fontStyle: 'normal',
        marginLeft: 0,
        paddingLeft: 0
      }
    }
  }
);

const MainStackNavigator = createStackNavigator(
  {
    mainroot: MainNavigator
  },
  {
    headerMode: 'none',
    initialRouteName: 'mainroot'
  }
);

export default createSwitchNavigator(
  {
    splash1: SplashScreen1,
    splash2: SplashScreen2,
    welcome1: WelcomeScreen1,
    welcome2: WelcomeScreen2,
    auth: AuthNavigator,
    main: MainStackNavigator
  },
  {
    initialRouteName: 'splash1'
  }
);
