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
import '@firebase/firestore';


class Page1 extends React.Component {
  
  state = {
    weight: '',
    height: '',
    bmi: '',
    uid: '',
    
  };
  onFocusFunction = async() => {
    const value = await AsyncStorage.getItem('email');
    database.readAll(value,this.read_Account_success,this.read_Account_fail)
}


async componentDidMount () {
  this.focusListener = this.props.navigation.addListener('didFocus', () => {
    this.onFocusFunction()
  })
}

read_Account_success=async(account)=>{
  this.setState({uid:account.uid})  
}



  btnPress(){
    let bmi = 0;
    let w = Number(this.state.weight);
    let h = Number(this.state.height);
    bmi = w/((h/100)**2);
    bmi = bmi.toFixed(2);
    this.setState({bmi:bmi})
    time = new Date();
    database.putBmi(bmi,time,this.state.uid,this.add_text_success,this.add_text_fail);
    
  }

 
  add_text_success=async()=>{
    console.log("Your BMI is"+this.state.bmi);
  }

  add_text_fail=async(error)=>{
      console.log(error);
  }


  render() {
    return (

      <LinearGradient
       colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
       style={{flex: 1}}>
     
      <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{fontSize: 60,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
          BMI</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
        
         <Text style={{fontSize:30,marginTop:80}}>Weight  </Text>
          <TextInput style={styles.weightInput} placeholder="Weight" 
            onChangeText={text => this.setState({ weight:text })}/>
          <Text style={{fontSize:30,marginTop:80}}> kg </Text>
        
      </View>

      <View style={{flex:1,flexDirection: 'row',justifyContent: 'center'}}>
         <Text style={{fontSize:30,marginTop:20,}}> Height </Text>
            <TextInput style={styles.heightInput} placeholder="Height"
             onChangeText={text => this.setState({ height:text })}/> 
          <Text style={{fontSize:30,marginTop:20,}}> cm </Text>
      </View>
     
      
        <TouchableOpacity onPress={() => this.btnPress()}
        style={styles.touchableUser}>
           <Text style={{fontSize:30,paddingBottom:10}}>
              Calculate
          </Text>
        </TouchableOpacity>
        <Text style={styles.txt}>
        BMI:{this.state.bmi} </Text>
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
  txt:{
    alignItems: 'center',
    height:100,
    backgroundColor: 'white',
    padding: 10,
    borderColor:'white',
    borderWidth : 1,
    fontSize:50,
    marginLeft:65,
    width: 250,
    marginBottom: 60,
  },
  touchableUser:{
    alignItems: 'center',
    padding: 10,
    height:60,
    marginRight: 100,
    marginLeft: 75,
    marginBottom:60,
    borderWidth:2,
    backgroundColor: '#C4C4C4',
   
  },
  weightInput: {
      alignItems: 'center',
      height:50,
      backgroundColor: '#C4C4C4',
      padding: 10,
      marginTop:80,
      borderColor:'#C4C4C4',
      borderWidth : 1,
      fontSize:20,
      
  },
  heightInput: {
    alignItems: 'center',
    height:50,
    backgroundColor: '#C4C4C4',
    padding: 10,
    marginTop:20,
    borderColor:'#C4C4C4',
    borderWidth : 1,
    fontSize:20,
    marginLeft: 10,
},

});

export default Page1;
