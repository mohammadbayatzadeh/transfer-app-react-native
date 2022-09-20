import * as React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//services
import axiosConfig, {retrieveData} from '../../services/config';

//components
import {Bar_Chart} from '../../components/BarChart';
import Footer from '../../components/Footer';
import Transaction from '../../components/Transaction';

//styles
import {styles} from '../../styles/style';
import {TextStyles} from '../../styles/TextStyles';
import {ImageStyles} from '../../styles/ImageStyles';
import {width} from '../../styles/scale';
import {findActive} from '../../services/Switch_Account';

//images
const Vector = require('../../assets/icons/Vector.png');

const Activity = ({navigation}) => {
  const [data, setData] = React.useState([]);
  const [saveddata, setSavedData] = React.useState([]);
  const [username, setUsername] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [sort, setSort] = React.useState('all');
  const [getLink, setGetLink] = React.useState('/trans_history?page=1');
  const [end, setEnd] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [endText, setEndText] = React.useState('');

  //getting transactions data of active account
  React.useEffect(() => {
    findActive().then(username =>
      retrieveData('APP_DATA').then(value => {
        //setState data
        setSavedData(value[username].transactions.results);
        setUsername(value[username].user.username);
      }),
    );
  }, []);

  //calls th function to get new data for every sort change
  React.useEffect(() => {
    getNewData(getLink);
  }, [sort]);

  //provide hardware back
  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
      return () => backHandler.remove();
    }, []),
  );

  //getting new data and lists them
  const getNewData = (link = getLink) => {
    //gets data from selected timeperiod
    axiosConfig
      .get(link)
      .then(value => {
        //setState them
        setLoading(false);
        setGetLink(value.next);
        setShow(false);
        setData(prev => [...prev, ...value.results]);
        if (value.next == null) {
          setEnd(true);
          setEndText('Your Transaction list ended!');
        }
      })
      //handling errors
      .catch(error => {
        if (error.data) {
          setData([...saveddata]);
          setSort('all');
        }
        setLoading(false);
        setShow(true);
        setEndText('Wait for connection...!');
      });
  };
  const RenderNewData = () => {
    if (!end && !loading) {
      setLoading(true);
      getNewData();
    }
  };

  //changes the sort status
  const sortHandler = async () => {
    setEnd(false);
    setData([]);
    if (sort === 'all') {
      setGetLink(`/trans_history?page=1&destination=${username}`);
      setSort('In');
    }
    if (sort === 'In') {
      setGetLink(`/trans_history?page=1&source=${username}`);
      setSort('Out');
    }
    if (sort === 'Out') {
      setGetLink(`/trans_history?page=1`);
      setSort('all');
    }
  };

  //renders the screen
  const renderHeader = () => (
    <>
      <View style={styles.QRHeader}>
        <View style={{width: width / 10}}></View>
        <Text style={{...TextStyles.headerText, color: 'black'}}>Activity</Text>
        <View style={{width: width / 10}}></View>
      </View>
      <Bar_Chart />
      <View style={styles.details}>
        <Text style={{...TextStyles.headerText, color: 'rgba(29, 58, 112, 1)'}}>
          Categories
        </Text>
        <TouchableOpacity
          onPress={sortHandler}
          style={{flexDirection: 'row', alignItems: 'baseline'}}>
          <Text style={TextStyles.text}>{sort}</Text>
          <Image
            source={Vector}
            style={{...ImageStyles.vector, transform: [{rotate: '90deg'}]}}
          />
        </TouchableOpacity>
      </View>
    </>
  );

  //renders the footer (shows the text at end of list)
  const renderFooter = () => {
    if (show || end) {
      return (
        <Text style={{...TextStyles.text, textAlign: 'center', marginTop: 10}}>
          {endText}
        </Text>
      );
    } else {
      return null;
    }
  };

  //using flatlist to show 
  return (
    <View style={{...styles.QRContainer, backgroundColor: '#fff'}}>
      <View style={styles.content}>
        {!!data && (
          <FlatList
            data={data}
            renderItem={({item}) => <Transaction key={item.id} data={item} />}
            ListHeaderComponent={renderHeader()}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.02}
            onEndReached={() => RenderNewData()}
          />
        )}
      </View>
      <Footer navigation={navigation} />
    </View>
  );
};

export default Activity;
