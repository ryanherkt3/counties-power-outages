import { configureStore } from '@reduxjs/toolkit';
import outageOverlayViewReducer from './outage-overlay-view/outageOverlayView';

export const store = configureStore({
    reducer: {
        outageOverlayView: outageOverlayViewReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
