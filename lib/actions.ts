'use server';

import { revalidatePath } from 'next/cache';
import { FormFields, FormValues } from './definitions';

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
}
