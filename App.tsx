import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'Yup';

const passwordSceme = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be min of 4 Character')
    .max(16, 'Should be max of 16 Character')
    .required('Length is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [passwordData, setPasswordData] = useState({
    lowercase: true,
    uppercase: false,
    numbers: false,
    symbols: false,
  });

  const generatePassword = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';

    if (passwordData.uppercase) {
      characterList += upperCaseChars;
    }
    if (passwordData.lowercase) {
      characterList += lowerCaseChars;
    }
    if (passwordData.numbers) {
      characterList += digitChars;
    }
    if (passwordData.symbols) {
      characterList += specialChars;
    }
    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const charIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(charIndex);
    }
    return result;
  };

  const resetPasswordState = () => {
    setIsPassGenerated(false);
    setPassword('');
    setPasswordData({
      lowercase: true,
      uppercase: false,
      numbers: false,
      symbols: false,
    });
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
