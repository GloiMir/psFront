//Liste de chansons de la chorale
import { View, Text, TouchableOpacity,ScrollView,Dimensions, StatusBar } from 'react-native'
import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { loadInters,setTitre } from '../redux/actions';
import { getInterpretations } from '../storage';

const liste = [
    {
        "_id": "6497306cacd853721b993059",
        "auteur": "",
        "titre": "Bwana wetu we ni mwema",
        "corps": [
            {
                "type": "couplet",
                "content": "Bwana wetu we ni mwema sisi tuna kupa sifa\n(Bwana wetu we ni mwema sis tuna kupa sifa)"
            }
        ],
        "__v": 0
    },
    {
        "_id": "6495fcde1e75377cf3e6fb98",
        "auteur": "Michael",
        "titre": "Mon désir",
        "corps": [
            {
                "type": "couplet",
                "content": "Mon désir\nSeulement ta présence\nDans ma vie\nMon Jésus, elle demeurera \nune évidence"
            },
            {
                "type": "bridge",
                "content": "Que faire sinon seulement t'adorer\nJésus mon Seigneur, mon sauveur"
            }
        ],
        "__v": 0
    }
]

const Interpretation = (props) => {
  const { interpretations } = useSelector((state) => state.userReducer);
  const height = StatusBar.currentHeight
  const dispatch = useDispatch()

  useEffect(()=>{
    const fetching = async ()=>{
      const chansons = JSON.parse(await getInterpretations())
      if (chansons === null) dispatch(loadInters(liste));else dispatch(loadInters(chansons))
    }
    fetching()
  },[])

  return (
    <View style={{height:Dimensions.get('window').height-StatusBar.currentHeight-150,alignItems:'center',backgroundColor:'rgba(63,67,89,0.5)',paddingBottom:5}}>
      <ScrollView>
        {
          interpretations.map((item,index)=>{
            return(
              <TouchableOpacity key={index} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height/12,backgroundColor:'rgba(63,67,89,1)',marginTop:2,justifyContent:'space-evenly'}} onPress={()=>{dispatch(setTitre(item.titre.toUpperCase()));props.navigation.navigate('Lecture',{song:item})}}>
                <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10,color:'white',maxWidth:'100%'}}>{`${index+1}. ${item.titre}`}</Text>
                <Text style={{fontSize:14,fontWeight:'bold',marginLeft:10,fontStyle:'italic',color:'rgba(255,255,255,0.7)'}}>{item.auteur}</Text>
              </TouchableOpacity>
            )
          }) 
        }
      </ScrollView>
    </View>
  )
}

export default Interpretation