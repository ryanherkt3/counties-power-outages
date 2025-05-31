import { OverlayOnView, OverlayVisibility } from '@/app/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface OverlayViewState {
    value: OverlayOnView;
}

const initialState: OverlayViewState = {
    value: { cardClickShow: false, isVisible: OverlayVisibility.Hidden },
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
