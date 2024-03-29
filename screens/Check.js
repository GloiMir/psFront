//Espace de saisi de mot de passe pour valider le gestionnaire
import { View, Text,TouchableOpacity,TextInput,Dimensions,Image,StatusBar } from 'react-native'
import { Overlay } from 'react-native-elements'
import React,{useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Entypo,MaterialIcons } from '@expo/vector-icons'
import axios from 'axios'
import { baseUrl } from '../api'

import NetInfo from '@react-native-community/netinfo'

const Check = (props) => {
  const [showAlerte,setShowAlerte] = useState(false)
  const [showAlerte2,setShowAlerte2] = useState(false) //Pour la mauvaise connexion
  const [code,setCode] = useState('')
  const checking = ()=>{
    NetInfo.addEventListener((net)=>{
      if(net.isConnected===true){
        axios.post(`${baseUrl}/check?code=${code}`)
        .then((res)=>{
          if(res.data.status===true) {
            setCode('');
            props.navigation.navigate('Gestion')
          }else setShowAlerte(true)
        })
      }else setShowAlerte2(true)
    }) 
  }
  return (
    <KeyboardAwareScrollView>
    <View style={{justifyContent:'space-evenly',alignItems:'center',height:Dimensions.get('window').height-StatusBar.currentHeight-100,backgroundColor:'rgba(63,67,89,0.5)'}}>
      <Image source={require('../assets/logo.png')} style={{width:250,height:250}} />
      <View>
        <TextInput
        placeholder='Entrez le code admin'
        style={{width:Dimensions.get('window').width-20,height:Dimensions.get('window').height/15,backgroundColor:'white',fontSize:18,borderRadius:10,fontWeight:'bold',color:'rgba(63,67,89,1)'}}
        value={code}
        onChangeText={setCode}
        />
        <TouchableOpacity style={{justifyContent:'center',width:Dimensions.get('window').width-20,height:Dimensions.get('window').height/15,backgroundColor:'rgba(63,67,89,1)',fontSize:20,borderRadius:30,marginTop:20}} onPress={checking}>
          <Text style={{textAlign:'center',color:'white',fontSize:18,fontWeight:'bold'}} >Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
      <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15,alignItems:'center'}} isVisible={showAlerte} onBackdropPress={()=>setShowAlerte(false)}>
        <Entypo name="circle-with-cross" size={80} color="red" />
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10,color:'white'}}>Code admin invalide</Text>
      </Overlay>

      <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15,alignItems:'center'}} isVisible={showAlerte2} onBackdropPress={()=>setShowAlerte2(false)}>
        <MaterialIcons name="wifi-off" size={80} color="orange" />
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10,color:'white'}}>Verifiez votre connexion internet</Text>
      </Overlay>
    </KeyboardAwareScrollView>
  )
}

export default Check