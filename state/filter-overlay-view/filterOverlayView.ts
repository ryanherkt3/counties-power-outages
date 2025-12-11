import { FilterOverlayData, FilterOverlayStates, SelectedFilterOverlayValues } from '@/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface FilterOverlayViewState {
    value: FilterOverlayStates;
}

export const defaultDataValue: FilterOverlayData = {
    type: 'none',
    optionalDates: null
};

export const defaultFilterValue: SelectedFilterOverlayValues = {
    status: '',
    startdate: '',
    enddate: ''
};

const initialState: FilterOverlayViewState = {
    value: { isVisible: false, data: defaultDataValue, filterValues: defaultFilterValue },
};

const filterOverlayViewSlice = createSlice({
    name: 'filterOverlayView',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload as FilterOverlayStates;
        }
    }
});

export const { update } = filterOverlayViewSlice.actions;

export default filterOverlayViewSlice.reducer;
