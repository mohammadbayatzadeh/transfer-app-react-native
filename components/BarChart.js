import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
} from 'victory-native';

//services
import axiosConfig from '../services/config';

//components
import DropdownComp from './dropdown/DropdownComp';

//styles
import {styles} from '../styles/style';
import {TextStyles} from '../styles/TextStyles';
import {ImageStyles} from '../styles/ImageStyles';
import {moderateScale, width} from '../styles/scale';

//images
const Down = require('../assets/icons/Vector_Up.png');

//The chart in activity screen(using victory native)
export const Bar_Chart = () => {
  const [chartData, setCartData] = React.useState('');
  const [dropdown, setDropdown] = React.useState('day');
  const [date, setDate] = React.useState([]);
  const [inData, setInData] = React.useState();
  const [outData, setOutData] = React.useState();
  const [defaultData, setDefaultData] = React.useState([
    {x: 1, y: 0},
    {x: 2, y: 0},
    {x: 3, y: 0},
    {x: 4, y: 0},
    {x: 5, y: 0},
  ]);
  const drowDown = [
    {label: 'daily', value: 'day'},
    {label: 'monthly', value: 'month'},
    {label: '90 days', value: '90day'},
  ];

  //reset data , getting new data and save them in every timeperiod change(dropdown change)
  React.useEffect(() => {
    //reset data
    setCartData('');
    setInData('');
    setOutData('');
    setDate('');
    //get new data
    axiosConfig.get(`/trans_chart?date=${dropdown}`).then(
      response => (
        //setState data
        setCartData(response),
        response.chart_data.reverse().map((item, index) => {
          setDate(prev => [...prev, item.date]);
          setInData(prev => [...prev, {x: +index + 1, y: item.income}]);
          setOutData(prev => [...prev, {x: +index + 1, y: item.expense}]);
        })
      ),
    );
  }, [dropdown]);

  return (
    <View>
      <View
        style={{
          ...styles.topDetails,
          marginVertical: moderateScale(10),
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text style={TextStyles.text}>Total spending</Text>
          <Text
            style={{
              ...TextStyles.headerText,
              color: 'rgba(29, 58, 112, 1)',
            }}
            numberOfLines={1}>
            ${chartData.total_spending}
          </Text>
        </View>
        <DropdownComp
          dropdown={dropdown}
          setDropdown={setDropdown}
          data={drowDown}
        />
      </View>
      <View style={styles.container}>
        {/* chart container */}
        <VictoryChart width={width - 50} height={width - 50}>
          {/* horizontal axis */}
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5]}
            tickFormat={date}
            style={{
              grid: {
                stroke: '#fff',
              },
              axis: {
                strokeWidth: 1,
                stroke: '#E5E7EB',
              },
              tickLabels: {
                fontSize: moderateScale(8),
                fill: '#919497',
              },
            }}
          />
          {/* vertical axis */}
          <VictoryAxis
            dependentAxis
            // tickFormat={x => `$${x / 1000}k`}
            tickFormat={x => `$${x}`}
            style={{
              grid: {
                stroke: 'rgba(0, 0, 0, 0.05)',
              },
              axis: {
                stroke: '#fff',
              },
              tickLabels: {
                fontSize: moderateScale(8),
                fill: '#919497',
              },
            }}
          />
          <VictoryGroup offset={10}>
            <VictoryBar
              style={{
                data: {fill: '#1DAB87'},
              }}
              data={inData ? inData : defaultData}
            />
            <VictoryBar
              style={{
                data: {fill: '#1D3A70'},
              }}
              data={outData ? outData : defaultData}
            />
          </VictoryGroup>
        </VictoryChart>
      </View>
      <View style={styles.details}>
        <View style={{...styles.ProfileBorder, flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <Image
              source={Down}
              style={{
                ...ImageStyles.smallItemIcon,
                transform: [{rotate: '180deg'}],
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...TextStyles.thinText,
                textAlign: 'center',
                color: '#1DAB87',
              }}>
              In
            </Text>
            <Text style={TextStyles.cancel} numberOfLines={1}>
              ${chartData.total_income}
            </Text>
          </View>
        </View>
        <View style={{...styles.ProfileBorder, flexDirection: 'row'}}>
          <View style={styles.imageContainer}>
            <Image
              source={Down}
              style={{
                ...ImageStyles.smallItemIcon,
              }}
            />
          </View>
          <View
            style={{
              marginHorizontal: moderateScale(10),
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...TextStyles.thinText,
                textAlign: 'center',
                color: '#1D3A70',
              }}>
              out
            </Text>
            <Text style={TextStyles.cancel} numberOfLines={1}>
              ${chartData.total_expense}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
