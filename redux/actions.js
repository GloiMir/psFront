export const LOAD_SONGS = "LOAD_SONGS"
export const LOAD_SONGS_ADMIN = "LOAD_SONGS_ADMIN"
export const SET_TITRE="SET_TITRE"
export const SET_PAST = "SET_PAST" //Pour passer à newSong depuis la tête de la page de gestion 

export const loadSongs = select=>dispatch=>{
    dispatch(
        {
            type:LOAD_SONGS,
            payload:select
        }
    )
}
export const loadSongsAdmin = select=>dispatch=>{
    dispatch(
        {
            type:LOAD_SONGS_ADMIN,
            payload:select
        }
    )
}
export const setTitre = select=>dispatch=>{
    dispatch(
        {
            type:SET_TITRE,
            payload:select
        }
    )
}
export const setPast = select=>dispatch=>{
    dispatch(
        {
            type:SET_PAST,
            payload:select
        }
    )
}



