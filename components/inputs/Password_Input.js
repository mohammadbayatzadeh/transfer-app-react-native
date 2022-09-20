import * as React from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {Controller, useFormContext} from 'react-hook-form';

//images
const Eye = require('../../assets/icons/login-signup/eye.png');

//styles
import {inputStyles} from '../../styles/InputStyles';

//using react hook form to validate inputs
//password input component with validation and confirm password used in signin,signup screens
const Input = ({name, error, hidePass, setHidePass, ...textInputProps}) => {
  const isError = Boolean(error);
  const [focused, setFocused] = React.useState(false);
  return (
    <>
      <View
        style={{...inputStyles.inputContainer, borderWidth: focused ? 1 : 0}}>
        <TextInput
          isError={isError}
          placeholder={name}
          placeholderTextColor={'#9CA3AF'}
          autoCapitalize='none'
          {...textInputProps}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyles.input}
        />
        <TouchableOpacity onPress={() => setHidePass(!hidePass)}>
          <Image source={Eye} style={inputStyles.eye} />
        </TouchableOpacity>
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
const Password_Input = props => {
  const [hidePass, setHidePass] = React.useState(true);
  const {name, error, rules, confirm, defaultValue = '', ...inputProps} = props;

  const formContext = useFormContext();
  const {control} = formContext;

  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            {...inputProps}
            name={name}
            hidePass={hidePass}
            setHidePass={setHidePass}
            secureTextEntry={hidePass}
            error={error}
            
            onChangeText={onChange}
            onBlur={onBlur}
            value={value ? value.replace(/\s/g, '') : value}
          />
        )}
        name={name}
        rules={{
          value: true,
          required: `${name} is required`,
          minLength: {
            value: 8,
            message: 'Min length is 8',
          },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            message:
              'Your password must includes Uppercase letters, Lowercase letters and Numbers.',
          },
        }}
      />
      {confirm && (
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              {...inputProps}
              name="Confirm_Password"
              hidePass={hidePass}
              setHidePass={setHidePass}
              secureTextEntry={hidePass}
              error={error}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value ? value.replace(/\s/g, '') : value}
            />
          )}
          name="Confirm_Password"
          rules={{
            value: true,
            required: 'Confirm Password is required',
            validate: value =>
              value === formContext.getValues('Password') ||
              'The passwords do not match',
          }}
        />
      )}
    </>
  );
};

export default Password_Input;
