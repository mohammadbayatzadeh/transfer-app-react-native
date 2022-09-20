import * as React from 'react';
import {Text, View, TouchableOpacity, Modal, ScrollView} from 'react-native';

//services
import axiosConfig from '../services/config';

//components
import TransferStatus from './TransferStatus';
import {Button} from './buttons/Button';

//styles
import {styles} from '../styles/style';
import {modalStyles} from '../styles/modalStyles';
import {TextStyles} from '../styles/TextStyles';

//shows your transfer details in Transfer screen
const TransferDetail = ({
  title,
  text,
  navigation,
  confirmVisible,
  setConfirmVisible,
  transferDetail,
  amount,
  destination,
  backFunc,
  user,
  id,
  destinationData,
  buttonText = 'Ok, Send Now!',
  func,
}) => {
  const [statusVisible, setStatusVisible] = React.useState(false);
  const [status, setStatus] = React.useState(true);

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={confirmVisible}>
        <TouchableOpacity
          style={modalStyles.centerModalContainer}
          onPress={() => (backFunc ? backFunc : setConfirmVisible(false))}>
          <TouchableOpacity style={modalStyles.centerModal} activeOpacity={1}>
            <ScrollView style={{width: '100%'}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text
                  style={{
                    ...TextStyles.headerText,
                    color: '#013335',
                    marginBottom: 15,
                    textAlign: 'center',
                  }}>
                  {title}
                </Text>
                {!!text && (
                  <Text
                    style={{
                      ...TextStyles.profileSubTitle,
                      textAlign: 'center',
                    }}>
                    {text}
                  </Text>
                )}
                <View style={styles.detailBox}>
                  <View style={styles.details}>
                    <Text style={TextStyles.text}>From</Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={TextStyles.forget}>{user}</Text>
                  </View>
                </View>
                <View style={styles.detailBox}>
                  <View style={styles.details}>
                    <Text style={TextStyles.text}>to</Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={TextStyles.forget}>{destination}</Text>
                  </View>
                </View>
                {id && (
                  <View style={styles.detailBox}>
                    <View style={styles.details}>
                      <Text style={TextStyles.text}>Transfer ID : </Text>
                      <Text style={TextStyles.forget}>#{id}</Text>
                    </View>
                  </View>
                )}
                <View style={styles.detailBox}>
                  <View style={styles.details}>
                    <Text style={TextStyles.text}>Fee</Text>
                    <Text style={TextStyles.cancel}>${transferDetail.fee}</Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={TextStyles.text}>Total</Text>
                    <Text style={TextStyles.cancel}>
                      ${transferDetail.total_amount}
                    </Text>
                  </View>
                </View>
                <View style={{width: '100%'}}>
                  <Button
                    title={buttonText}
                    //confirms user's transaction
                    func={
                      func
                        ? func
                        : () => {
                            setConfirmVisible(false);
                            axiosConfig
                              .get(
                                `/confirm_transfer/${transferDetail.transfer_id}`,
                              )
                              .then(
                                response => setStatus(true),
                                setStatusVisible(true),
                              )
                              .catch(err => {
                                setStatus(false);
                                setStatusVisible(true);
                              });
                          }
                    }
                    width="100%"
                  />
                </View>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <TransferStatus
        navigation={navigation}
        data={destinationData}
        amount={amount}
        visible={statusVisible}
        status={status}
      />
    </View>
  );
};

export default TransferDetail;
