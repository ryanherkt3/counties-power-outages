import { OverlayOnView, ShowOnLoadStates } from '@/app/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface OverlayViewState {
    value: OverlayOnView;
}

const initialState: OverlayViewState = {
    value: { cardClickShow: false, showOnLoad: ShowOnLoadStates.NeverShow },
};

const overlayViewSlice = createSlice({
    name: 'overlayView',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { update } = overlayViewSlice.actions;

export default overlayViewSlice.reducer;
