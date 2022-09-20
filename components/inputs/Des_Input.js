import * as React from 'react';
import {Text, View, TextInput} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';

//styles
import {inputStyles} from '../../styles/InputStyles';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale} from '../../styles/scale';

//using react hook form to validate inputs
//description input component used in withdraw screen
const Input = ({name, error, label, func, type, ...textInputProps}) => {
  const isError = Boolean(error);
  const [focused, setFocused] = React.useState(false);

  return (
    <>
      {label && (
        <Text
          style={
            type
              ? {...TextStyles.headerText, color: '#fff'}
              : {...TextStyles.cancel, paddingVertical: moderateScale(5)}
          }>
          {label}
        </Text>
      )}

      <View
        style={
          type
            ? {...inputStyles.QRInputContainer}
            : {...inputStyles.inputContainer, borderWidth: focused ? 1 : 0}
        }>
        <TextInput
          isError={isError}
          placeholder={!!label ? '' : name}
          placeholderTextColor={'#9CA3AF'}
          {...textInputProps}
          onSubmitEditing={func}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={type ? inputStyles.QRInput : inputStyles.input}
        />
      </View>
      {error[name] ? (
        <Text style={inputStyles.error}>{error[name].message}</Text>
      ) : (
        <Text style={inputStyles.error}></Text>
      )}
    </>
  );
};

//validate above input with react hook form
const Des_Input = props => {
  const {
    name,
    label,
    error,
    type,
    rules,
    func,
    require,
    defaultValue = '',
    ...inputProps
  } = props;

  const formContext = useFormContext();
  const {control} = formContext;

  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <Input
          {...inputProps}
          name={name}
          label={label}
          func={func}
          error={error}
          type={type}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
      name={name}
    />
  );
};

export default Des_Input;
