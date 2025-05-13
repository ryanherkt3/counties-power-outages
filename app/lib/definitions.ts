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
