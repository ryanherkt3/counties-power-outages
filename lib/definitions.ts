import { Decimal } from '@prisma/client/runtime/client';

export type OutageDBData = {
    id: string;
    projecttype: string | null;
    shutdowndatetime: string | null;
    shutdowndate: Date | string | null;
    feeder: string | null;
    affectedcustomers: number | null;
    lat: Decimal | null;
    lng: Decimal | null;
    distance: Decimal | null;
    hull: string | null;
    address: string | null;
    statustext: string | null;
    latestinformation: string | null;
    originalshutdowndate: Date | string | null;
    lastmodified: string | null;
    shutdownperiodstart: string | null;
    shutdownperiodend: string | null;
    originalshutdownperiodstart: string | null;
    originalshutdownperiodend: string | null;
};

export type OutageData = OutageDBData & {
    hull: Coordinate[];
    statustext: 'Scheduled' | 'Postponed' | 'Cancelled' | 'Active';
    description: string | null;
    shutdownperiods: Array<ShutdownPeriods>;
    originalshutdownperiods: Array<ShutdownPeriods>;
    expiredOutage: boolean;
    dummyData: boolean;
};

export type NotificationSub = {
    id: string;
    location: string | null;
    lat: number | Decimal | null;
    lng: number | Decimal | null;
    email: string;
    datesubscribed: string;
    outageinfo: string | null;
};

export type ShutdownPeriods = {
    start: string | null;
    end: string | null;
};

export type Coordinate = {
    lng: number | Decimal | null;
    lat: number | Decimal | null;
};

export type OutageTimes = {
    startTime: string;
    endTime: string;
};

export type NotifOutageInfo = {
    id: string;
    emailSent: number;
    status: string;
};

export type FormFields = {
    id: string;
    email: string;
    location: string;
    latitude: number | null;
    longtitude: number | null;
};

export type FormValues = FormFields & {
    datesubscribed: string;
    hasCoordinates: boolean;
};

export type SearchData = {
    page: string | undefined;
    query: string | undefined;
    status: string | undefined;
    startdate: string | undefined;
    enddate: string | undefined;
};

export type SearchParams = SearchData & {
    outage: string | undefined
}

export type PromiseSearchParams = Promise<SearchParams>;

export type ChallengeOutcome = 'pending' | 'success' | 'failed';

type ChallengeIdentifier = 'email' | 'id';
export type ChallengeVariables = {
    subIdentifier: ChallengeIdentifier;
    subParam: string;
}

export type OutageOverlayStates = {
    cardClickShow: boolean,
    isVisible: OverlayVisibility,
    data: OutageData
}

export type OverlayVisibility = 'Hidden' | 'Open' | 'Closed';

export type FilterOverlayStates = {
    isVisible: boolean,
    data: FilterOverlayData,
    filterValues: SelectedFilterOverlayValues,
}

export type FilterOverlayData = {
    type: 'Status' | 'Start Date' | 'End Date' | 'none',
    optionalDates: Array<string> | null;
}

export type SelectedFilterOverlayValues = {
    status: string | '',
    startdate: string | '',
    enddate: string | ''
}

export type MenuLink = {
    href: string,
    linkName: string,
}
