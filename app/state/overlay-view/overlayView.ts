import { OverlayOnView } from '@/app/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface OverlayViewState {
    value: OverlayOnView;
}

/**
 * showOnLoad values (TODO turn into enums):
 * 0 - no outage search param provided
 * 1 - outage search param provided, overlay not closed
 * 2 - outage search param provided, overlay closed
 */
const initialState: OverlayViewState = {
    value: { cardClickShow: false, showOnLoad: 0 },
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
