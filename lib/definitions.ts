import { Decimal } from '@prisma/client/runtime/library';

export interface OutageDBData {
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
    statusText: string;
    latestInformation: string | null;
    originalShutdownDate: Date | string;
    lastModified: string | null;
    shutdownPeriodStart: string | null;
    shutdownPeriodEnd: string | null;
    originalShutdownPeriodStart: string | null;
    originalShutdownPeriodEnd: string | null;
}

export type OutageData = OutageDBData & {
    expiredOutage: boolean;
    dummyData: boolean;
}

export interface NotificationSub {
    id: string;
    location: string | null;
    lat: number | Decimal | null;
    lng: number | Decimal | null;
    email: string;
    datesubscribed: string;
    outageinfo: string | null;
}

export interface ShutdownPeriods {
    start: string | null;
    end: string | null;
}

export interface Coordinate {
    lng: number | Decimal | null;
    lat: number | Decimal | null;
}

export interface OutageTimes {
    startTime: string;
    endTime: string;
}

export interface NotifOutageInfo {
    id: string;
    emailSent: number;
    status: string;
}

export interface FormFields {
    id: string;
    email: string;
    location: string;
    latitude: number | null;
    longtitude: number | null;
}

export type FormValues = FormFields & {
    datesubscribed: string;
    hasCoordinates: boolean;
};

export interface SearchData {
    page: string | undefined;
    query: string | undefined;
    status: string | undefined;
    startdate: string | undefined;
    enddate: string | undefined;
}

export type SearchParams = SearchData & {
    outage: string | undefined
}

export type PromiseSearchParams = Promise<SearchParams>;

export type ChallengeOutcome = 'pending' | 'success' | 'failed';

type ChallengeIdentifier = 'email' | 'id';
export interface ChallengeVariables {
    subIdentifier: ChallengeIdentifier;
    subParam: string;
}

export interface OutageOverlayStates {
    cardClickShow: boolean,
    isVisible: OverlayVisibility,
    data: OutageData
}

export type OverlayVisibility = 'Hidden' | 'Open' | 'Closed';

export interface FilterOverlayStates {
    isVisible: boolean,
    data: FilterOverlayData,
    filterValues: SelectedFilterOverlayValues,
}

export interface FilterOverlayData {
    type: 'Status' | 'Start Date' | 'End Date' | 'none',
    optionalDates: string[] | null;
}

export interface SelectedFilterOverlayValues {
    status: string,
    startdate: string,
    enddate: string
}

export interface MenuLink {
    href: string,
    linkName: string,
}
