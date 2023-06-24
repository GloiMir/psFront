//Liste de chansons de la chorale
import Composition from "./Composition"
import Interpretation from "./Interpretation"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

const Tab = createMaterialTopTabNavigator()
const Liste = (props) => {

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
        <Tab.Screen name="Compositions" component={Composition} />
        <Tab.Screen name="Interpretations" component={Interpretation} />
    </Tab.Navigator>
  )
}

export default Liste