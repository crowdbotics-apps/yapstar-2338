import { StyleSheet, Platform, Dimensions } from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
export const isiOS = Platform.OS === 'ios';

export const cStyles = StyleSheet.create({
  // Common
  waitingBackground: {
    flex: 1,
    backgroundColor: '#000000A0',
    alignItems: 'center',
    justifyContent: 'center'
  },
  waitingLayout: {
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },  
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center'
  },
  headerContainer: {
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingBottom: 10,
  },
  headerText: {
    color: 'white', 
    fontSize: 20
  }
})
