import { createSlice } from '@reduxjs/toolkit';

interface DisclaimerOverlayViewState {
    value: boolean;
}

const initialState: DisclaimerOverlayViewState = {
    value: false
};

const disclaimerOverlayViewSlice = createSlice({
    name: 'disclaimerOverlayView',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload as boolean;
        }
    }
});

export const { update } = disclaimerOverlayViewSlice.actions;

export default disclaimerOverlayViewSlice.reducer;
