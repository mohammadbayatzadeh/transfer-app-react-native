import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

//services
import axiosConfig from '../services/config';

//images
const Scan = require('../assets/icons/scan.png');

//coponents
import {ModalMessage} from './ModalMessage';
import Loading from './Loading';

//styles
import {modalStyles} from '../styles/modalStyles';
import {QRStyles} from '../styles/QRStyles';
import {moderateScale, height} from '../styles/scale';
import {ImageStyles} from '../styles/ImageStyles';
import {ButtonStyles} from '../styles/ButtonStyles';

//for scanning qr code in Scan_QR screen
export const Scanqr = props => {
  const [scan, setScan] = useState(false);
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  //pushes user to Transfer screen onsuccess
  const onSuccess = e => {
    setScan(false);
    setLoading(true);
    props.setvisible(false);
    //get the link form scanned qr
    const link = e.data;
    //send username to get contact informations
    axiosConfig
      .get('/user/' + link.slice(24))
      .then(response => {
        setLoading(false);
        //pushes to Transfer Screen
        props.navigation.navigate('Transfer', {
          data: response,
        });
      })
      //handling errors
      .catch(
        error => (
          setLoading(false), setVisible(true), setError('invalid user')
        ),
      );
  };

  //opens camera
  const startScan = () => {
    setScan(true);
  };

  return (
    <>
      <ModalMessage
        errormessage={error}
        visible={visible}
        setVisible={setVisible}
      />
      <Loading visible={loading} />
      <SafeAreaView>
        {!scan && (
          <TouchableOpacity
            style={ButtonStyles.scanButton}
            onPress={() => {
              startScan();
              props.setvisible(true);
            }}>
            <Image source={Scan} style={ImageStyles.searchImage} />
            <Text style={ButtonStyles.buttonText}>Scan QR code ready</Text>
          </TouchableOpacity>
        )}

        <Modal animationType="slide" transparent={true} visible={props.visible}>
          <TouchableOpacity
            style={modalStyles.modalContainer}
            onPress={() => {
              props.setvisible(false);
              setScan(false);
            }}>
            <TouchableOpacity
              style={{
                ...modalStyles.modal,
                height: height - moderateScale(150),
              }}
              activeOpacity={1}>
              <ScrollView contentInsetAdjustmentBehavior="automatic">
                <View>
                  {scan && (
                    <View style={QRStyles.sectionContainer}>
                      <TouchableOpacity
                        style={QRStyles.buttonTouchable}
                        onPress={() => {
                          setScan(false);
                          props.setvisible(false);
                        }}>
                        <Text style={QRStyles.buttonText}>Cancel Scan</Text>
                      </TouchableOpacity>
                      <QRCodeScanner
                        reactivate={true}
                        showMarker={true}
                        ref={node => {
                          scanner = node;
                        }}
                        onRead={onSuccess}
                        topContent={
                          <Text style={QRStyles.centerText}>
                            Scan your QRCode!
                          </Text>
                        }
                      />
                    </View>
                  )}
                </View>
              </ScrollView>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </SafeAreaView>
    </>
  );
};
