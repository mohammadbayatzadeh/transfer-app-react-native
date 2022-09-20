import React, {useState} from 'react';
import {View, Modal, Animated, Easing} from 'react-native';

//styles
import {loadingStyles} from '../styles/Loading';

//used in most screens
const Loading = ({visible = true}) => {
  const [spinAnim1, setSpinAnim1] = useState(new Animated.Value(0));
  const [spinAnim2, setSpinAnim2] = useState(new Animated.Value(0));
  const [spinAnim3, setSpinAnim3] = useState(new Animated.Value(0));

  //creating 3 interpolate because of 3 rotating loops
  const spin1 = spinAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const spin2 = spinAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });
  const spin3 = spinAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  React.useEffect(() => {
    //creating 3 Animated.loop

    Animated.loop(
      Animated.timing(spinAnim1, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    Animated.loop(
      Animated.timing(spinAnim2, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
    Animated.loop(
      Animated.timing(spinAnim3, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={loadingStyles.loadingModalContainer}>
        <View style={loadingStyles.loadingModal} activeOpacity={1}>
          <Animated.View
            style={{
              ...loadingStyles.first,
              transform: [{translateY: 100}, {rotate: spin1}],
            }}></Animated.View>
          <Animated.View
            style={{
              ...loadingStyles.second,
              transform: [{rotate: spin2}],
            }}></Animated.View>
          <Animated.View
            style={{
              ...loadingStyles.third,
              transform: [{translateY: -100}, {rotate: spin3}],
            }}></Animated.View>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
