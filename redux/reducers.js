import { LOAD_SONGS,LOAD_SONGS_ADMIN,SET_TITRE,SET_PAST } from './actions'
import { saveSongs } from '../storage'

const initialSate = {
    titre:'',
    songs: [],
    songsAdmin:[],
    past: false
}

function userReducer(state = initialSate, action) {
    let { titre,songs,songsAdmin,past } = state
    switch (action.type) {
        case LOAD_SONGS:
            saveSongs(JSON.stringify(action.payload))//A tester
            return { ...state, songs: action.payload }
        case LOAD_SONGS_ADMIN:
            return { ...state, songsAdmin: action.payload }
        case SET_TITRE:
            return { ...state, titre: action.payload }
        case SET_PAST:
            return {...state, past: action.payload }
        default:
            return state
    }
}

export default userReducer