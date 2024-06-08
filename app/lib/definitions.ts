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
    hull: Coordinates[];
    address: string;
    statusText: 'Scheduled' | 'Postponed' | 'Cancelled' | 'Active';
    latestInformation: string;
    originalShutdownDate: string;
    originalShutdownTime1: string;
    originalShutdownTime2: string;
};

export type Coordinates = {
    lng: number;
    lat: number;
};

export type OutageTimes = {
    startTime: string;
    endTime: string;
};
