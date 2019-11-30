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


class changePWD extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    newpwd: '',
    uid:''
  };

  onFocusFunction = async() => {
    this.setState({ password:this.props.navigation.state.params.password});
    this.setState({ email:this.props.navigation.state.params.email});
    this.setState({ uid:this.props.navigation.state.params.uid});
  }

  async componentDidMount () {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  onPressBack = () => {
    this.props.navigation.navigate("profileScreen")
  }
  
  onPressOK = () => {    
    account={
        firstName:this.state.firstName,
        lastName:this.state.lastName,
        email:this.state.email,
        password:this.state.password,
        uid:this.state.uid,
        newpwd:this.newpwd
      }
      if(this.state.password == this.props.navigation.state.params.password){
        database.changePWD(account,this.state.newpwd);
        this.props.navigation.navigate("profileScreen");
      }
    
  }
  
  onChangeTextOldPassword = password => this.setState({ password });
  onChangeTextPassword = newpwd => this.setState({ newpwd });

  render() {
    return (
      <LinearGradient
       colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
       style={{flex: 1}}>
      <View style={{flex:1,justifyContent: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontSize: 60,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
            ChangePWD</Text>
        </View>    

      <Text style={styles.textfirst}>Old Password</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={this.onChangeTextOldPassword}
      />

      <Text style={styles.textfirst}>New Password</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={this.onChangeTextPassword}
      />

      <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.touchableUser}
          onPress={this.onPressOK}>
          <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}>Change</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.touchableUser1}
          onPress={this.onPressBack}>
          <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}>Back</Text>
        </TouchableOpacity>
      </View>
      

      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  textfirst: {
    alignItems: 'center',
    fontSize:20,
    marginLeft: 75,
  },
  touchableUser1:{
    alignItems: 'center',
    height:50,
    backgroundColor: '#FC815A',
    fontSize:20,
    width: 100,
    padding:10,
    marginLeft: 5,
    borderRadius:50,
    marginTop:50,
  },
  touchableUser:{
    alignItems: 'center',
    height:50,
    padding:10,
    backgroundColor: '#FEC100',
    fontSize:20,
    width: 100,
    marginLeft: 5,
    borderRadius:50,
    marginTop:50,
  },
  text: {
    alignItems: 'center',
    height:50,
    backgroundColor: 'white',
    padding: 10,
    borderColor:'white',
    borderWidth : 1,
    fontSize:20,
    width: 250,
    marginTop: 10,
    marginLeft: 75,
  },
  textInput: {
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

export default changePWD;
