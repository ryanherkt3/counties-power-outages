import { configureStore } from '@reduxjs/toolkit';
import outageOverlayViewReducer from './outage-overlay-view/outageOverlayView';
import filterOverlayViewReducer from './filter-overlay-view/filterOverlayView';
import disclaimerOverlayViewReducer from './disclaimer-overlay-view/disclaimerOverlayView';
import noScrollReducer from './no-scroll/noScroll';

export const store = configureStore({
    reducer: {
        outageOverlayView: outageOverlayViewReducer,
        filterOverlayView: filterOverlayViewReducer,
        disclaimerOverlayView: disclaimerOverlayViewReducer,
        noScroll: noScrollReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
