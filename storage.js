import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveSongs = async (value) => {
    try {
        await AsyncStorage.setItem('songs', value)
    } catch (error) {
        console.log(error)
    }
}
export const getSongs = async () => {
    try {
        const songs =await AsyncStorage.getItem('songs')
        return songs
    } catch (error) {
        console.log(error)
    }
}

export const saveInterpretations = async (value) => {
    try {
        await AsyncStorage.setItem('interpretations', value)
    } catch (error) {
        console.log(error)
    }
}
export const getInterpretations = async () => {
    try {
        const songs =await AsyncStorage.getItem('interpretations')
        return songs
    } catch (error) {
        console.log(error)
    }
}
