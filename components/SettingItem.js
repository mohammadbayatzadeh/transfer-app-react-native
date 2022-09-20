import * as React from 'react';
import {Text, View} from 'react-native';
import ToggleSwitch from 'toggle-switch-react-native';

//services
import {retrieveData, storeData} from '../services/config';

//styles
import {styles} from '../styles/style';
import {TextStyles} from '../styles/TextStyles';
import {moderateScale} from '../styles/scale';

//setting item in setting screen
const SettingsItem = ({name, title}) => {
  const [On, setOn] = React.useState(true);

  //getting toggle status(On or Off)
  React.useEffect(() => {
    retrieveData(`${name}`).then(value => {
      setOn(value);
    });
  }, []);

  return (
    <View style={{...styles.details, marginBottom: moderateScale(15)}}>
      <View>
        <Text style={TextStyles.transName}>{title}</Text>
      </View>
      {/* toggle and ontouch function */}
      <ToggleSwitch
        isOn={On}
        onColor="#1DAB87"
        offColor="#F3F4F6"
        size="large"
        onToggle={async () => {
          setOn(!On);
          if (On) {
            await storeData(`${name}`, false);
          } else {
            await storeData(`${name}`, true);
          }
        }}
      />
    </View>
  );
};

export default SettingsItem;
