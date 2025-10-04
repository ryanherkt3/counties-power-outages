import { OutageData, OutageOverlayStates, OverlayVisibility } from '@/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface OutageOverlayViewState {
    value: OutageOverlayStates;
}

const defaultDataValue: OutageData = {
    id: '',
    projecttype: '',
    description: '',
    shutdowndatetime: '',
    shutdowndate: '',
    shutdownperiods: [{
        start: '',
        end: '',
    }],
    feeder: '',
    affectedcustomers: 1,
    lat: 1,
    lng: 1,
    distance: 1,
    hull: [{
        lat: 1,
        lng: 1,
    }],
    address: '',
    statustext: 'Scheduled',
    latestinformation: '',
    originalshutdowndate: '',
    originalshutdownperiods: [{
        start: '',
        end: '',
    }],
    expiredOutage: false,
    lastmodified: '',
    dummyData: true,
};

const initialState: OutageOverlayViewState = {
    value: { cardClickShow: false, isVisible: OverlayVisibility.Hidden, data: defaultDataValue },
};

const outageOverlayViewSlice = createSlice({
    name: 'outageOverlayView',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        },
        resetAfterView: (state) => {
            state.value = { cardClickShow: false, isVisible: OverlayVisibility.Closed, data: defaultDataValue };
        }
    }
});

export const { update, resetAfterView } = outageOverlayViewSlice.actions;

export default outageOverlayViewSlice.reducer;
