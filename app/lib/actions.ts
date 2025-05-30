/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { revalidatePath } from 'next/cache';
import { FormValues, NotificationSub } from './definitions';

export type State = {
    errors?: {
        location?: string[];
        lat?: string[];
        lng?: string[];
        email?: string[];
    };
    message?: string | null;
};

// TODO add jsdoc comment
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

export async function getSubscriptions(email: string) {
    const subsReq = await fetch(process.env.API_URL + `/subscription?email=${email}`);
    const subsJson = await subsReq.json();
    return subsJson.rows;
}

export async function deleteSubscription(subscription: NotificationSub) {
    await fetch(process.env.API_URL + '/subscription', {
        method: 'DELETE',
        body: JSON.stringify({ id: subscription.id })
    });
    // TODO remove card from UI without needing another API request
    revalidatePath('/notifications'); // clear cache
}
