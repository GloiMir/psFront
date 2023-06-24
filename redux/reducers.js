import { LOAD_SONGS,LOAD_SONGS_ADMIN,LOAD_INTERS,LOAD_INTERS_ADMIN,SET_TITRE,SET_PAST } from './actions'
import { saveSongs,saveInterpretations } from '../storage'

const initialSate = {
    titre:'',
    songs: [],
    songsAdmin:[],
    interpretations:[],
    interpretationsAdmin:[],
    past: false
}

function userReducer(state = initialSate, action) {
    let { titre,songs,songsAdmin,past,interpretations,interpretationsAdmin } = state
    switch (action.type) {
        case LOAD_SONGS:
            saveSongs(JSON.stringify(action.payload))//A tester
            return { ...state, songs: action.payload }
        case LOAD_SONGS_ADMIN:
            saveSongs(JSON.stringify(action.payload))//A tester
            return { ...state, songsAdmin: action.payload }
        case LOAD_INTERS:
            saveInterpretations(JSON.stringify(action.payload))
            return {...state, interpretations:action.payload}
        case LOAD_INTERS_ADMIN:
            saveInterpretations(JSON.stringify(action.payload))
            return {...state, interpretationsAdmin:action.payload}
        case SET_TITRE:
            return { ...state, titre: action.payload }
        case SET_PAST:
            return {...state, past: action.payload }
        default:
            return state
    }
}

export default userReducer