import React, {useState} from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import ButtonComponent from '../components/Button/ButtonComponent'
import TextComponent from '../components/Text/TextComponent'

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (username && password) {
      // Assuming the login is successful
      navigation.navigate('Home')
    } else {
      // Triggering the alert if either username or password is missing
      Alert.alert('Error', 'Please fill in both fields.')
    }
  }

  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.heading}>Login</Text>
        <TextInput
          placeholder='Username'
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder='Password'
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <ButtonComponent
          title='Login'
          onPress={handleLogin}
          buttonStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
        />
        <TextComponent
          style={styles.signupText}
          onPress={() => Alert.alert('Sign Up')}>
          Don't have an account? Sign Up
        </TextComponent>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // for Android shadow
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#007BFF',
    fontSize: 16,
  },
})

export default LoginScreen
