import React from 'react';
import {Text, Modal, TouchableOpacity, ScrollView, View} from 'react-native';

//components
import {Button} from './buttons/Button';

//styles
import {modalStyles} from '../styles/modalStyles';
import {TextStyles} from '../styles/TextStyles';
import {styles} from '../styles/style';

//shows almost every error and message in app
export const ModalMessage = ({
  func = () => setVisible(false),
  errormessage,
  visible,
  setVisible,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={modalStyles.centerModalContainer}>
        <TouchableOpacity style={modalStyles.centerModal} activeOpacity={1}>
          <ScrollView style={{width: '100%'}}>
            <View style={styles.container}>
              <Text style={{...TextStyles.normal, textAlign: 'center'}}>
                {errormessage}
              </Text>
              <View style={{width: '100%'}}>
                <Button title="Ok!" width="100%" func={func} />
              </View>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
