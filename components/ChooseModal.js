import React from 'react';
import {Text, Modal, TouchableOpacity, ScrollView, View} from 'react-native';

//styles
import {modalStyles} from '../styles/modalStyles';
import {TextStyles} from '../styles/TextStyles';

//components
import {Button} from './buttons/Button';

//modal for choosing between two options
export const ChooseModal = ({func1, func2, errormessage, visible}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={modalStyles.centerModalContainer}>
        <TouchableOpacity style={modalStyles.centerModal} activeOpacity={1}>
          <ScrollView style={{width: '100%'}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={{...TextStyles.normal, textAlign: 'center'}}>
                {errormessage}
              </Text>
              <View style={{width: '100%'}}>
                <Button title="Ok!" width="100%" func={() => func1()} />
                <TouchableOpacity onPress={() => func2()}>
                  <Text style={{...TextStyles.forget, textAlign: 'center'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
