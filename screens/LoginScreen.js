import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    // Initialize our login state
    this.state = {
      email: '',
      password: ''
    }
  }

  // On our button press, attempt to login
  // this could use some error handling!
  onSubmit = () => {
    console.log("Button Pressed!");
    const { email, password } = this.state;

    fetch("https://webdev.cse.buffalo.edu/hci/thermalpaste/api/api/auth/login", {
      method: "POST",
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        email,
        password
      })
    })
    console.log("Fetch complete")
    .then(response => response.json())
    .then(json => {
      console.log(`Logging in with session token: ${json.token}`);

      // enter login logic here
      SecureStore.setItemAsync('session', json.token).then(() => {
        this.props.route.params.onLoggedIn();
      });
    })
    .catch(exception => {
        console.log("Error occured", exception);
        // Do something when login fails
    })
  }
  render() {
    const { email, password } = this.state

    // this could use some error handling!
    // the user will never know if the login failed.
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/LinkderLogo.png')}
        />
        <Text style={styles.loginText}>{'Login'}</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ email: text })}
          value={email}
          textContentType="emailAddress"
          placeholder='Enter Your Email'
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ password: text })}
          value={password}
          textContentType="password"
          secureTextEntry={true}
          placeholder='Enter Your Password'
        />        
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.4}
          onPress={this.onSubmit} 
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 30
  },
  logo: {
    // flex: 1,
    // width: 100,
    height: '29%',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginLeft: '20%',
    marginRight: '20%',
    borderWidth: 0
  },
  loginText: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 30,
    fontWeight: '700',
  },
  input: {
    height: 40,
    marginRight: '6%',
    marginLeft: '6%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 30,
    textAlign: 'center',
    borderRadius: 10,
  },
  loginButton: {
    marginRight: '20%',
    marginLeft: '20%',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    backgroundColor: '#48aae7',
    borderRadius: 100,
    borderWidth: 0,
  },
  loginButtonText: {
    color:'white',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10
  },
});
