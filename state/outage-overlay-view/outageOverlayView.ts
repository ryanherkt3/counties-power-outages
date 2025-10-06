import { OutageData, OutageOverlayStates } from '@/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface OutageOverlayViewState {
    value: OutageOverlayStates;
}

const fakeString = '';

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
    lat: null,
    lng: null,
    distance: null,
    hull: (fakeString ? JSON.parse('') : []),
    shutdownperiodstart: '',
    shutdownperiodend: '',
    address: '',
    statustext: 'Scheduled',
    latestinformation: '',
    originalshutdowndate: '',
    originalshutdownperiods: [{
        start: '',
        end: '',
    }],
    originalshutdownperiodstart: '',
    originalshutdownperiodend: '',
    expiredOutage: false,
    lastmodified: '',
    dummyData: true,
};

const initialState: OutageOverlayViewState = {
    value: { cardClickShow: false, isVisible: 'Hidden', data: defaultDataValue },
};

const outageOverlayViewSlice = createSlice({
    name: 'outageOverlayView',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload;
        },
        resetAfterView: (state) => {
            state.value = { cardClickShow: false, isVisible: 'Closed', data: defaultDataValue };
        }
    }
});

export const { update, resetAfterView } = outageOverlayViewSlice.actions;

export default outageOverlayViewSlice.reducer;
