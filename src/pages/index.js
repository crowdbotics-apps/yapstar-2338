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

import LoadingScreen from './Loading';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import SignupPhoneScreen from './SignupPhone';
import SignupNickNameScreen from './SignupNickName';
import SignupCategoryScreen from './SignupCategory';
import ProfileScreen from './Profile';
import MainScreen from './Main';

import { DrawerMenu } from './../components';

const dm = Dimensions.get('screen');

const AuthNavigator = createStackNavigator(
  {
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
    initialRouteName: 'signup'
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

const AppNavigator = createSwitchNavigator(
  {
    loading: LoadingScreen,
    auth: AuthNavigator,
    main: MainStackNavigator
  },
  {
    initialRouteName: 'loading'
  }
);

export default createAppContainer(AppNavigator);
