import React from 'react';
import { Constants, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,Image,Alert,TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import database from './Database'
import * as firebase from 'firebase';
import '@firebase/firestore';

class signup extends React.Component {

  constructor (props){
     super (props);
     this.state ={
       firstName: '',
       lastName: '',
       email: '',
       password: '',
       imageuri:'https://sv1.picz.in.th/images/2019/08/22/ZRRyeW.png',
       url:''
     };
  }

  onPressBack = () => {
    this.props.navigation.navigate("HomeScreen");
  }

  onPressAddAccount = () => {
    this.props.navigation.navigate("signinScreen");
    account={
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password,
      url:this.state.url
    }    
    database.createAut(account,this.add_Aut_success,this.add_Aut_fail);
  };

  add_Account_success=async(id)=>{      
    Alert.alert("Suc")
  }

  add_Account_fail=async()=>{
    console.log('Create Account fail');
  }

  add_Aut_success=async()=>{        
    const res = await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
    account={
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password,
      url:this.state.url
    }  
     database.createAccount(account, res.user.uid, this.add_Account_success, this.add_Account_fail);
     database.uploadImage(account, this.state.url, this.upload_success, this.upload_fail, this.uploading_status);      
  }

  add_Aut_fail=async(error)=>{
    Alert.alert(error);
  }

  upload_success=async(uri)=>{
    this.setState({ uploaduri: uri });
    this.setState({ txtButton: "Success"});
  }

  upload_fail=async(error)=>{
    Alert.alert(error);
  }

  uploading_status=async(progress)=>{
    this.setState({ txtButton: progress});
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ url : result.uri})
      this.setState({ imageuri : result.uri });
    }
  };

  onChangeTextFirstName = firstName => this.setState({ firstName });
  onChangeTextLastName = lastName => this.setState({ lastName });
  onChangeTextEmail = email => this.setState({ email });
  onChangeTextPassword = password => this.setState({ password });

  render() {
    return (

      <LinearGradient
       colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
       style={{flex: 1}}>

      <View style={{flex:1,justifyContent: 'center'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontSize: 60,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
            Signup</Text>
        </View>  
        <Text style={styles.textfirst}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={this.onChangeTextEmail}
        />
        <Text style={styles.text2}>FirstName</Text>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          onChangeText={this.onChangeTextFirstName}/>
        <Text style={styles.text2}>LirstName</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          onChangeText={this.onChangeTextLastName}
        />        
        <Text style={styles.text2}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={this.onChangeTextPassword}
        />
        <View style={{justifyContent:'center', width:150,marginLeft:125}}>
             <TouchableOpacity onPress={this.pickImage}>
             <Image
                 style={styles.imgStyles}
                 source={{uri:this.state.imageuri}}/>
             </TouchableOpacity>
        </View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
        <TouchableOpacity
          style={styles.touchableUser}
          onPress={this.onPressAddAccount}>
            <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableUser1}
          onPress={this.onPressBack}>
            <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}>back</Text>
        </TouchableOpacity>
        </View>
        
      </View>
      </LinearGradient>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
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
  text2: {
    alignItems: 'center',
    fontSize:20,
    marginTop:10,
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
  imgStyles: {
    width: 120,
    height: 120,
    alignItems:'center',
    resizeMode:'stretch',
    margin:10,
  },
});

export default signup;
