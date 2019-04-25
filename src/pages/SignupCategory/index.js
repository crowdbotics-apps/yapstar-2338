import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppContext, Navbar } from 'app/components';
import { alert } from 'app/utils/Alert';
import styles from './style';
import Authentication from '../../services/Authentication';

const IMAGE_BACKGROUND_GRADIENT = require('app/assets/images/gradient.png');

class SignupCategoryScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [
        {
          value: 'SPORTS',
          selected: false
        },
        {
          value: 'ENTERTAINMENT',
          selected: false
        },
        {
          value: 'DANCER',
          selected: false
        },
        {
          value: 'MUSICIAN',
          selected: false
        },
        {
          value: 'SINGER',
          selected: false
        },
        {
          value: 'STANDUP ARTIST',
          selected: false
        },
        {
          value: 'MOVIES',
          selected: false
        },
        {
          value: 'WRITER',
          selected: false
        },
        {
          value: 'ACTOR',
          selected: false
        },
        {
          value: 'ACTRESS',
          selected: false
        },
        {
          value: 'BOLLYWOOD',
          selected: false
        }
      ],
      others: [
        {
          value: 'HOLLYWOOD',
          selected: false
        },
        {
          value: 'TELEVISION',
          selected: false
        },
        {
          value: 'SHOWS',
          selected: false
        },
        {
          value: 'DIRECTOR',
          selected: false
        },
        {
          value: 'ANCHOR',
          selected: false
        },
        {
          value: 'CRICKET',
          selected: false
        },
        {
          value: 'SOCCER',
          selected: false
        },
        {
          value: 'BADMINTON',
          selected: false
        },
        {
          value: 'TENNIS',
          selected: false
        },
        {
          value: 'VOLEY BALL',
          selected: false
        },
        {
          value: 'HOCKEY',
          selected: false
        },
        {
          value: 'NBA',
          selected: false
        },
        {
          value: 'FORMULA 1',
          selected: false
        },
        {
          value: 'GOLF',
          selected: false
        }
      ],
      items: [],
      showMore: false,
      nickName: this.props.navigation.getParam('nickName'),
      uid: this.props.navigation.getParam('uid'),
      fullName: this.props.navigation.getParam('fullName'),
      email: this.props.navigation.getParam('email'),
      phoneNumber: this.props.navigation.getParam('phoneNumber'),
      photoUrl: this.props.navigation.getParam('photoUrl'),
      provider: this.props.navigation.getParam('providerId')
    };
  }

  leftHandler = () => {
    this.props.navigation.goBack();
  };

  rightHandler = async () => {
    this.props.navigation.navigate('signupcategory');
  };

  updateItem(data) {
    console.log(data);
    let { categories, others, items } = this.state;

    categories.map((category, index) => {
      const selected = category.selected;
      if (category.value === data.value) {
        category.selected = !selected;
      }
    });

    others.map((item, index) => {
      const selected = item.selected;
      if (item.value === data.value) {
        item.selected = !selected;
      }
    });

    if (items.includes(data.value)) {
      for (var i = 0; i < items.length; i++) {
        if (items[i] === data.value) {
          items.splice(i, 1);
        }
      }
    } else {
      items.push(data.value);
    }
    console.log(items);
    this.setState({ categories, others, items });
  }

  finish = async () => {
    await this.context.showLoading();
    if (this.state.items.length < 2) {
      alert('Please choose at least 2 interests');
      await this.context.hideLoading();
      return;
    }

    const done = await Authentication.signup(this.state);

    await this.context.hideLoading();

    if (done) {
      this.props.navigation.navigate('main');
    }
  };

  render() {
    const { categories, others, items, showMore } = this.state;

    return (
      <ImageBackground
        source={IMAGE_BACKGROUND_GRADIENT}
        style={styles.background}
      >
        <Navbar
          left="ios-arrow-back"
          right=" "
          leftHandler={this.leftHandler}
          rightHandler={this.rightHandler}
        />
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <SafeAreaView style={styles.container}>
            <View style={styles.container}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{'What are your interests?'}</Text>
              </View>
              <View style={[styles.titleContainer, { width: '80%' }]}>
                <Text
                  style={[
                    styles.title,
                    {
                      fontSize: 14,
                      marginTop: 10,
                      fontWeight: '500',
                      lineHeight: 22,
                      color: '#ffffff70'
                    }
                  ]}
                >
                  {'Сhoose at least 2 interests'}
                </Text>
              </View>
              <View style={styles.categoryComponent}>
                {categories.map((category, index) => {
                  return (
                    <TouchableOpacity
                      style={
                        category.selected
                          ? styles.activeComponent
                          : styles.inactiveComponent
                      }
                      key={index}
                      onPress={() => this.updateItem(category)}
                    >
                      <Text
                        style={
                          category.selected
                            ? styles.activeText
                            : styles.inactiveText
                        }
                      >
                        {category.value}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {showMore && (
                <View style={styles.categoryComponent}>
                  {others.map((category, index) => {
                    return (
                      <TouchableOpacity
                        style={
                          category.selected
                            ? styles.activeComponent
                            : styles.inactiveComponent
                        }
                        key={index}
                        onPress={() => this.updateItem(category)}
                      >
                        <Text
                          style={
                            category.selected
                              ? styles.activeText
                              : styles.inactiveText
                          }
                        >
                          {category.value}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              <View style={styles.showMore}>
                <TouchableOpacity
                  onPress={() => this.setState({ showMore: !showMore })}
                >
                  <Text style={styles.button}>
                    <Ionicons
                      name={!showMore ? 'ios-add' : 'ios-remove'}
                      style={[styles.button, { fontWeight: '500' }]}
                      size={24}
                      color="#450d42"
                    />
                    {!showMore ? '  Show More' : '  Show Less'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={this.finish}>
            <Text style={styles.button}>
              {'Finish  '}
              <Ionicons
                name={'ios-arrow-forward'}
                style={[styles.button]}
                size={24}
                color="#450d42"
              />
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}
SignupCategoryScreen.contextType = AppContext;

SignupCategoryScreen.propTypes = {
  navigation: PropTypes.object
};

export default SignupCategoryScreen;
