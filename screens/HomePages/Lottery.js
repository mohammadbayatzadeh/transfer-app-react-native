import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//services
import axiosConfig from '../../services/config';
import {REACT_APP_URL_MEDIA} from '@env';

//components
import Back from '../../components/buttons/Back';
import Loading from '../../components/Loading';
import {ModalMessage} from '../../components/ModalMessage';
import {Wheel} from '../../components/Wheel';
import LotteryWinner from '../../components/LotteryWinner';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';
import {ImageStyles} from '../../styles/ImageStyles';
import {Button} from '../../components/buttons/Button';

const Lottery = ({navigation}) => {
  const [loading, setloading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState('');
  const [visible, setVisible] = React.useState(false);

  //getting lottery data
  useFocusEffect(
    React.useCallback(() => {
      //get data
      axiosConfig
        .get('/lottery')
        .then(async value => {
          //setState them
          setloading(false);
          setData(value);
        })
        //handling errors
        .catch(
          error => (
            setVisible(true),
            setloading(false),
            setError('Please check your internet connection, Try again.')
          ),
        );
    }, []),
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Loading visible={loading} />
        <ModalMessage
          errormessage={error}
          visible={visible}
          setVisible={setVisible}
        />
        <View style={styles.QRHeader}>
          <Back navigation={navigation} direction="Home" />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            Lottery
          </Text>
          <View style={{width: width / 10}}></View>
        </View>

        {data && (
          <TouchableOpacity onPress={() => Linking.openURL(data.link)}>
            <Image
              style={ImageStyles.lotterySlide}
              source={{uri: `${REACT_APP_URL_MEDIA}${data.banner}`}}
            />
          </TouchableOpacity>
        )}

        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: width - 50,
            }}>
            {data.user_score ? (
              <>
                <Text style={{...TextStyles.thinText, color: '#1DAB87'}}>
                  Your current points
                </Text>
                <Wheel score={data.user_score} />
                <Text
                  style={{
                    ...TextStyles.lottery,
                    textAlign: 'justify',
                    paddingVertical: moderateScale(10),
                  }}>
                  {data.body}
                </Text>
              </>
            ) : (
              error.length > 2 && (
                <Text
                  style={{
                    ...TextStyles.thinText,
                    color: '#1DAB87',
                    textAlign: 'center',
                  }}>
                  Please check your internet connection, Try again.
                </Text>
              )
            )}
          </View>

          {data.title && (
            <Text
              style={{
                ...TextStyles.lotterytitle,
                textAlign: 'center',
                margin: moderateScale(10),
              }}>
              {`🥇Winners`}
            </Text>
          )}
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Button
              title="All Winners"
              width={moderateScale(120)}
              func={() => navigation.navigate('AllWinners')}
            />
          </View>
          {data.title && (
            <Text
              style={{
                ...TextStyles.lotterytitle,
                textAlign: 'center',
                margin: moderateScale(10),
              }}>
              {`⭐High Score`}
            </Text>
          )}
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <LotteryWinner large={true} />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Lottery;
