/* eslint-disable no-unused-vars */
export type OutageData = {
    id: string;
    projecttype: string;
    description: string;
    shutdowndatetime: string;
    shutdowndate: string;
    shutdownperiods: Array<ShutdownPeriods>;
    feeder: string;
    affectedcustomers: number;
    lat: number;
    lng: number;
    distance: number;
    hull: Coordinate[];
    address: string;
    statustext: 'Scheduled' | 'Postponed' | 'Cancelled' | 'Active';
    latestinformation: string;
    originalshutdowndate: string;
    originalshutdownperiods: Array<ShutdownPeriods>;
    expiredOutage: boolean;
    lastmodified: string;
    dummyData: boolean;
};

export type ShutdownPeriods = {
    start: string;
    end: string;
};

export type Coordinate = {
    lng: number | null;
    lat: number | null;
};

export type OutageTimes = {
    startTime: string;
    endTime: string;
};

export type SearchData = {
    page: string | undefined;
    query: string | undefined;
    status: string | undefined;
    startdate: string | undefined;
    enddate: string | undefined;
};

export type NotificationSub = {
    id: string;
    location: string | null;
    lat: number | null;
    lng: number | null;
    email: string;
    datesubscribed: string;
    outageinfo: string;
};

export type FormValues = {
    id: string;
    location: string;
    latitude: number | null;
    longtitude: number | null;
    email: string;
    datesubscribed: string;
    hasCoordinates: boolean;
};

export type SearchParams = {
    query: string | undefined,
    page: string | undefined,
    status: string | undefined,
    startdate: string | undefined,
    enddate: string | undefined,
    outage: string | undefined
}

export type OutageOverlayStates = {
    cardClickShow: boolean,
    isVisible: number,
    data: OutageData
}

export enum OverlayVisibility {
    Hidden = 0,
    Open = 1,
    Closed = 2,
}
