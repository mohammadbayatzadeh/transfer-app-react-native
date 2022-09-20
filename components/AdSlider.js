import React from 'react';
import {View, Image, TouchableOpacity, Linking, Text} from 'react-native';
import Swiper from 'react-native-swiper';

//services
import {retrieveData} from '../services/config';
import {findActive} from '../services/Switch_Account';
import {REACT_APP_URL_MEDIA} from '@env';

//styles
import {styles} from '../styles/style';
import {ImageStyles} from '../styles/ImageStyles';

//using Swiper for sliding
//banners slider container used in Home screen
const AdSlider = () => {
  const [banners, setBanners] = React.useState([]);

  //getting the banners
  React.useEffect(() => {
    //getting data from active account
    findActive().then(async username => {
      await retrieveData('APP_DATA').then(data => {
        setBanners(data[username].user.banners);
      });
    });
  }, []);

  return (
    <View style={styles.slider}>
      {banners ? (
        <Swiper
          showsButtons={false}
          autoplay={true}
          loop={true}
          autoplayTimeout={2}
          activeDotColor="rgba(6, 184, 157, 1)"
          dotColor="rgba(217, 227, 236, 1)">
          {banners.map((item, index) => (
            <TouchableOpacity
              style={styles.viewBox}
              key={index}
              onPress={() => Linking.openURL(item.link)}>
              <Image
                source={{
                  uri: `${REACT_APP_URL_MEDIA}${item.image}`,
                }}
                style={ImageStyles.slide}
              />
            </TouchableOpacity>
          ))}
        </Swiper>
      ) : (
        <Text>Connection Error...</Text>
      )}
    </View>
  );
};
export default AdSlider;
