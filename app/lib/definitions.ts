export type OutageData = {
    id: string;
    description: string;
    shutdownDateTime: string;
    shutdownDate: string;
    shutdownPeriods: Array<ShutdownPeriods>;
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
    originalShutdownPeriods: ShutdownPeriods;
    expiredOutage: boolean;
};

export type ShutdownPeriods = {
    start: string;
    end: string;
};

export type Coordinates = {
    lng: number;
    lat: number;
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
