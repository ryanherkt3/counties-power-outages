import { createSlice } from '@reduxjs/toolkit';

interface NoScrollState {
    value: boolean;
}

const initialState: NoScrollState = {
    value: false,
};

const noScrollSlice = createSlice({
    name: 'NoScroll',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload as boolean;
        },
    }
});

export const { update } = noScrollSlice.actions;

export default noScrollSlice.reducer;
