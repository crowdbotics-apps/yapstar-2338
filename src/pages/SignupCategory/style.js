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
  inactiveComponent: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    margin: 8,
    alignSelf: 'flex-start'
  },
  inactiveText: {
    color: '#FFFFFF',
    padding: 10,
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.31
  },
  activeComponent: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    margin: 8,
    alignSelf: 'flex-start'
  },
  activeText: {
    color: '#2e0c2c',
    padding: 10,
    fontSize: 13,
    fontFamily: 'SFProText-Regular',
    fontWeight: '500',
    fontStyle: 'normal',
    letterSpacing: -0.31
  },
  categoryComponent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -8,
    marginTop: 10
  },
  showMore: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 10
  }
});
