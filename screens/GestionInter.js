//Gestion des chansons de la chorale
import { View, Text,ScrollView,TouchableOpacity,Dimensions,StatusBar } from 'react-native'
import { Overlay } from 'react-native-elements'
import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Entypo,MaterialIcons} from '@expo/vector-icons' 
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loadInters,loadIntersAdmin,setTitre,setPast } from '../redux/actions'
import { baseUrl } from '../api'

import NetInfo from '@react-native-community/netinfo'
let timer
const GestionInter = (props) => {
  const { interpretationsAdmin,past } = useSelector((state) => state.userReducer);
  const [showAlerte,setShowAlerte] = useState(false)
  const [showWarning,setShowWarning] = useState(false)
  const [id,setId] = useState('')
  const dispatch = useDispatch()
  const receiving = ()=>{
    NetInfo.addEventListener((net)=>{
      if(net.isConnected===true){
          axios.get(`${baseUrl}/songs?type=interpretation`)
          .then(res=>{
              dispatch(loadIntersAdmin(res.data))
              dispatch(loadInters(res.data))
          })
      }else setShowAlerte(true)
    })
  }
  const passer = ()=>{
    clearInterval(timer)
    timer = setInterval(()=>{
      if(past){
        props.navigation.navigate('NewSong')
        dispatch(setPast(false))
      }
    },100)
  }
  passer()
  const deleteSong = () =>{
    NetInfo.addEventListener((info)=>{
      if(info.isConnected===true){
        axios.post(`${baseUrl}/delete?id=${id}&type=interpretation`)
        .then((resp)=>{
          axios.get(`${baseUrl}/songs?type=interpretation`)
          .then(res=>{
            loadIntersAdmin(res.data)
            loadInters(res.data)
            setShowWarning(false)
            setId('')
          })
        })
      }else setShowAlerte(true)
    })
  }
  useEffect(()=>{
    receiving();
  },[])
  return (
    <View style={{height:Dimensions.get('window').height-StatusBar.currentHeight-150,alignItems:'center',backgroundColor:'rgba(63,67,89,0.5)',paddingBottom:5}}>
      <ScrollView>
        {
          interpretationsAdmin !=null && interpretationsAdmin.map((item,index)=>{
            return(
              <View key={index} style={{flexDirection:'row',width:Dimensions.get('window').width,height:Dimensions.get('window').height/12,backgroundColor:'rgba(63,67,89,1)',marginTop:2}} >
                <TouchableOpacity style={{width:'80%',height:'100%',justifyContent:'space-evenly',paddingLeft:5}} onPress={()=>{dispatch(setTitre(item.titre.toUpperCase()));props.navigation.navigate('Lecture',{song:item})}}>
                  <Text style={{fontWeight:'bold',fontSize:16,color:'white'}}>{`${index+1}. ${item.titre}`}</Text>
                  <Text style={{fontWeight:'bold',fontSize:14,color:'rgba(255,255,255,0.7)',fontStyle:'italic'}}>{item.auteur}</Text>
                </TouchableOpacity>
                <View style={{flexDirection:'row',alignItems:'center',width:'20%',height:'100%',justifyContent:'space-around'}}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('EditSong',{data:{...item,type:'interpretation'}})}>
                      <Entypo name='edit' size={24} color='white'/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{setId(item._id);setShowWarning(true)}}>
                      <MaterialIcons name='delete' size={24} color='white' />
                    </TouchableOpacity>
                </View>
              </View>
            )
          })
        }
      </ScrollView>
      <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15,alignItems:'center'}} isVisible={showAlerte} onBackdropPress={()=>setShowAlerte(false)}>
          <MaterialIcons name="wifi-off" size={80} color="orange" />
          <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10,color:'white'}}>Verifiez votre connexion internet</Text>
      </Overlay>
      <Overlay visible={showWarning} onBackdropPress={()=>{setShowWarning(false)}} overlayStyle={{width:'80%',height:'30%',justifyContent:'space-evenly',alignItems:'center',backgroundColor:'#3C4C59',borderRadius:10}}>
          <MaterialIcons name="error" size={48} color="orange" />
          <Text style={{color:'white',fontWeight:'bold',fontSize:18,textAlign:'center'}}>Etes-vous sûr de vouloir supprimer ce cantique ?</Text>
          <View style={{width:'100%',flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity style={{backgroundColor:'rgba(63,67,89,1)',borderRadius:10,height:40,width:50,justifyContent:'center',alignItems:'center'}} onPress={deleteSong}>
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'rgba(63,67,89,1)',borderRadius:10,height:40,width:50,justifyContent:'center',alignItems:'center'}} onPress={()=>setShowWarning(false)}>
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>Non</Text>
            </TouchableOpacity>
          </View>
      </Overlay>
    </View>
  )
}

export default GestionInter