import { createSlice } from '@reduxjs/toolkit';

// Crée une tranche (slice) Redux pour gérer l'état du profil utilisateur
const profileSlice = createSlice({
    name: 'profile', // Nom de la tranche
    initialState: {
        email: '',
        firstName: '',
        lastName: '',
        userName: '',
    },
    reducers: {
        // Définit un réducteur "setGetProfile" qui met à jour l'état avec les données du profil reçues en tant qu'action
        setGetProfile: (state, action) => {
            state.email = action.payload.data.body.email;
            state.firstName = action.payload.data.body.firstName;
            state.lastName = action.payload.data.body.lastName;
            state.userName = action.payload.data.body.userName;
        },
        // Définit un réducteur "setEditProfile" qui met à jour le nom d'utilisateur (userName) dans l'état avec la valeur reçue en tant qu'action
        setEditProfile: (state, action) => {
            state.userName = action.payload;
        },
        resetProfile: () => {
            return initialState;
        },
    },
});

// Extrait les actions générées par createSlice pour être utilisées ailleurs
export const { setGetProfile, setEditProfile, resetProfile } =
    profileSlice.actions;

// Exporte le réducteur (reducer) généré par createSlice
export default profileSlice.reducer;