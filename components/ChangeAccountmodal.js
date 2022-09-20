import * as React from 'react';
import {TouchableOpacity, Modal, ScrollView} from 'react-native';

//services
import {findActive} from '../services/Switch_Account';

//components
import Account_Item from './Account_Item';

//styles
import {modalStyles} from '../styles/modalStyles';

//shows account in signin
const ChangeAccountmodal = ({visible, setVisible, data, destination}) => {
  const [keys, setKeys] = React.useState('');

  //getting account number and data
  findActive().then(username => {
    const keys = Object.keys(data);
    const mySet = new Set([username, ...keys]);
    setKeys([...mySet]);
  });
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableOpacity
        style={modalStyles.modalContainer}
        onPress={() => setVisible(false)}>
        <TouchableOpacity
          style={{...modalStyles.modal, height: '30%'}}
          activeOpacity={1}>
          <ScrollView>
            {keys.length > 0 &&
              keys.map((item, index) => (
                <Account_Item
                  key={index}
                  user={item}
                  destination={destination}
                  setVisible={setVisible}
                />
              ))}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ChangeAccountmodal;
