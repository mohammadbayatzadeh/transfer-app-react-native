import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

//components
import Back from '../../components/buttons/Back';
import {Button} from '../../components/buttons/Button';
import FAQItem from '../../components/FAQItem';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {width} from '../../styles/scale';
import {moderateScale} from '../../styles/scale';
import {modalStyles} from '../../styles/modalStyles';

//images
const Search = require('../../assets/icons/login-signup/search.png');

const FAQ = ({navigation}) => {
  const [search, setSearch] = React.useState('');

  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        <View style={styles.QRHeader}>
          <Back navigation={navigation} />
          <Text style={{...TextStyles.headerText, color: 'black'}}>FAQs</Text>
          <View style={{width: width / 10}}></View>
        </View>
        <Text style={{...TextStyles.largeText, color: '#1DAB87'}}>
          You have any question ?
        </Text>
        <ScrollView>
          <View
            style={{
              flex: 1,
              width: width - 50,
              marginVertical: moderateScale(20),
            }}>
            <View style={modalStyles.searchBox}>
              <Image source={Search} style={ImageStyles.searchImage} />
              <TextInput
                placeholder="search"
                placeholderTextColor='#013335'
                value={search}
                style={modalStyles.searchInput}
                onChangeText={value => setSearch(value)}
              />
            </View>
          </View>
          <View style={styles.details}>
            <Text style={{...TextStyles.headerText, color: '#252836'}}>
              Frequently Asked
            </Text>
            <TouchableOpacity>
              <Text style={{...TextStyles.thinText, color: '#1DAB87'}}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <FAQItem
            title="How do I create an account?"
            text="You can create an account by: download and open the smartpay
              application first then select ..."
          />
          <FAQItem
            title="How to Top Up on Frodopay"
            text="You can create an account by: download and open the smartpay
              application first then select ..."
          />
          <FAQItem
            title="How do I create an account?"
            text=' You can select the create card menu then select "Add New Card"
            select the continue button then you ...'
          />
          <FAQItem
            title="How to Top Up on Frodopay?"
            text=' Click the Top Up menu then select the amount of money and the
            method then click the "top up now" button...'
          />
        </ScrollView>
        <Button
          title="Load more"
          width={width - 50}
          firstColor="rgba(5, 54, 56, 0.08)"
          secondColor="rgba(5, 54, 56, 0.08)"
          textColor="rgba(6, 54, 57, 1)"
        />
      </View>
    </View>
  );
};

export default FAQ;
