import * as React from 'react';
import {Text, View, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//services
import axiosConfig from '../../services/config';
import {REACT_APP_URL_MEDIA} from '@env';

//components
import Back from '../../components/buttons/Back';
import Loading from '../../components/Loading';
import LotteryWinner from '../../components/LotteryWinner';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale, width} from '../../styles/scale';
import {Button} from '../../components/buttons/Button';

const AllWinners = ({navigation}) => {
  const [loading, setloading] = React.useState(false);
  const [data, setData] = React.useState({});

  //getting lottery data
  useFocusEffect(React.useCallback(() => {}, []));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Loading visible={loading} />
        <View style={styles.QRHeader}>
          <Back navigation={navigation} direction="Home" />
          <Text style={{...TextStyles.headerText, color: 'black'}}>
            All Winners
          </Text>
          <View style={{width: width / 10}}></View>
        </View>

        <ScrollView>
          <Text
            style={{
              ...TextStyles.lotterytitle,
              textAlign: 'center',
              margin: moderateScale(10),
            }}>
            🥇Current Winners
          </Text>
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

          <Text
            style={{
              ...TextStyles.lotterytitle,
              textAlign: 'center',
              margin: moderateScale(10),
            }}>
            Last Winners
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
            <LotteryWinner />
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
        </ScrollView>
      </View>
    </View>
  );
};

export default AllWinners;
