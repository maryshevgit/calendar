import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modalReducer from './modalSlice';

const rootReducer = combineReducers({
    modal: modalReducer,
});


export const store = configureStore({
    reducer: rootReducer,
})

