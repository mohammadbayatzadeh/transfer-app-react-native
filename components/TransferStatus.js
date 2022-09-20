import * as React from 'react';
import {Text, View, Image, Modal, ScrollView} from 'react-native';

//components
import {Button} from './buttons/Button';
import {saveContact, saveNewContact} from '../services/api';
import {ChooseModal} from './ChooseModal';

//styles
import {modalStyles} from '../styles/modalStyles';
import {TextStyles} from '../styles/TextStyles';
import {ImageStyles} from '../styles/ImageStyles';

//images
const Success = require('../assets/icons/QR/transfer_picture.png');
const Failed = require('../assets/icons/QR/transfer_picture_failed.png');

//shows user's transfer status (success or failed) used in Transfer screen
const TransferStatus = ({navigation, amount, visible, data, status}) => {
  const [error, setError] = React.useState('');
  const [chooseVisible, setChooseVisible] = React.useState(false);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <ChooseModal
        errormessage={error}
        visible={chooseVisible}
        setVisible={setChooseVisible}
        func2={() => navigation.navigate('Home')}
        func1={async () => (
          await saveNewContact(data), await navigation.navigate('Home')
        )}
      />
      <View style={modalStyles.modalContainer}>
        <View
          style={{...modalStyles.modal, alignItems: 'center'}}
          activeOpacity={1}>
          <ScrollView>
            <View style={{alignItems: 'center'}}>
              <Image
                source={status ? Success : Failed}
                style={ImageStyles.successfullImage}
              />
              {status ? (
                <Text style={TextStyles.topText}>Transfer Successful</Text>
              ) : (
                <Text style={TextStyles.topText}>Transfer Failed</Text>
              )}
              <Text style={{...TextStyles.text, textAlign: 'center'}}>
                Transfers are reviewed which may result in delays or funds being
                frozen
              </Text>
              <Text style={TextStyles.topText}>${amount}</Text>
              <View style={{width: '100%'}}>
                <Button
                  func={async () => {
                    //calls saveContact ot save new contact
                    await saveContact(data).catch(error => {
                      setChooseVisible(true);
                      setError(error);
                    });
                  }}
                  title=" Back to Home"
                  width="100%"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TransferStatus;
