import * as React from 'react';
import {Text, View, TextInput} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';

//styles
import {inputStyles} from '../../styles/InputStyles';
import {TextStyles} from '../../styles/TextStyles';
import {moderateScale} from '../../styles/scale';

//using react hook form to validate inputs
//number input component with validation used in trasnfer, deposit and withdraw screens
const Input = ({name, label, border, styletype, error, ...textInputProps}) => {
  let container;
  let input;
  switch (styletype) {
    case 'border':
      container = {flex: 1};
      input = inputStyles.numberInput;
      break;
    case 'big':
      container = {flex: 1};
      input = inputStyles.bignumberInput;
      break;
  }
  const isError = Boolean(error);
  return (
    <>
      <Text style={{...TextStyles.cancel, paddingVertical: moderateScale(5)}}>
        {label}
      </Text>

      <View style={{...container}}>
        <TextInput
          isError={isError}
          {...textInputProps}
          placeholder={!!label ? '' : name}
          placeholderTextColor={'#9CA3AF'}
          keyboardType="numeric"
          style={{...input}}
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
const Number_Input = props => {
  const {
    name,
    label,
    border,
    error,
    rules,
    styletype,
    min,
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
          border={border}
          label={label}
          error={error}
          onChangeText={onChange}
          onBlur={onBlur}
          styletype={styletype}
          value={value ? value.replace(/\s/g, '') : value}
        />
      )}
      name={name}
      rules={{
        value: true,
        required: `${name} is required`,
        validate: value => value >= min || `Minimum is ${min} BUSD`,
      }}
    />
  );
};

export default Number_Input;
