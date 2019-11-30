import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,ScrollView,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,Image,Alert,TouchableHighlight
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'
import HeaderNavigationBar from './HeaderNavigationBar'
import { Accelerometer } from 'expo-sensors';
import databasesq from './Databasesq'
import Items1 from './Items1'
import * as SQLite from 'expo-sqlite';


class test extends React.Component {
  state = {
    accelerometerData: {},
    n:'',
    items:null
  };

  onFocusFunction = async() => {
    databasesq.getAllText(this.get_alltext_success,this.get_alltext_fail);
    }
    async componentDidMount () {
      this.focusListener = this.props.navigation.addListener('didFocus', () => {
        this.onFocusFunction()
      })
    }
  _toggle = () => {
    setTimeout(() =>{
        this._unsubscribe();
        this.setState({n:round(this.state.accelerometerData.x).toString()+" " +round(this.state.accelerometerData.y).toString()+" "+round(this.state.accelerometerData.z).toString()})
        databasesq.putText(this.state.n,this.add_text_success,this.add_text_fail);
    }, 1000); 
    
  };

  add_text_success=async(data)=>{
    databasesq.getAllText(this.get_alltext_success,this.get_alltext_fail);
  }
  add_text_fail=async(error)=>{
    console.log(error);
  }

  get_alltext_success=async(arr)=>{
      this.setState({items:arr});
  }

  get_alltext_fail=async(error)=>{

  }

  _slow = () => {
    this._subscribe();  
  };
  _subscribe = () => {
      this._subscription = Accelerometer.addListener(accelerometerData => {
      this.setState({ accelerometerData });
    });
  };
  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };
  onPressDel = () => {
    databasesq.deleteAll();
    this.setState({items:null});
  }
  onPressToggle = () => {
    this._toggle()
  };

  onPressSlow = () => {
    this._slow()
  };

  onPressFast = () => {
    this._fast()
  };

  render() {
    let { x, y, z } = this.state.accelerometerData;
    return (

      <LinearGradient
       colors={['#F3E5D0', '#F3E5D0', '#F3E5D0']}
       style={{flex: 1}}>
      <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
      <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={{fontSize: 60,textAlign: "center",width: 430, height: 100, backgroundColor: '#FEC100'}}>
            Random</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center'}}>
          <Text style={styles.text}>{round(x)}</Text>
          <Text style={styles.text}>{round(y)}</Text>
          <Text style={styles.text}>{round(z)}</Text>
        </View>          
          <View style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity
                  style={styles.touchableUser}
                  onPress={this.onPressToggle}>
                  <Text style={{fontSize:20,textAlign:'center'}}>Stop</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.touchableUser}
                  onPress={this.onPressSlow}>
                  <Text style={{fontSize:20,textAlign:'center'}}>Start</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styles.touchableUser}
                  onPress={this.onPressDel}>
                  <Text style={{fontSize:20,textAlign:'center'}}>Delete</Text>
              </TouchableOpacity>

          </View>
          <ScrollView style={styles.listArea}>
          {
            this.state.items!=null? this.state.items.map(({id,done,value})=>(
              <Items1              
              heading={"History"}
              id={id}
              done={done}
              value={value}/>
            ))
            :null
          }
        </ScrollView>
      </View>
      </LinearGradient>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100);
};

const offset = 16;
const styles = StyleSheet.create({
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },
  text: {
      textAlign: 'center',
      textAlignVertical: "center",
      height:90,
      width:90,
      padding: 10,
      margin:15,
      backgroundColor:'white',
      fontSize:30,
  },
  touchableUser:{
    width:70,
    height:30,
    marginTop:10,
    marginLeft:20,
    backgroundColor:'#C4C4C4',
    borderWidth : 1,
  },
  title: {
    marginTop: offset,
    marginLeft: offset,
    fontSize: offset,
  },  
  listArea: {
  backgroundColor: "transparent",
  flex: 1,
  paddingTop: 16
  },
});

export default test;
