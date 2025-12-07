'use server';

import { revalidatePath } from 'next/cache';
import { ChallengeVariables, FormFields, FormValues, NotificationSub, OutageData } from './definitions';
import { getUserNotifByLocation } from './database';
import { getTimesAndActiveOutage } from './utils';

/**
 * Return the active outages
 *
 * @returns {Object} outages
 */
export async function getActiveOutages() {
    const outagesReq = await fetch(`${process.env.API_URL}/getoutages`, {
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
    });

    const outagesJson = await outagesReq.json() as { planned_outages: OutageData[] | [] };

    let outages: OutageData[] = outagesJson.planned_outages;

    outages.map((outage: OutageData) => {
        if (outage.shutdownPeriodStart && outage.shutdownPeriodEnd) {
            const timesAndIsActiveOutage =
                getTimesAndActiveOutage(outage.shutdownPeriodStart, outage.shutdownPeriodEnd);
            outage.expiredOutage = timesAndIsActiveOutage.expiredOutage;

            if (timesAndIsActiveOutage.activeOutage && outage.statusText !== 'Cancelled') {
                outage.statusText = 'Active';
            }
        }
    });

    outages = outages.filter((outage: OutageData) => {
        return !outage.expiredOutage;
    }).sort((a: OutageData, b: OutageData) => {
        if (a.shutdownDateTime && b.shutdownDateTime &&
            a.shutdownPeriodStart &&
            b.shutdownPeriodStart) {
            const aTime = new Date(a.shutdownDateTime).getTime() / 1000;
            const bTime = new Date(b.shutdownDateTime).getTime() / 1000;

            const aStartTime = new Date(a.shutdownPeriodStart).getTime() / 1000;
            const bStartTime = new Date(b.shutdownPeriodStart).getTime() / 1000;

            if (aTime === bTime) {
                return aStartTime - bStartTime;
            }
            return aTime - bTime;
        }

        return 0;
    });

    return outages;
}


/**
 * Update information related to the subscription. Called after submitting the subscription form.
 *
 * @param {boolean} includeCoords flag for whether co-ordinates are included or not
 * @param {boolean} isExistingSub flag for if the subscription already exists or not
 * @param {FormFields} formData user-submitted form values
 */
export async function updateSubscription(includeCoords: boolean, isExistingSub: boolean, formData: FormFields) {
    const { location, email, id, latitude, longtitude } = formData;

    const payload: FormValues = {
        location: location,
        email: email,
        hasCoordinates: includeCoords,
        latitude: includeCoords ? latitude : null,
        longtitude: includeCoords ? longtitude : null,
        id: isExistingSub ? id : '',
        datesubscribed: isExistingSub ? '' : new Date().toLocaleString(),
    };

    try {
        await fetch(`${process.env.API_URL}/subscription`, {
            method: isExistingSub ? 'PUT' : 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });

        if (!isExistingSub) {
            revalidatePath('/notifications'); // clear cache
        }
    }
    catch (error) {
        console.log('Error updating subscription', error);
    }
}

/**
 * Get a list of all subscriptions tied to an email address.
 *
 * @param {string} email the email address
 * @returns {NotificationSub[]} list of subscriptions
 */
export async function getSubscriptions(email: string) {
    // Return empty array if no email provided
    if (!email) {
        return [];
    }

    try {
        const subsReq = await fetch(`${process.env.API_URL}/subscription?email=${email}`, {
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });

        const subsJson = await subsReq.json() as { rows: NotificationSub[] | [] };
        const rows = subsJson.rows as NotificationSub[];

        return rows;
    }
    catch (error) {
        console.log('Error getting subscriptions', error);
    }
}

/**
 * Return a subscription by ID
 *
 * @param {string} id
 * @returns {Object} subscription
 */
export async function getSubById(id: string) {
    // Return empty array if no ID provided
    if (!id) {
        return [];
    }

    const subReq = await fetch(`${process.env.API_URL}/subscription?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
    });

    const subJson = await subReq.json() as { sub: NotificationSub | [] };
    const rows = subJson.sub as NotificationSub;

    return rows;
}

/**
 * Return a subscription by location
 *
 * @param {string} location
 * @param {ChallengeVariables} challengeVariables
 * @returns {boolean|Object} subscription (or false if no location provided)
 */
export async function getSubByLocation(location: string, challengeVariables: ChallengeVariables) {
    // Return false if no location provided
    if (!location) {
        return false;
    }

    const userSub = await getUserNotifByLocation(location, challengeVariables);

    return userSub;
}

/**
 * Delete a subscription with a matching id.
 *
 * @param {string} subId
 */
export async function deleteSubscription(subId: string) {
    try {
        await fetch(`${process.env.API_URL}/subscription`, {
            method: 'DELETE',
            body: JSON.stringify({ id: subId }),
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
    }
    catch (error) {
        console.log('Error deleting subscription', error);
    }
}
