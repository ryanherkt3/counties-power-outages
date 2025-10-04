import { configureStore } from '@reduxjs/toolkit';
import outageOverlayViewReducer from './outage-overlay-view/outageOverlayView';
import filterOverlayViewReducer from './filter-overlay-view/filterOverlayView';
import noScrollReducer from './no-scroll/noScroll';

export const store = configureStore({
    reducer: {
        outageOverlayView: outageOverlayViewReducer,
        filterOverlayView: filterOverlayViewReducer,
        noScroll: noScrollReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
