import { configureStore } from '@reduxjs/toolkit';
import overlayViewReducer from './overlay-view/overlayView';
import overlayDataReducer from './overlay-data/overlayData';

export const store = configureStore({
    reducer: {
        overlayView: overlayViewReducer,
        overlayData: overlayDataReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
