import { View, Text,TouchableOpacity } from 'react-native'
import { Overlay } from 'react-native-elements'
import React,{useState} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'


// Les composants du drawer navigation
import Check from './screens/Check'
import About from './screens/About'

// Les composants du stack navigation pour la lecture
import Liste from './screens/Liste'
import Lecture from './screens/Lecture'

// Le composant du stack navigation pour la gestion
import Gestion from './screens/Gestion'
import NewSong from './screens/NewSong2'
import EditSong from './screens/EditSong2'

//Les icones du drawer
import {AntDesign, Foundation, FontAwesome,FontAwesome5,Entypo,MaterialIcons ,MaterialCommunityIcons} from '@expo/vector-icons';

import axios from 'axios'
import { loadSongs,loadSongsAdmin,setPast } from './redux/actions'
import {useDispatch,useSelector} from 'react-redux'
import { baseUrl } from './api'

//Checker la connexion
import NetInfo from '@react-native-community/netinfo'

const Drawer = createDrawerNavigator()
const MyTabs = () => {
    const [showAlerte,setShowAlerte] = useState(false)
    const dispatch = useDispatch()
    const receiving = ()=>{
        NetInfo.addEventListener((net)=>{
            if(net.isConnected===true){
                axios.get(`${baseUrl}/songs`)
                .then(res=>{
                    dispatch(loadSongs(res.data))
                })
            }else setShowAlerte(true)
        })
    }
    return (
        <>
        <Drawer.Navigator screenOptions={{
            drawerActiveTintColor: 'white', drawerContentStyle: { backgroundColor: 'rgba(63,67,89,0.5)' },
            drawerInactiveTintColor: 'white', drawerActiveBackgroundColor: 'rgba(63,67,89,1)',
            drawerLabelStyle:{fontSize:18, fontWeight:'bold'},headerTintColor:'black'
        }}>
            <Drawer.Screen
                name='Principale'
                component={Liste}
                options={{
                    headerRight:()=>(
                    <TouchableOpacity style={{marginRight:20}} onPress={receiving}>
                        <FontAwesome name='refresh' size={24} color="black" />
                    </TouchableOpacity>
                    ),
                    headerShown: true,
                    headerTitle: 'Chorale Lumière',
                    headerStyle: {
                        backgroundColor: 'rgba(63,67,89,1)',
                        height: 100,
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color:'black'
                    },
                    drawerIcon :()=> <FontAwesome name="home" size={24} color="white" />,
                    title: 'Principale',
                }}
            />
            <Drawer.Screen
                name='Check'
                component={Check}
                options={{
                    headerShown: true,
                    headerTitle: 'Gestion',
                    headerStyle: {
                        backgroundColor: 'rgba(63,67,89,1)',
                        height: 100,
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color:'black'
                    },
                    drawerIcon :()=> <FontAwesome5 name="house-user" size={20} color="white" />,
                    title: 'Gestion'
                }}
            />
            <Drawer.Screen
                name='About'
                component={About}
                options={{
                    headerShown: true,
                    headerTitle: 'À propos',
                    headerStyle: {
                        backgroundColor: 'rgba(63,67,89,1)',
                        height: 100
                    },
                    headerTitleStyle: {
                        fontSize: 20,
                        fontWeight: 'bold',
                        color:'black'
                    },
                    drawerIcon :()=> <AntDesign name="infocirlceo" size={24} color="white" />,
                    title: 'À propos'
                }}
            />
        </Drawer.Navigator>
        <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15,alignItems:'center'}} isVisible={showAlerte} onBackdropPress={()=>setShowAlerte(false)}>
            <MaterialIcons name="wifi-off" size={80} color="orange" />
            <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10,color:'white'}}>Verifiez votre connexion internet</Text>
        </Overlay>
        </>
    );
}



const Stack = createStackNavigator()
export default function Navigation() {
    const { titre } = useSelector((state) => state.userReducer);
    const [showAlerte,setShowAlerte] = useState(false)
    const dispatch = useDispatch()

    const receiving = ()=>{
        NetInfo.addEventListener((net)=>{
            if(net.isConnected===true){
                axios.get(`${baseUrl}/songs`)
                .then(res=>{
                    dispatch(loadSongsAdmin(res.data))
                    dispatch(loadSongs(res.data))
                })
            }else setShowAlerte(true)
        })
    }

    const passer = ()=>{
        dispatch(setPast(true))
    }
    return (
        <>
            <Stack.Navigator
                initialRouteName="Tabs"
            >
                <Stack.Screen
                    name="Tabs"
                    options={{ headerShown: false }}
                    component={MyTabs} />
                <Stack.Screen
                    name='Check'
                    component={Check}
                    options={{ headerStyle: { backgroundColor: '#BF751B', height: 100 }, headerTitleStyle: { fontSize: 20, fontWeight: 'bold' }, headerTitle: 'titre' }} />
                <Stack.Screen
                    name='Lecture'
                    component={Lecture}
                    options={{ headerStyle: { backgroundColor: 'rgba(63,67,89,1)', height: 100 }, headerTitleStyle: { fontSize: 18, fontWeight: 'bold',color:'black' }, headerTitle: titre, headerTintColor:'black' }} />
                <Stack.Screen
                    name='Gestion'
                    component={Gestion}
                    options={{ headerRight:()=>(
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity style={{marginRight:20}} onPress={receiving}>
                                <FontAwesome name='refresh' size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginRight:20}} onPress={passer}>
                                <FontAwesome name="plus" size={24} color="black" />
                            </TouchableOpacity>
                        </View>                
                    ) ,headerStyle: { backgroundColor: 'rgba(63,67,89,1)', height: 100 }, headerTitleStyle: { fontSize: 20, fontWeight: 'bold',color:'black' }, headerTitle: 'Gestion des cantiques',headerTintColor:'black' }} />
                <Stack.Screen
                    name='NewSong'
                    component={NewSong}
                    options={{ headerStyle: { backgroundColor: 'rgba(63,67,89,1)', height: 100 }, headerTitleStyle: { fontSize: 20, fontWeight: 'bold',color:'black' }, headerTitle: 'Nouveau cantique',headerTintColor:'black' }} />
                <Stack.Screen
                    name='EditSong'
                    component={EditSong}
                    options={{ headerStyle: { backgroundColor: 'rgba(63,67,89,1)', height: 100 }, headerTitleStyle: { fontSize: 20, fontWeight: 'bold',color:'black' }, headerTitle: 'Modifier le cantique',headerTintColor:'black' }} />
            </Stack.Navigator>
            <Overlay overlayStyle={{width:'80%',backgroundColor:'#3C4C59',padding:0,borderRadius:15,alignItems:'center'}} isVisible={showAlerte} onBackdropPress={()=>setShowAlerte(false)}>
                <MaterialIcons name="wifi-off" size={80} color="orange" />
                <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',marginTop:10,marginBottom:10,color:'white'}}>Verifiez votre connexion internet</Text>
            </Overlay>
        </>
  )
}