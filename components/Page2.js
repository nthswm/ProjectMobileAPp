import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Alert,FlatList
} from 'react-native';
import database from './Database'
import { LinearGradient } from 'expo-linear-gradient'
import Items1 from './Items1'
import { AsyncStorage } from 'react-native';

class Page2 extends React.Component {
  

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
  database.readBmi(this.state.uid,this.read_Bmi_success,this.read_Bmi_fail)  
}
constructor(props){
  super(props)
  this.state = {
    text: '',
    uid:'',
    bmi:'',
    item:[]
  };
}


  onPressBmi= () => {
    this.props.navigation.navigate('BmiScreen')
  }

  read_Bmi_success=async(Bmi)=>{
    //Alert.alert(Bmi.bmi);
    this.setState({ item: this.state.item.concat([  {
      bmi: Bmi.bmi,
      time: Bmi.time,
      uid: Bmi.uid,
    }])
  });  
  }
    

  render() {     
    return ( 

      <LinearGradient
       colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
       style={{flex: 1}}>
      <View style={{flex:1,justifyContent: 'center'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{fontSize: 60,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
          History</Text>
      </View>
      
      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{fontSize: 30,textAlign: "center",width: 200, 
        height: 50, backgroundColor: '#FEC100',marginLeft:100,
        marginTop:50}}>
          Result</Text>
      </View>
      <View>
      <FlatList
           data={this.state.item}
            style={styles.container}
            renderItem={({ item }) => <Text style={{fontSize:15,textAlign:"center"}} >{item.bmi}</Text>}
                          /> 
      </View>

      
      <TouchableOpacity
              style={styles.bmI}
              onPress={this.onPressBmi}>
              <Text >
                เกณฑ์ BMI
              </Text>
      </TouchableOpacity>

      </View>
      </LinearGradient>
    );
  }
}

const offset = 16;
const styles = StyleSheet.create({
  listArea: {
    backgroundColor: "transparent",
    flex: 1,
    paddingTop: 16
    },
  bmI:{
    alignItems: 'center',
    padding: 10,
    marginRight: 100,
    width:100,
    backgroundColor: '#4FD420',
    borderRadius: 55,
    marginBottom:50,
    marginLeft:100,
  },
  container:{
    backgroundColor:'#C4C4C4',
    marginLeft:100,
    width: 200,
    marginBottom:100
  }
   

});

export default Page2;
