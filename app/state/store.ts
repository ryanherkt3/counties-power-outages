import { configureStore } from '@reduxjs/toolkit';
import outageOverlayViewReducer from './outage-overlay-view/outageOverlayView';
import filterOverlayViewReducer from './filter-overlay-view/filterOverlayView';

export const store = configureStore({
    reducer: {
        outageOverlayView: outageOverlayViewReducer,
        filterOverlayView: filterOverlayViewReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
