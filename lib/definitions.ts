import { Decimal } from '@prisma/client/runtime/library';

export type OutageDBData = {
    id: string;
    projectType: string | null;
    shutdownDateTime: string | null;
    shutdownDate: Date | string;
    feeder: string | null;
    affectedCustomers: number | null;
    lat: Decimal | null;
    lng: Decimal | null;
    distance: Decimal | null;
    hull: string | Coordinate[] | null;
    address: string | null;
    statusText: string | null;
    latestInformation: string | null;
    originalShutdownDate: Date | string;
    lastModified: string | null;
    shutdownPeriodStart: string | null;
    shutdownPeriodEnd: string | null;
    originalShutdownPeriodStart: string | null;
    originalShutdownPeriodEnd: string | null;
};

export type OutageData = OutageDBData & {
    expiredOutage: boolean;
    dummyData: boolean;
}

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
