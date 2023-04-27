import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './features/api/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
    devTools: true,
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: gDM => gDM().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
