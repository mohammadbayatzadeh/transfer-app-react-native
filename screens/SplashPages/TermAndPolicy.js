import * as React from 'react';
import {Text, View, ImageBackground, BackHandler} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import * as RootNavigation from '../../RootNavigation';
import {useFocusEffect} from '@react-navigation/native';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {width} from '../../styles/scale';
import {Button} from '../../components/buttons/Button';
import {storeData} from '../../services/config';

const Background = require('../../assets/icons/Terms.png');

const TermAndPolicy = ({}) => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  //provide hardware backbutton press
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }, []),
  );
  return (
    <ImageBackground source={Background} style={{flex: 1}}>
      <View style={{...styles.QRContainer, paddingVertical: 15}}>
        <View style={styles.content}>
          <View style={{flex: 1}}></View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={newValue => setToggleCheckBox(newValue)}
              tintColors={{true: '#13ABB7', false: '#013335'}}
            />
            <Text style={{...TextStyles.thinText, color: '#013335'}}>
              I agree to the
              <Text
                style={{color: '#13ABB7'}}
                onPress={() => RootNavigation.navigate('Terms')}>
                {' '}
                Terms of services,
              </Text>{' '}
              and acknowledge the
              <Text
                style={{color: '#13ABB7'}}
                onPress={() => RootNavigation.navigate('Terms')}>
                {' '}
                Privacy Policy
              </Text>
            </Text>
          </View>
          <Button
            title="Continue"
            width={width - 50}
            func={async () => {
              toggleCheckBox &&
                (await storeData('FIRSTTIME', 'notFirstTime'),
                RootNavigation.navigate('AuthApp'));
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default TermAndPolicy;
