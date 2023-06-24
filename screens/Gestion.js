//Gestion des chansons de la chorale
import GestionComp from "./GestionComp"
import GestionInter from "./GestionInter"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()
const Gestion = () => {
  return (
    <Tab.Navigator
        initialRouteName="Compositions"
        screenOptions={{
            tabBarStyle: {
            backgroundColor: "rgba(63,67,89,1)",
            },
            tabBarActiveTintColor: "white",
            tabBarInactiveTintColor: "rgba(250,250,250,0.5)",
            tabBarLabelStyle: { fontWeight: "bold", fontSize: 15 },
            tabBarIndicatorStyle: { backgroundColor: "white", height: 5 },
        }}
    >
        <Tab.Screen name="Compositions" component={GestionComp} />
        <Tab.Screen name="Interpretations" component={GestionInter} />
    </Tab.Navigator>
  )
}

export default Gestion