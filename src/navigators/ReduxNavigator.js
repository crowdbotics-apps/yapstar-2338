import React from "react";
import { BackHandler, SafeAreaView } from "react-native";
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux'
import { store, AppWithNavigationState } from '../reducers';
import { AppContext, LoadingView } from '../components';

/* your other setup code here! this is not a runnable snippet */

class ReduxNavigator extends React.Component {

  constructor(props) {
    super(props);

    this.showLoading = () => {
      this.setState({
        loading: true
      });
    };
    this.hideLoading = () => {
      this.setState({
        loading: false
      });
    };
    this.state = {
      loading: false,
      showLoading: this.showLoading,
      hideLoading: this.hideLoading
    };
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }

    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    /* more setup code here! this is not a runnable snippet */ 
    return (
      <AppContext.Provider value={this.state}>
        <AppWithNavigationState navigation={this.props.navigation} />
        <LoadingView />
      </AppContext.Provider>
    )
  }
}

const mapStateToProps = state => ({ nav: state.nav });
const ReduxNatigatorState = connect(mapStateToProps)(ReduxNavigator);
export {store, ReduxNatigatorState};