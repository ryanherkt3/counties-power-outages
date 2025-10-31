'use server';

import { revalidatePath } from 'next/cache';
import { ChallengeVariables, FormFields, FormValues } from './definitions';
import { getUserNotifByLocation } from './database';

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
        await fetch(process.env.API_URL + '/subscription', {
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
 * @returns list of subscriptions
 */
export async function getSubscriptions(email: string) {
    // Return empty array if no email provided
    if (!email) {
        return [];
    }

    try {
        const subsReq = await fetch(process.env.API_URL + `/subscription?email=${email}`, {
            headers: {
                'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
            }
        });
        const subsJson = await subsReq.json();
        return subsJson.rows;
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

    const subReq = await fetch(process.env.API_URL + `/subscription?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${process.env.AUTH_TOKEN}`
        }
    });
    const subJson = await subReq.json();

    return subJson.sub;
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
        await fetch(process.env.API_URL + '/subscription', {
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
