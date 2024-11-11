import { createSlice } from '@reduxjs/toolkit';

// Crée une tranche (slice) Redux pour gérer l'état de l'authentification de l'utilisateur
const userAuthSlice = createSlice({
    name: 'userAuth', // Nom de la tranche
    initialState: { token: '' }, // État initial contenant un champ "token" initialisé à une chaîne vide
    reducers: {
        // Définit un réducteur "setLogIn" qui met à jour le champ "token" de l'état avec la valeur reçue en tant qu'action
        setLogIn: (state, action) => {
            state.token = action.payload.token;
        },
        // Définit un réducteur "setLogOut" qui réinitialise le champ "token" à une chaîne vide, indiquant ainsi la déconnexion de l'utilisateur
        setLogOut: state => {
            state.token = '';
        },
    },
});

// Extrait les actions générées par createSlice pour être utilisées ailleurs
export const { setLogIn, setLogOut } = userAuthSlice.actions;

// Exporte le réducteur (reducer) généré par createSlice
export default userAuthSlice.reducer;