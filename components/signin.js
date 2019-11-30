import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,Image,Alert,TouchableHighlight
} from 'react-native';
import database from './Database'
import { LinearGradient } from 'expo-linear-gradient'
import { AsyncStorage } from 'react-native';


class signin extends React.Component {
  state = {
    email: '',
    password:'',
  };

  onPressSignUp(){
    this.props.navigation.navigate("signupScreen")
  }

  onPressOK = () => {
    account={
      email:this.state.email,
      password:this.state.password,
    }
    database.login(account, this.login_success, this.login__fail);
    
  };

  login_success=async()=>{
    AsyncStorage.setItem('email', this.state.email);
    AsyncStorage.setItem('password', this.state.password);
    this.props.navigation.navigate("BottomnavScreen")    
  }

  login__fail=async(error)=>{
    Alert.alert("error");
  }

  onChangeTextEmail = email => this.setState({email});
  onChangeTextPassword = password => this.setState({password});

  render() {
    return (
      <LinearGradient
       colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
       style={{flex: 1}}>
      {/* Head */}
      <View style={{flex: 1, flexDirection: 'row'}}>        
        <Text style={{fontSize: 50,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
          Sign in</Text>
      </View>
      <View style={{flex:1,justifyContent: 'center',marginBottom:200}}>
       <Text style={{fontSize: 30,marginLeft: 75}}>Email</Text>
      
      <TextInput
        style={styles.nameInput}
        onChangeText={this.onChangeTextEmail}
      />
      <Text style={{fontSize: 30,marginLeft: 75,}} >Password</Text>
      <TextInput 
        style={styles.nameInput}
        secureTextEntry ={true}
        onChangeText={this.onChangeTextPassword}
      />

      <TouchableOpacity
        style={styles.touchableUser}
        onPress={this.onPressOK}>
        <Text style={{fontSize:30,textAlign:'center'}}>Login</Text>
      </TouchableOpacity>
      <Text style={{fontSize:20,marginLeft:100}}>if you don't have any account</Text>
      <TouchableOpacity
            style={styles.touchableUser2}
            onPress={()=>this.onPressSignUp()}>
            <Text style={{fontSize:30,textAlign:'center'}}>sign up</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  touchableUser:{
    alignItems: 'center',
    height:50,
    backgroundColor: '#FEC100',
    fontSize:20,
    width: 250,
    marginLeft: 75,
    borderRadius:50,
    marginTop:50,
  },
  touchableUser2:{
    alignItems: 'center',
    height:50,
    backgroundColor: 'white',
    fontSize:20,
    width: 250,
    marginLeft: 75,
    borderRadius:50,
    marginTop:30,
  },
  nameInput: {
    alignItems: 'center',
    height:50,
    backgroundColor: 'white',
    padding: 10,
    borderColor:'white',
    borderWidth : 1,
    fontSize:20,
    width: 250,
    marginLeft: 75,
  },

});

export default signin;
