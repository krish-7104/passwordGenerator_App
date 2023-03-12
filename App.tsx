import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

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
    <ScrollView>
      <SafeAreaView style={styles.appContainer}>
        <Text style={styles.headText}>Password Generator</Text>
        <Formik
          initialValues={{passwordLength: ''}}
          validationSchema={passwordSceme}
          onSubmit={values => generatePassword(+values.passwordLength)}>
          {/* we can use + to convert string to number */}
          {({
            handleChange,
            handleReset,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formCont}>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Ex 8"
                    keyboardType="numeric"
                  />
                </View>
                {touched.passwordLength && errors.passwordLength && (
                  <Text style={styles.errorText}>{errors.passwordLength}</Text>
                )}
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="#ef4444"
                    isChecked={passwordData.numbers}
                    onPress={() =>
                      setPasswordData({
                        ...passwordData,
                        numbers: !passwordData.numbers,
                      })
                    }
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Include Uppercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="#22c55e"
                    isChecked={passwordData.uppercase}
                    onPress={() =>
                      setPasswordData({
                        ...passwordData,
                        uppercase: !passwordData.uppercase,
                      })
                    }
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Include Lowercase</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="#14b8a6"
                    isChecked={passwordData.lowercase}
                    onPress={() =>
                      setPasswordData({
                        ...passwordData,
                        lowercase: !passwordData.lowercase,
                      })
                    }
                  />
                </View>
              </View>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Include Special Character</Text>
                  <BouncyCheckbox
                    disableBuiltInState
                    fillColor="#0ea5e9"
                    isChecked={passwordData.symbols}
                    onPress={() =>
                      setPasswordData({
                        ...passwordData,
                        symbols: !passwordData.symbols,
                      })
                    }
                  />
                </View>
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={handleSubmit}>
                  <Text style={styles.btnText}>Generate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={handleReset}>
                  <Text style={styles.btnText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.resultArea}>
          <Text style={styles.passwordTitle}>Your Password</Text>
          <Text style={styles.passwordSubTitle}>{password}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formCont: {
    width: '90%',
    marginTop: 20,
  },
  headText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 24,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  inputStyle: {
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 1,
    width: '40%',
    padding: 12,
    fontSize: 14,
    textAlign: 'center',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnContainer: {
    width: '40%',
    padding: 12,
    marginTop: 30,
    backgroundColor: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#18181b',
  },
  resultArea: {
    marginTop: 40,
    borderRadius: 6,
    borderColor: 'white',
    borderWidth: 1,
    width: '80%',
    padding: 20,
  },
  passwordTitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  passwordSubTitle: {
    fontSize: 32,
    marginTop: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
