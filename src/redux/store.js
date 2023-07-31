// importe les fonctions configureStore et combineReducers de la bibliothèque redux-toolkit
import { configureStore, combineReducers } from '@reduxjs/toolkit';

// importe le module de stockage par défaut de redux-persist qui utilise localStorage pour le web
import storage from 'redux-persist/lib/storage';

// importe la fonction persistReducer de redux-persist
import { persistReducer } from 'redux-persist';

// importe votre réducteur personnalisé
import user from '../reducer/user.slice';
import userSlice from '../reducer/user.slice';

// utilisation de combineReducers pour combiner plusieurs réducteurs en un seul. 
// Ici, nous n'avons que myReducer, mais vous pouvez ajouter d'autres réducteurs au besoin.
const reducers = combineReducers({
  user: userSlice,
  // add more reducers here
});

// Configuration pour redux-persist. Ici, le 'key' est l'endroit où notre état de l'application sera stocké 
// dans localStorage et 'storage' est la référence au stockage que nous utiliserons (ici, c'est le localStorage du navigateur).
const persistConfig = {
  key: 'music',
  storage,
};

// Crée un nouveau réducteur avec persistReducer qui enveloppe notre réducteur principal 
// et ajoute le code nécessaire pour rendre l'état du réducteur persistant.
// const persistedReducer = persistReducer(persistConfig, reducers);

// Crée le magasin Redux avec notre réducteur persistant et active les devtools Redux si nous ne sommes pas en production.
export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
