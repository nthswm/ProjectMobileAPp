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


class edit extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password:'',
    uid:'',
    uri:'',
    imageuri:'https://sv1.picz.in.th/images/2019/08/22/ZRRyeW.png'
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
  onPressUpdateAccount= () => {      
    account={
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password,
      uid:this.state.uid,
      uri:this.state.uri
    }
    database.updateAccount(account,this.update_Account_success,this.update_Account_fail)

  };

  update_Account_success=async()=>{
    this.props.navigation.navigate("profileScreen");
    console.log('Update Success');
  }

  update_Account_fail=async()=>{
      console.log('Update Fail');
  }

  delete_Account_success=async()=>{
      console.log('Delete Success');
  }

  delete_Account_fail=async()=>{
      console.log('Delete Fail');
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ uri : result.uri})
      this.setState({ imageuri : result.uri });
    }
  };

  onChangeTextFirstName = firstName => this.setState({ firstName });
  onChangeTextLastName = lastName => this.setState({ lastName });


  render() {
    return (

      <LinearGradient
       colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
       style={{flex: 1}}>
      <View style={{flex:1,justifyContent: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{fontSize: 60,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
          BMI</Text>
        </View>              
          <Text style={styles.textfirst}>FirstName</Text>
            <TextInput
              style={styles.textInput}
              placeholder="FirstName"
              onChangeText={this.onChangeTextFirstName}/>
            <Text style={styles.textfirst}>LastName</Text>
            <TextInput
              style={styles.textInput}
              placeholder="LastName"
              onChangeText={this.onChangeTextLastName}/>

            <View style={{justifyContent:'center',marginLeft:125,marginTop:20, width:150}}>
                      <TouchableOpacity onPress={this.pickImage}>
                      <Image
                          style={styles.imgStyles}
                          source={{uri:this.state.imageuri}}/>
                      </TouchableOpacity>
                  </View>
            <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
              <TouchableOpacity
                style={styles.touchableUser}
                onPress={this.onPressUpdateAccount}>
                  <Text style={{fontSize:20, color:'#ffffff',textAlign:'center'}}>Submit</Text>
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

const offset = 16;
const styles = StyleSheet.create({

  textfirst: {
    alignItems: 'center',
    fontSize:20,
    marginLeft: 75,
    marginTop:20,
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
  imgStyles: {
    width: 120,
    height: 120,
    alignItems:'center',
    resizeMode:'stretch',
    margin:10,
  },


});

export default edit;
