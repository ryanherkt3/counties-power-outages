export type OutageData = {
    id: string;
    description: string;
    ShutdownDateTime: string;
    shutdownDate: string;
    shutdownTime1: string;
    shutdownTime2: string;
    feeder: string;
    affectedCustomers: number;
    lat: number;
    lng: number;
    distance: number;
    hull: Coordinate[];
    address: string;
    statusText: 'Scheduled' | 'Postponed' | 'Cancelled' | 'Active';
    latestInformation: string;
    originalShutdownDate: string;
    originalShutdownTime1: string;
    originalShutdownTime2: string;
};

export type Coordinate = {
    lng: number;
    lat: number;
};

export type OutageTimes = {
    startTime: string;
    endTime: string;
};

export type NotificationSub = {
    outagename: string;
    lat: number;
    lng: number;
    email: string;
    datesubscribed: string;
    outageinfo: string | null;
};
