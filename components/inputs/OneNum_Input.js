import * as React from 'react';
import {Text, View} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

//styles
import {inputStyles} from '../../styles/InputStyles';

//using react native confirmation code field to validate
//used for enter codes with autofocus in OTP,Pin screens
const OneNum_Input = ({value, setValue, hide, border}) => {
  const CELL_COUNT = 5;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const renderCellShow = ({index, symbol, isFocused}) => {
    return (
      <Text
        key={index}
        style={[
          !border ? inputStyles.oneNumInput : inputStyles.oneNumInput_Border,
          isFocused && inputStyles.focusedInputContainer,
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </Text>
    );
  };
  const renderCellHide = ({index, symbol, isFocused}) => {
    let textChild = null;

    if (symbol) {
      textChild = hide ? '•' : symbol;
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text
        key={index}
        style={[
          !border ? inputStyles.oneNumInput : inputStyles.oneNumInput_Border,
        ]}
        onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };
  return (
    <View style={inputStyles.oneNumInputContainer}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={inputStyles.oneNumInputContainer}
        keyboardType="numeric"
        textContentType="oneTimeCode"
        renderCell={hide ? renderCellHide : renderCellShow}
      />
    </View>
  );
};

export default OneNum_Input;
