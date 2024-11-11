import { configureStore } from '@reduxjs/toolkit';
import userAuthSlice from '../reducers/userAuthSlice';
import profileSlice from '../reducers/profileSlice';

// Configure et crée un magasin Redux en utilisant configureStore
const store = configureStore({
    reducer: {
        // Définit les tranches (slices) à utiliser dans le magasin
        userAuth: userAuthSlice, // Utilise la tranche "userAuth" pour gérer l'authentification de l'utilisateur
        profile: profileSlice, // Utilise la tranche "profile" pour gérer les données du profil de l'utilisateur
    },
});

// Exporte le magasin configuré pour être utilisé dans l'application
export default store;