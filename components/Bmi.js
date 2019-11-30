import React from 'react';
import { Constants, ImagePicker, Permissions } from 'expo';
import {
  StyleSheet, Text,
  TextInput,  TouchableOpacity, View,
  Button, ImageEditor,Image,Alert,TouchableHighlight
} from 'react-native';
import database from './Database'
import { LinearGradient } from 'expo-linear-gradient'



class Bmi extends React.Component {

  onPressBack = () => {
    this.props.navigation.navigate("Page2Screen")
  }
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

      <View style={{flex: 1, flexDirection: 'row'}}>
        <Text style={{fontSize: 20,marginLeft:10,paddingTop:30
        }}>
          เกณฑ์ของ BMI</Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',marginBottom:230}}>
                <Image
                    style={styles.imgStyles}
                    source={{uri:'https://i.ibb.co/BBTp9bp/BMI.png' }}/>
          </View>

        <View style={{marginBottom:150}}>          
            <TouchableOpacity
              style={styles.touchableUser}
              onPress={this.onPressBack}>
              <Text style={{fontSize:20,textAlign:'center'}}>Back</Text>
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
  touchableUser:{
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor:'#FC815A',
    borderWidth : 1,
    marginLeft:30,
    width: 100,
  },
  imgStyles: {
    width: 350,
    height: 300,
    alignItems:'center',
    resizeMode:'stretch',
   
  }
});

export default Bmi;
