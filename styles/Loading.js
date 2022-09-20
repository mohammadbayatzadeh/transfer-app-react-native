import {StyleSheet} from 'react-native';

//all loadings styles
export const loadingStyles = StyleSheet.create({
  loadingModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  loadingModal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  loading: {
    fontSize: 20,
    fontWeight: '600',
  },
  first: {
    width: 100,
    height: 100,
    borderColor: '#013335',
    borderWidth: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 210,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 70,
  },
  second: {
    width: 100,
    height: 100,
    borderColor: '#13ABB7',
    borderWidth: 1,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 40,
  },
  third: {
    width: 100,
    height: 100,
    borderColor: '#77EBAC',
    borderWidth: 1,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 200,
  },
});
