import * as React from 'react';
import {Text, View, ScrollView, BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//services
import {retrieveData, storeData} from '../../services/config';

//components
import {Button} from '../../components/buttons/Button';
import OneNum_Input from '../../components/inputs/OneNum_Input';
import {ModalMessage} from '../../components/ModalMessage';
import Back from '../../components/buttons/Back';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';
import {inputStyles} from '../../styles/InputStyles';

const Create_PIN = ({navigation, route}) => {
  const [value, setValue] = React.useState('');
  const [newvalue, setNewValue] = React.useState(0);
  const [pass, setPass] = React.useState(0);
  const [error, setError] = React.useState('');
  const [newerror, setNewError] = React.useState('');
  const [text, setText] = React.useState('Create');
  const [visible, setVisible] = React.useState(false);

  const change = route.params ? true : false;
  
  //gets and checks the saved pin code to change the screen status
  useFocusEffect(
    React.useCallback(() => {
      setPass(0);
      setText('Create');
      retrieveData('PIN').then(value => {
        if (value > 2) {
          //have set pin
          if (change) {
            //came from setting
            setPass(value);
            change && setText('Change');
          } else {
            //came from splash
            setPass(value);
            setText('Enter');
          }
        } else if (value === 1) {
          //skipped pin
          setPass(1);
        }
      });
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => (change ? false : true),
      );
      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ModalMessage
          errormessage="In the case you forgot your pin code , you must reinstall your application."
          visible={visible}
          setVisible={setVisible}
        />
        <ScrollView>
          {change && <Back navigation={navigation} direction="Profile" />}
          <Text style={TextStyles.topText0}>{text} your PIN code</Text>
          <Text
            style={{...TextStyles.normal, marginVertical: moderateScale(10)}}>
            Use numbers only.
          </Text>
          {pass > 2 && change && (
            <Text style={TextStyles.cancel}> Old PIN : </Text>
          )}
          <OneNum_Input
            value={value}
            setValue={setValue}
            hide={true}
            border={true}
            isFocused={false}
          />
          <Text style={inputStyles.error}>{error}</Text>
          {pass > 2 && change && (
            <View style={{marginTop: moderateScale(15)}}>
              <Text style={TextStyles.cancel}> New PIN : </Text>
              <OneNum_Input
                value={newvalue}
                setValue={setNewValue}
                hide={true}
                border={true}
                isFocused={false}
              />
              <Text style={inputStyles.error}>{newerror}</Text>
            </View>
          )}
          {pass > 2 && !change && (
            <Text style={TextStyles.cancel} onPress={() => setVisible(true)}>
              Forgot PIN?
            </Text>
          )}
        </ScrollView>

        <View style={{flex: 1}}></View>
        {pass === 0 && !change && (
          <View style={{width: '100%'}}>
            <Text
              style={{...TextStyles.cancel, textAlign: 'center'}}
              onPress={async () => {
                //set pin to 1(skipped)
                await storeData('PIN', 1);
                navigation.navigate('HomeApp', {screen: 'Home'});
              }}>
              Skip
            </Text>
          </View>
        )}
        {pass > 2 && change && (
          <View style={{width: '100%'}}>
            <Text
              style={{...TextStyles.cancel, textAlign: 'center'}}
              onPress={async () => {
                value === pass
                  ? //if pin is currect
                    //set it to 1
                    (await storeData('PIN', 1), navigation.navigate('Home'))
                  : setError('Password Incorrect');
              }}>
              Remove PIN
            </Text>
          </View>
        )}
        <Button
          func={() => {
            console.log(pass);
            //checks pin length
            if (value.length === 5) {
              //pin is set and came from splash
              if (pass > 2 && !change) {
                if (pass > 0) {
                  if (pass === value) {
                    //opens app
                    navigation.navigate('HomeApp', {screen: 'Home'});
                  } else {
                    //shows error
                    setError('Password Incorrect');
                  }
                } else {
                  //saves new password
                  storeData('PIN', value);
                  change
                    ? navigation.navigate('Home')
                    : navigation.navigate('HomeApp', {screen: 'Home'});
                }
              } else {
                //pin is set and came from settings
                if (pass > 2 && change) {
                  if (pass === value) {
                    if (newvalue.length === 5) {
                      //saves changes pin code
                      newvalue > 10
                        ? (storeData('PIN', newvalue),
                          navigation.navigate('Home'))
                        : setNewError('Enter stronger PIN');
                    } else {
                      setNewError('Enter your new PIN');
                    }
                  } else {
                    //shows error
                    setError('Password Incorrect');
                  }
                } else {
                  if (value > 10) {
                    storeData('PIN', value);
                    change
                      ? navigation.navigate('Home')
                      : navigation.navigate('HomeApp', {screen: 'Home'});
                  } else {
                    setError('Enter stronger PIN');
                  }
                }
              }
            } else {
              setError('Enter your PIN');
            }
          }}
          title={`${text} PIN`}
          width={width - 50}
        />
      </View>
    </View>
  );
};

export default Create_PIN;
