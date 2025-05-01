export type OutageData = {
    id: string;
    projectType: string;
    description: string;
    shutdownDateTime: string;
    shutdownDate: string;
    shutdownPeriods: Array<ShutdownPeriods>;
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
    originalShutdownPeriods: ShutdownPeriods;
    expiredOutage: boolean;
    lastModified: string;
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
    id: number;
    location: string | null;
    lat: number | null;
    lng: number | null;
    email: string;
    datesubscribed: string;
};
