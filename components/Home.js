import React from 'react';
import { StyleSheet, Text, View,Alert,TouchableOpacity,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'

export default class Home extends React.Component {

  onPressSignUP()
  {
    this.props.navigation.navigate('signupScreen')
  }

  onPressSignIN()
  {
    this.props.navigation.navigate('signinScreen')
  }

  onPressTest(){
    this.props.navigation.navigate('testScreen')
  }

  render() {
    return (
      <LinearGradient
       colors={['#FEC100', '#FEC100', '#FEC100']}
       style={{flex: 1}}>
         <View style={{flex: 1,alignContent:'center',marginTop:100}} >
         <Image
              style={styles.imgStyles}
              source={{uri:'https://www.flaticon.com/premium-icon/icons/svg/2117/2117168.svg' }}/>

          <View style={{flex:1,marginTop:100}}>
            <TouchableOpacity
            style={styles.signUP}
            onPress={()=>this.onPressSignUP()}>
            <Text style={styles.txtUp}>
              Sign up
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.signIN}
              onPress={()=>this.onPressSignIN()}>
              <Text style={styles.txtUp}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>

       </LinearGradient>
        
    );
  }
}

const styles = StyleSheet.create({
  signUP:{
    alignItems: 'center',
    padding: 10,
    marginRight: 100,
    marginLeft: 100,
    marginTop:20,
    marginBottom:20,
    backgroundColor: '#F5F0F0',
    borderRadius: 55
  },
  signIN:{
    alignItems: 'center',
    padding: 10,
    marginRight: 100,
    marginLeft: 100,
    backgroundColor: '#FD3333',
    borderRadius: 55
  },   
  txt:{
      textAlign: 'center',
      fontSize:50
  },
  txtUp:{
      alignItems: 'center',
      textAlign: 'center',
      height:50,
      padding: 10,
      fontSize:20,
  },
  imgStyles: {
    width: 120,
    height: 120,
    alignItems:'center',
    resizeMode:'stretch',
    marginLeft:150
  }

})
