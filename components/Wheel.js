import * as React from 'react';
import {Text, View, Animated, Easing} from 'react-native';
import {Svg, Circle} from 'react-native-svg';
import {useFocusEffect} from '@react-navigation/native';
import {moderateScale} from '../styles/scale';

export const Wheel = ({score}) => {
  const [translation, setTranslation] = React.useState(new Animated.Value(0));

  //create interpolate and Animated.loop for lottery roatation
  const route = translation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useFocusEffect(
    React.useCallback(() => {
      Animated.loop(
        Animated.timing(translation, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    }, []),
  );
  const radius = (moderateScale(120) - 3) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 90;

  return (
    <View
      style={{
        margin: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: moderateScale(20),
          position: 'absolute',
        }}>
        {score}
      </Text>

      <Animated.View
        style={{
          transform: [{rotate: route}],
        }}>
        <Svg width={moderateScale(120)} height={moderateScale(120)}>
          <Circle
            stroke={'#2CBAB2'}
            fill="none"
            cx={moderateScale(120) / 2}
            cy={moderateScale(120) / 2}
            r={radius}
            strokeWidth={2}
          />
          <Circle
            stroke={'#fff'}
            fill="none"
            cx={moderateScale(120) / 2}
            cy={moderateScale(120) / 2}
            r={radius}
            strokeDasharray={`${circum} ${circum}`}
            strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
            strokeLinecap="round"
            transform={`rotate(-90, ${moderateScale(120) / 2}, ${
              moderateScale(120) / 2
            })`}
            strokeWidth={5}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};
