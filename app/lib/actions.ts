/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';
import { FormValues } from './definitions';

/**
 * Update information related to the subscription. Called after submitting the subscription form.
 *
 * @param {boolean} includeCoords flag for whether co-ordinates are included or not
 * @param {boolean} isExistingSub flag for if the subscription already exists or not
 * @param {FormValues} formData user-submitted form values
 */
export async function updateSubscription(includeCoords: boolean, isExistingSub: boolean, formData: FormValues) {
    const { location, email, id, latitude, longtitude } = formData;

    const payload: any = {
        location: location,
        email: email,
        hasCoordinates: includeCoords
    };

    if (includeCoords) {
        payload.latitude = latitude;
        payload.longtitude = longtitude;
    }

    if (isExistingSub) {
        payload.id = id;
    }
    else {
        payload.datesubscribed = new Date().toLocaleString();
    }

    await fetch(process.env.API_URL + '/subscription', {
        method: isExistingSub ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
    });

    if (!isExistingSub) {
        revalidatePath('/notifications'); // clear cache
    }
}

/**
 * Get a list of all subscriptions tied to an email address.
 *
 * @param {string} email the email address
 * @returns list of subscriptions
 */
export async function getSubscriptions(email: string) {
    const subsReq = await fetch(process.env.API_URL + `/subscription?email=${email}`);
    const subsJson = await subsReq.json();
    return subsJson.rows;
}

/**
 * Delete a subscription with a matching id.
 *
 * @param {string} subId
 */
export async function deleteSubscription(subId: string) {
    await fetch(process.env.API_URL + '/subscription', {
        method: 'DELETE',
        body: JSON.stringify({ id: subId })
    });
    // TODO remove card from UI without needing another API request
    revalidatePath('/notifications'); // clear cache
}
