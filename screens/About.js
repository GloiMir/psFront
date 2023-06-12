//Pour à propos de l'application
import { View, Text,Dimensions, StatusBar } from 'react-native'
import React from 'react'

const About = () => {
  return (
    <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-StatusBar.currentHeight-100,alignItems:'center',backgroundColor:'rgba(63,67,89,0.5)',justifyContent:'space-evenly'}}>
      <View style={{width:Dimensions.get('window').width-10,height:'45%',backgroundColor:'rgba(63,67,89,1)',justifyContent:'space-around',borderRadius:10,paddingLeft:5}}>
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',color:'white'}}>APPLICATION</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18,color:'white'}}>Nom :</Text><Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic',color:'white'}}>  ParméS</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18,color:'white'}}>Version :</Text><Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic',color:'white'}}>  2.0.0</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18,color:'white'}}>Propriétaire :</Text><Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic',maxWidth:'70%',textAlign:'center',color:'white'}}>  Chorale Lumière  de l'aumonerie universitaire de l'ULPGL Goma</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18,color:'white'}}>Contenu :</Text><Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic',maxWidth:'70%',textAlign:'center',color:'white'}}>  Textes des cantiques de la chorale Lumière et de ceux interpretés par la chorale Lumière</Text>
        </View>
      </View>
      <View style={{width:Dimensions.get('window').width-10,height:'45%',backgroundColor:'rgba(63,67,89,1)',justifyContent:'space-around',borderRadius:10,paddingLeft:5}}>
        <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',color:'white'}}>AUTEURS</Text>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18,color:'white'}}>Développeur :</Text><Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic',color:'white'}}>  Gloire MIRINDI {"\n"} +243 978112143</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18,color:'white'}}>Graphiste :</Text><Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic',color:'white'}}>  Daniel MAKELELE,{"\n"} +243 976822444</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:18,color:'white'}}>Initiateur :</Text><Text style={{fontSize:18,fontWeight:'bold',fontStyle:'italic',color:'white'}}>  Ghislain MUMBERE {"\n"} +243 995235854</Text>
        </View>
      </View>
    </View>
  )
}

export default About