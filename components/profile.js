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

class profile extends React.Component {

  constructor (props){
     super (props);
     this.state = {
       firstName: '',
       lastName: '',
       email: '',
       password:'',
       uid:'',
       imageuri :'https://sv1.picz.in.th/images/2019/08/22/ZRRyeW.png',
     };

  } 
  
  onFocusFunction = async() => {
      const value = await AsyncStorage.getItem('email');
      database.readAll(value,this.read_Account_success,this.read_Account_fail)
  }

  
  async componentDidMount () {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  onPressChangePWD = () => {
    this.props.navigation.navigate("ChangeScreen",{email: this.state.email, password: this.state.password, uid: this.state.uid});
  }
  
  onPressOK = () => {
    this.props.navigation.navigate("editScreen",{email: this.state.email, password: this.state.password, uid: this.state.uid});
  };

  read_Account_success=async(account)=>{
    this.setState({firstName:account.firstName});
    this.setState({lastName:account.lastName});
    this.setState({email:account.email});
    this.setState({imageuri:account.url})
    this.setState({password:account.password})
    this.setState({uid:account.uid})
    
  }

  read_Account_fail=async()=>{

  }


  render() {
    return (
      <LinearGradient
      colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
      style={{flex: 1}}>
         
      <View style={{flex:1,justifyContent: 'center'}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontSize: 60,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
            Profile</Text>
        </View>      
        <Text style={styles.textfirst}>Email</Text>
        <Text style={styles.text}>{this.state.email}</Text>
        <Text style={styles.text2}>FirstName</Text>
        <Text style={styles.text}>{this.state.firstName}</Text>
        <Text style={styles.text2}>LastName</Text>
        <Text style={styles.text}>{this.state.lastName}</Text>
        
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.text2}>Password</Text>
            <TouchableOpacity
              style={styles.touchpass}
              onPress={this.onPressChangePWD}>
              <Text style={{fontSize:20,textAlign:'center'}}>change</Text>
            </TouchableOpacity>
          </View>
        <Text style={styles.text}>******</Text>                 
          <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
                <Image
                    style={styles.imgStyles}
                    source={{uri:this.state.imageuri}}/>                    
            <TouchableOpacity
              style={styles.touchEdit}
              onPress={this.onPressOK}>
              <Text style={{fontSize:20,textAlign:'center'}}>edit</Text>
            </TouchableOpacity>
          </View>

      </View>
      </LinearGradient>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  touchpass:{
    width:70,
    height:30,
    marginTop:10,
    marginLeft:75,
    backgroundColor:'#C4C4C4',
    borderWidth : 1,
  },
  touchEdit:{
    width:70,
    height:30,
    marginTop:15,
    borderRadius: 45,
    backgroundColor:'#FEC100',
  },

  touchableUser:{
    alignItems: 'center',
    padding:10,
    borderRadius: 50,
    borderColor:'white',
    borderWidth : 1,
    margin:5,
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
  textfirst: {
    alignItems: 'center',
    fontSize:20,
    marginLeft: 75,
  },
  text2: {
    alignItems: 'center',
    fontSize:20,
    marginTop:10,
    marginLeft: 75,
  },
  imgStyles: {
    width: 120,
    height: 120,
    alignItems:'center',
    resizeMode:'stretch',
    margin:10,
  }
});

export default profile;
