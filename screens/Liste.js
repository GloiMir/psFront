//Liste de chansons de la chorale
import { View, Text, TouchableOpacity,ScrollView,Dimensions, StatusBar } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { loadSongs,loadSongsAdmin,setTitre } from '../redux/actions';
import { getSongs } from '../storage';
import {Overlay} from 'react-native-elements'

const psaumes = [
  {verset:'Psaumes 23,1',content:"L'Éternel est mon berger je ne manquerais de rien, il me fait reposer dans des verts paturages"},
  {verset:'Psaumes 25,20',content:"Garde mon âme et sauve-moi ! Que je ne sois pas confus, Quand je cherche auprès de toi mon refuge !"},
  {verset:'Psaumes 26,8',content:"Éternel ! j'aime le séjour de ta maison, Le lieu où ta gloire habite."},
  {verset:'Psaumes 29,2',content:"Rendez à l'Éternel gloire pour son nom ! Prosternez-vous devant l'Éternel avec des ornements sacrés !"},
  {verset:'Psaumes 29,9',content:"La voix de l'Éternel fait enfanter les biches, Elle dépouille les forêts. Dans son palais tout s'écrie : Gloire !"},
  {verset:'Psaumes 31,9',content:" Aie pitié de moi, Éternel ! car je suis dans la détresse ; J'ai le visage, l'âme et le corps usés par le chagrin."},
  {verset:'Psaumes 100,2',content:"Servez l'Éternel, avec joie, Venez avec allégresse en sa présence !"},
  {verset:'Psaumes 100,3',content:"Sachez que l'Éternel est Dieu ! C'est lui qui nous a faits, et nous lui appartenons ; Nous sommes son peuple, et le troupeau de son pâturage."},
  {verset:'Psaumes 101,2',content:"Je prendrai garde à la voie droite. Quand viendras-tu à moi ? Je marcherai dans l'intégrité de mon coeur, Au milieu de ma maison."},
  {verset:'Psaumes 101,7',content:"Celui qui se livre à la fraude n'habitera pas dans ma maison ; Celui qui dit des mensonges ne subsistera pas en ma présence."},
  {verset:'Psaumes 103,13',content:"Comme un père a compassion de ses enfants, L'Éternel a compassion de ceux qui le craignent."},
  {verset:'Psaumes 104,1',content:"Mon âme, bénis l'Éternel ! Éternel, mon Dieu, tu es infiniment grand ! Tu es revêtu d'éclat et de magnificence !"},
  {verset:'Psaumes 111,2',content:"Les oeuvres de l'Éternel sont grandes, Recherchées par tous ceux qui les aiment."},
  {verset:'Psaumes 111,10',content:"La crainte de l'Éternel est le commencement de la sagesse ; Tous ceux qui l'observent ont une raison saine. Sa gloire subsiste à jamais."},
  {verset:'Psaumes 112,4',content:"La lumière se lève dans les ténèbres pour les hommes droits, Pour celui qui est miséricordieux, compatissant et juste."},
  {verset:'Psaumes 112,5',content:"Heureux l'homme qui exerce la miséricorde et qui prête. Qui règle ses actions d'après la justice."},
  {verset:'Psaumes 116,5',content:"L'Éternel est miséricordieux et juste, Notre Dieu est plein de compassion ;"},
  {verset:'Psaumes 118,5',content:"Du sein de la détresse j'ai invoqué l'Éternel : L'Éternel m'a exaucé, m'a mis au large."},
  {verset:'Psaumes 118,9',content:"Mieux vaut chercher un refuge en l'Éternel Que de se confier aux grands."},
  {verset:'Psaumes 119,9',content:"Comment le jeune homme rendra-t-il pur son sentier ? En se dirigeant d'après ta parole."},
]
const aleatoire = (min, max) => { //Pour la seection aleatoire du psaume
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const Liste = (props) => {
  const [showPsaume,setShowPsaume] = useState(true)
  const [psaume,setPsaume] = useState({})
  const { songs } = useSelector((state) => state.userReducer);
  const height = StatusBar.currentHeight
  const dispatch = useDispatch()
  useEffect(()=>{
    setPsaume(psaumes[aleatoire(0,19)])
    const fetching = async ()=>{
      dispatch(loadSongs(JSON.parse(await getSongs())))
    }
    fetching()
  },[])
  return (
    <View style={{height:Dimensions.get('window').height-StatusBar.currentHeight-100,alignItems:'center',backgroundColor:'rgba(63,67,89,0.5)',paddingBottom:5}}>
      <ScrollView>
        {
          songs != null && songs.map((item,index)=>{
            return(
              <TouchableOpacity key={index} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height/12,backgroundColor:'rgba(63,67,89,1)',marginTop:2,justifyContent:'space-evenly'}} onPress={()=>{dispatch(setTitre(item.titre.toUpperCase()));props.navigation.navigate('Lecture',{song:item})}}>
                <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10,color:'white',maxWidth:'100%'}}>{`${index+1}. ${item.titre}`}</Text>
                <Text style={{fontSize:14,fontWeight:'bold',marginLeft:10,fontStyle:'italic',color:'rgba(255,255,255,0.7)'}}>{item.auteur}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
      <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15}} isVisible={showPsaume} onBackdropPress={()=>setShowPsaume(false)}>
        <Text style={{fontSize:18,color:'white',fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10}}>{psaume.verset}</Text>
        <Text style={{fontSize:18,color:'white',textAlign:'center',marginTop:10,marginBottom:10}}>{psaume.content}</Text>
      </Overlay>
    </View>
  )
}

export default Liste