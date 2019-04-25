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
    padding: 8
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 60,
    width: '100%',
    backgroundColor: '#450d42',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  button: {
    fontFamily: 'SFProText-Regular',
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.34,
    textAlign: 'center',
    color: '#fd9426',
    marginTop: 4,
    marginRight: 16
  },
  titleContainer: {
    width: '80%',
    alignItems: 'flex-start'
  },
  title: {
    marginTop: 40,
    fontFamily: 'SFProText-Regular',
    fontSize: 21,
    fontWeight: '600',
    fontStyle: 'normal',
    lineHeight: 29,
    letterSpacing: -0.51,
    color: '#ffffff'
  },
  phoneContainer: {
    marginTop: 10,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1
  },
  phone: {
    marginBottom: 10
  },
  phoneText: {
    color: '#FFFFFF',
    fontFamily: 'SFProText-Regular',
    fontSize: 21,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: 2,
    color: '#ffffff'
  },
  avatarContainer: {
    marginTop: 40,
    width: '20%'
  },
  avatarCircle: {
    width: dm.width * 0.15,
    height: dm.width * 0.15,
    borderWidth: 1,
    borderColor: '#fd9426',
    borderRadius: dm.width * 0.1
  },
  avatar: {
    width: dm.width * 0.15 - 8,
    height: dm.width * 0.15 - 8,
    borderRadius: (dm.width * 0.15 - 8) / 2,
    marginLeft: 3,
    marginTop: 3
  },
  input: {
    color: '#FFFFFF',
    fontFamily: 'SFProText-Regular',
    fontSize: 21,
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.51,
    color: '#ffffff',
    marginBottom: 4
  }
});
