//Lecture de texte de la chorale
import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'

const Lecture = (props) => {
  const {song} = props.route.params
  return (
    <View style={{height:Dimensions.get('window').height-125,alignItems:'center',backgroundColor:'#C5D0D9',paddingBottom:5}}>
      <ScrollView>
        {
          song.corps.map((item,index)=>{
            switch( item.type){
              case 'couplet':
                return(
                  <View key={index} style={{backgroundColor:'#3C4C59',marginTop:5,marginLeft:5,marginRight:5,padding:5,borderRadius:10}}>
                    <Text style={{maxWidth:Dimensions.get('window').width-10,fontSize:18,color:'white',textAlign:'center',fontWeight:'bold',fontStyle:'italic'}}>{item.content}</Text>
                  </View>
                )
              case 'refrain':
                return(
                  <View key={index} style={{backgroundColor:'rgba(63,67,89,1)',marginTop:5,marginLeft:5,marginRight:5,padding:5,borderRadius:10}}>
                    <Text style={{maxWidth:Dimensions.get('window').width-10,fontSize:18,color:'white',fontStyle:'italic',fontWeight:'bold',textAlign:'center'}}>{item.content}</Text>
                  </View>
                )
              case 'bridge':
                return(
                  <View key={index} style={{backgroundColor:'#3C4C59',marginTop:5,marginLeft:5,marginRight:5,padding:5,borderRadius:10}}>
                    <Text style={{maxWidth:Dimensions.get('window').width-10,fontSize:18,color:'white',textAlign:'center',fontStyle:'italic'}}>{item.content}</Text>
                  </View>
                )
              default:
                return(
                  <View key={index} style={{backgroundColor:'rgba(63,67,89,1)',marginTop:5,marginLeft:5,marginRight:5,padding:5,borderRadius:10}}>
                    <Text  style={{maxWidth:Dimensions.get('window').width-10,fontSize:18,color:'white',fontStyle:'italic',fontWeight:'bold'}}>{item.content}</Text>
                  </View>
                )
            }
          })
        }
      </ScrollView>
    </View>
  )
}

export default Lecture