import * as React from 'react';
import {Text, View, TextInput} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';

//styles
import {inputStyles} from '../../styles/InputStyles';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale} from '../../styles/scale';

//using react hook form to validate inputs
//Email input component with validation used in signin,signup screens
const Input = ({name, label, error, value, ...textInputProps}) => {
  const isError = Boolean(error);
  const [focused, setFocused] = React.useState(false);

  return (
    <>
      {label && (
        <Text style={{...TextStyles.cancel, paddingVertical: moderateScale(5)}}>
          {label}
        </Text>
      )}
      <View
        style={{...inputStyles.inputContainer, borderWidth: focused ? 1 : 0}}>
        <TextInput
          isError={isError}
          placeholder={!!label ? '' : name}
          {...textInputProps}
          placeholderTextColor={'#9CA3AF'}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyles.input}
          value={value ? value.replace(/\s/g, '') : value}
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
const Email_Input = props => {
  const {name, label, error, rules, defaultValue = '', ...inputProps} = props;
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
          error={error}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
        />
      )}
      name={name}
      rules={{
        value: true,
        required: `${name} is required`,
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: 'Please enter a valid email',
        },
      }}
    />
  );
};

export default Email_Input;
