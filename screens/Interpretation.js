//Liste de chansons de la chorale
import { View, Text, TouchableOpacity,ScrollView,Dimensions, StatusBar } from 'react-native'
import React,{useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { loadInters,setTitre } from '../redux/actions';
import { getInterpretations } from '../storage';

const liste = [
  {
      "_id": "6486b0724079f7949f6c9f2a",
      "auteur": "",
      "titre": "A pataye",
      "corps": [
          {
              "type": "refrain",
              "content": "Apataye muke amepata \nKitu kizuri biblia ya sema, \nHeri wa wili kuliko mumoja ah ah \nKuliko mumoja \n"
          },
          {
              "type": "couplet",
              "content": "Biblia ya sema kweli wa ndugu\nBiblia ya sema kweli wa ndugu\nMume ata acha baba na mama\nNa ku ambatana na muke wake\nHao wa wili mwili mumoja\nHao wa wili mwili mumoja\n"
          },
          {
              "type": "refrain",
              "content": "Mubarikiwe katika unyumba wenu\nMu barikiwe katika unyumba wenu\nMupendane bila unafiki \nHapo ndipo mutazipata \nBaraka Baraka Baraka."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486c5dc4079f7949f6c9f5e",
      "auteur": "",
      "titre": "Afrika amani",
      "corps": [
          {
              "type": "refrain",
              "content": "Ah Afrika twalia amani yo, Afrika twaomba amani, eh mungu utu shindie, twakosa amani inchini  mwetu Kongo oh Ee bwana utu onee hurua ah ah Afrika twalia amani yo Afrika twa omba amini Ee mungu utu onee huruma ah ah"
          },
          {
              "type": "couplet",
              "content": "Tuna kusihi baba kwa rehema zako tuletee amani amani amani ni wewe peke ndiwe tumaini letu"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486c54e4079f7949f6c9f5b",
      "auteur": "Frère Dudos",
      "titre": "Alikuja kwa walio wake",
      "corps": [
          {
              "type": "couplet",
              "content": "Kwa maana gisi mungu, \nKaupenda ulimwengu, \nHata kamutoa mwana wake wapekee, \nIli kila atakaye, \nMu amini asi potee \nBali awe na uzima wamilele.\n"
          },
          {
              "type": "refrain",
              "content": "Ali kuja kwawalio wake, \nIla walio wake walimukataa \nBali walio mpokea aliwapa \nUwezo wa ku itwa wana wa mungu."
          },
          {
              "type": "couplet",
              "content": "Mupokee yesu ili akae ndani yako, \nIli nawe u itwe mwana wa mungu \nUpate uzima wa milele\n\nKiambaza kilicho tutenga naye mungu baba\nYesu ali kibomoa, \nNeema bado ingalipo ndugu yangu \nYesu ana ku ita."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486dc6f9aa61ce3ad06107e",
      "auteur": "Frère Dudos",
      "titre": "Alikuja kwa walio wake",
      "corps": [
          {
              "type": "couplet",
              "content": "Kwa maana gisi mungu, \nKaupenda ulimwengu, \nHata kamutoa mwana wake wapekee, \nIli kila atakaye, \nMu amini asi potee \nBali awe na uzima wamilele.\n"
          },
          {
              "type": "refrain",
              "content": "Ali kuja kwawalio wake, \nIla walio wake walimukataa \nBali walio mpokea aliwapa \nUwezo wa ku itwa wana wa mungu."
          },
          {
              "type": "couplet",
              "content": "Mupokee yesu ili akae ndani yako, \nIli nawe u itwe mwana wa mungu \nUpate uzima wa milele\n\nKiambaza kilicho tutenga naye mungu baba\nYesu ali kibomoa, \nNeema bado ingalipo ndugu yangu \nYesu ana ku ita."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481e46b688752b33c072933",
      "auteur": "Frères Jimmy et Raph",
      "titre": "Allez vers tous les peuples",
      "corps": [
          {
              "type": "refrain",
              "content": "Allez vers tous les peuples, \nVers toutes les nations, \nAllez vers toutes les races \nPour annoncer l’évangile"
          },
          {
              "type": "couplet",
              "content": "Jésus dira à Nicodème, \nComme il te dit dès lors, \nQue tu ne peux hériter le royaume, \nSans être né de nouveau"
          },
          {
              "type": "couplet",
              "content": "Voilà l’importance du baptême, \nUne marque de la croyance, \nUne façon de confesser \nQue christ est le sauveur\n\n"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6486ba994079f7949f6c9f41",
      "auteur": "Frère Raphaël ",
      "titre": "Auprès de toi",
      "corps": [
          {
              "type": "couplet",
              "content": "Tout près de toi\nAuprès de toi\nPlus près de toi je veux demeurer "
          },
          {
              "type": "refrain",
              "content": "Plus près de toi, le reste de ma vie. \nPlus près de toi dans ta présence.     \nPlus près de toi, dans les rayons de ta splendeur, \nPlus de toi dans ta gloire qui gouverne"
          },
          {
              "type": "couplet",
              "content": "Dans la vallée de mes l’espérance,     \nOù le soleil ne brille pas                    \nOù les vents ne soufflent pas               \nOù  la guerre n'est pas le mode            \nEt la misère est maîtrisée"
          },
          {
              "type": "refrain",
              "content": "(Tout près de toi ah ah ah ah)\nMon asile préféré\n(Auprès de toi)\nOù mes rêves prennent chaire\n(Plus près de toi)\nAu bord de la rive du bonheur."
          }
      ],
      "__v": 0
  },
  {
      "_id": "6482a636f693389bb4948d42",
      "auteur": "Frères Jimm et Polin",
      "titre": "Baada ziki za duniya ",
      "corps": [
          {
              "type": "couplet",
              "content": "Baada ziki za dunia, \nNjaa teso nazo shida, \nMbingu tuta kapo fika, \nTutapanguzwa chozi naye Bwana\nTuta pewa taji ushindi, ni shangwe kua naye bwana.\n\nOh oh oh, oh oh oh oh, oh oh oh, alleluia x2\n"
          },
          {
              "type": "refrain",
              "content": "Milele tuta imba nawa malaika oh oh x4. \nTuta shangilia"
          }
      ],
      "__v": 0
  },
  {
      "_id": "6481d0176b5d0a602ad3dbf4",
      "auteur": "Frère L. Kayamba",
      "titre": "Cherches l’Éternel",
      "corps": [
          {
              "type": "couplet",
              "content": "Cherche l’Éternel pendant qu’il se trouve, invoquez-le, tandis qu’il est près, avant que ne surviennent les mauvais jours, où vous le chercherez et ne le trouverez point."
          },
          {
              "type": "refrain",
              "content": "Que le pécheur abandonne sa voie, et se tourne vers Dieu le créateur, notre Dieu est toujours près à pardonner"
          },
          {
              "type": "refrain",
              "content": "Que l’homme sans foi na  loi abandonne sa voie, et se tourne vers Dieu le créateur, notre Dieu est toujours près à pardonner."
          },
          {
              "type": "couplet",
              "content": "La vie nous n’avons qu’une seule puis vient le jugement, or, ceux qui sont en christ ne sont point jugés."
          }
      ],
      "__v": 0
  },
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