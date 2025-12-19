import { configureStore } from '@reduxjs/toolkit'
import authReducers from './authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducers
    }
})

/*
    Why we have to import reducers in store?

    * Slice is just a logic and it is not global.
    * To make it global, we need to connect the reducers with store.
    * store is a single source of truth which listens to the dispatch.
 */