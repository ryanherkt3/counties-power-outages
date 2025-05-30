import { OutageData } from '@/app/lib/definitions';
import { createSlice } from '@reduxjs/toolkit';

interface OverlayDataState {
    value: OutageData;
}

const defaultValue: OutageData = {
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

const initialState: OverlayDataState = {
    value: defaultValue,
};

const overlayDataSlice = createSlice({
    name: 'overlayData',
    initialState,
    reducers: {
        populate: (state, action) => {
            state.value = action.payload;
        },
        remove: (state) => {
            state.value = defaultValue;
        }
    }
});

export const { populate, remove } = overlayDataSlice.actions;

export default overlayDataSlice.reducer;
