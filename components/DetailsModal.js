import React from 'react';
import {Text, Modal, TouchableOpacity, ScrollView, View} from 'react-native';

//services
import {gettingDate, gettingTime} from '../services/functions';

//styles
import {modalStyles} from '../styles/modalStyles';
import {TextStyles} from '../styles/TextStyles';

//components
import {Button} from './buttons/Button';
import {moderateScale} from '../styles/scale';

//shows details for every transaction item and notification item 
export const DetailsModal = ({
  visible,
  setVisible,
  data,
  func = () => setVisible(false),
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <TouchableOpacity style={modalStyles.centerModalContainer}>
        <TouchableOpacity style={modalStyles.centerModal} activeOpacity={1}>
          <ScrollView style={{width: '100%'}}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                flex: 1,
                backgroundColor: '#fff',
                paddingHorizontal: moderateScale(8),
              }}>
              {data.title ? (
                <View>
                  <Text style={TextStyles.normal}>Title: {data.title}</Text>
                  <Text
                    style={{
                      ...TextStyles.text12,
                      paddingVertical: moderateScale(5),
                    }}>
                    Type: {data.type}
                  </Text>
                  <Text
                    style={{
                      ...TextStyles.text12,
                      paddingVertical: moderateScale(8),
                    }}>
                    Date:{' '}
                    {`${gettingDate(new Date(data.time))}   ${gettingTime(
                      new Date(data.time),
                    )}`}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={TextStyles.normal}>
                    Transfer Type: {data.type}
                  </Text>
                  <Text
                    style={{
                      ...TextStyles.text12,
                      paddingVertical: moderateScale(5),
                    }}>
                    Status: {data.status}
                  </Text>
                  <Text
                    style={{
                      ...TextStyles.text12,
                      paddingVertical: moderateScale(5),
                    }}>
                    Date:{' '}
                    {`${gettingDate(new Date(data.created_at))}   ${gettingTime(
                      new Date(data.created_at),
                    )}`}
                  </Text>
                </View>
              )}
              {data.destination && (
                <Text
                  style={{
                    ...TextStyles.text12,
                    paddingVertical: moderateScale(8),
                  }}>
                  destination: {data.destination}
                </Text>
              )}
              <Text
                style={{
                  ...TextStyles.text12,
                  paddingVertical: moderateScale(8),
                }}>
                description: {data.body || data.description}
              </Text>
              <View style={{width: '100%'}}>
                <Button title="Ok, Thanks!" width="100%" func={func} />
              </View>
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
