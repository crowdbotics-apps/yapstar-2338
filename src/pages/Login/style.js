import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../theme/Colors';

const dm = Dimensions.get('screen');
export default StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: dm.width * 0.8,
    justifyContent: 'flex-end'
  },
  btnImg: {
    marginTop: 40,
    width: dm.width * 0.15,
    height: dm.width * 0.15
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  desc: {
    // fontFamily: "SFProText",
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    lineHeight: 20,
    letterSpacing: -0.34,
    textAlign: 'center',
    color: '#ffffff50'
  },
  buttonContainer: {
    marginBottom: 40,
    flexDirection: 'row',
    width: dm.width * 0.6,
    justifyContent: 'space-between'
  },
  signupContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  description: {
    // fontFamily: "SFProText",
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.34,
    textAlign: 'center',
    color: '#ffffff'
  },
  signup: {
    color: '#fd9426'
  }
});
