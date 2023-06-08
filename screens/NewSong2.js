// Insertion des nouveaux cantiques
import { View, Text,TextInput,ScrollView,Dimensions,TouchableOpacity,FlatList, StatusBar } from 'react-native'
// import InputScrollView from 'react-native-input-scroll-view'
import React,{useState} from 'react'
import { Overlay } from 'react-native-elements'
import { MaterialIcons,Entypo,Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loadSongsAdmin,loadSongs } from '../redux/actions'
import { baseUrl } from '../api'

import NetInfo from '@react-native-community/netinfo'

const NewSong = (props) => {
  const dispatch = useDispatch()
  const [auteur,setAuteur] = useState('')
  const [titre,setTitre] = useState('')
  const [corps,setCorps] = useState([{type:"type",content:""}])
  const [showAlerte,setShowAlerte] = useState(false)
  const ajouter = ()=> {
    setCorps([...corps,{type:"type",content:""}])
  }
  const envoyer = () =>{
    NetInfo.addEventListener((info)=>{
      if(info.isConnected===true){
        axios.post(`${baseUrl}/song`,{auteur,titre,corps})
        .then((res)=>{
          dispatch(loadSongsAdmin(res.data))
          dispatch(loadSongs(res.data))
          props.navigation.navigate('Gestion')
        })
      }else setShowAlerte(true)
    })
  }
  
  return (
      <KeyboardAwareScrollView>
    <View style={{height:Dimensions.get('window').height-StatusBar.currentHeight-100,width:Dimensions.get('window').width,alignItems:'center',backgroundColor:'rgba(63,67,89,0.5)'}} >
      <View style={{height:(Dimensions.get('window').height-125)*(2/10),width:'100%',alignItems:'center',justifyContent:'space-around'}}>
        <TextInput style={{width:Dimensions.get('window').width-10,height:'40%',backgroundColor:'white',fontSize:18,fontWeight:'bold',paddingLeft:5}} maxLength={20} value={auteur} onChangeText={setAuteur} placeholder='Auteur du cantique' />
        <TextInput style={{width:Dimensions.get('window').width-10,height:'40%',backgroundColor:'white',fontSize:18,fontWeight:'bold',paddingLeft:5}} maxLength={40} value={titre} onChangeText={setTitre} placeholder='Titre du cantique' />
      </View>
      <ScrollView>
          {
            corps.map((item,index)=>(
              <View key={index} style={{width:'100%',justifyContent:'flex-start',alignItems:'center',marginBottom:5}}>
                <Picker
                    style={{ width: Dimensions.get('window').width-10, height: (Dimensions.get('window').height-125)/10, fontSize:18, fontWeight:'bold',backgroundColor:'white'}}
                    selectedValue={item.type}
                    onValueChange={(itemValue, itemIndex) =>{
                      setCorps([...corps, corps[index].type=itemValue]);setCorps(corps.filter(e=>e.type!=undefined))
                    }                  
                    }>
                    <Picker.Item label="Type de cette partie" value="type" />
                    <Picker.Item label="Couplet" value="couplet" />
                    <Picker.Item label="Refrain" value="refrain" />
                    <Picker.Item label="Bridge" value="bridge" />
                </Picker>
                <TextInput textAlignVertical='top' value={item.content} onChangeText={(e)=>{setCorps([...corps, corps[index].content=e]);setCorps(corps.filter(e=>e.type!=undefined))}} placeholder='Contenu de cette partie' style={{width:Dimensions.get('window').width-10,minHeight:(Dimensions.get('window').height-125)*6/40,height:(Dimensions.get('window').height-100)*6/10,backgroundColor:'white',fontSize:18,fontWeight:'bold',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',paddingLeft:5}} multiline={true} />
              </View>
            ))
          }
        </ScrollView>
      {/* </View> */}
      <TouchableOpacity style={{width:60,height:60,backgroundColor:'rgba(63,67,89,1)',borderRadius:35,justifyContent:'center',alignItems:'center',position:'absolute',bottom:70,right:5}} onPress={ajouter}>   
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={{width:60,height:60,backgroundColor:'rgba(63,67,89,1)',borderRadius:35,justifyContent:'center',alignItems:'center',position:'absolute',bottom:5,right:5}} onPress={envoyer}>
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
      <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15,alignItems:'center'}} isVisible={showAlerte} onBackdropPress={()=>setShowAlerte(false)}>
          <MaterialIcons name="wifi-off" size={80} color="orange" />
          <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10,color:'white'}}>Verifiez votre connexion internet</Text>
      </Overlay>
    </View>
    </KeyboardAwareScrollView>
  )
}

export default NewSong