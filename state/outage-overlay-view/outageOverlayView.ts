import { OutageData, OutageOverlayStates } from '@/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface OutageOverlayViewState {
    value: OutageOverlayStates;
}

const defaultDataValue: OutageData = {
    id: '',
    projectType: '',
    shutdownDateTime: '',
    shutdownDate: '',
    feeder: '',
    affectedCustomers: 1,
    lat: 1,
    lng: 1,
    distance: 1,
    hull: [],
    shutdownPeriodStart: '',
    shutdownPeriodEnd: '',
    address: '',
    statusText: 'Scheduled',
    latestInformation: '',
    originalShutdownDate: '',
    originalShutdownDateTime: '',
    originalShutdownPeriodStart: '',
    originalShutdownPeriodEnd: '',
    expiredOutage: false,
    lastModified: '',
    dummyData: true,
    shutdownPeriods: [
        {
            start: '1',
            end: '1',
        }
    ],
    originalShutdownPeriods: [
        {
            start: '1',
            end: '1',
        }
    ]
};

const initialState: OutageOverlayViewState = {
    value: { cardClickShow: false, isVisible: 'Hidden', data: defaultDataValue },
};

const outageOverlayViewSlice = createSlice({
    name: 'outageOverlayView',
    initialState,
    reducers: {
        update: (state, action) => {
            state.value = action.payload as OutageOverlayStates;
        },
        resetAfterView: (state) => {
            state.value = { cardClickShow: false, isVisible: 'Closed', data: defaultDataValue };
        }
    }
});

export const { update, resetAfterView } = outageOverlayViewSlice.actions;

export default outageOverlayViewSlice.reducer;
