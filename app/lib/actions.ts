'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { NotificationSub } from './definitions';

const FormSchema = z.object({
    location: z.string()
        .min(1, { message: 'Location must not be empty' }),
    lat: z.coerce.number(
        { invalid_type_error: 'Please enter a number' }
    )
        .step(0.00001, { message: 'Latitude must have no more than five decimal places' })
        .nonnegative({ message: 'Please remove the minus sign from the input' })
        .min(37, { message: 'Latitude must be at least 37' })
        .max(37.99999, { message: 'Latitude must be no more than 37.9999' })
        .optional()
        .or(z.literal('')),
    lng: z.coerce.number(
        { invalid_type_error: 'Please enter a number' }
    )
        .step(0.00001, { message: 'Longtitude must have no more than five decimal places' })
        .min(174, { message: 'Longtitude must be at least 174' })
        .max(175.99999, { message: 'Longtitude must be no more than 175.99999' })
        .optional()
        .or(z.literal('')),
    email: z.string().email(),
    includeCoords: z.boolean(),
}).superRefine(({ includeCoords, lat, lng }, ctx) => {
    // Show error if includeCoords is true and:
    // 1. nothing is entered for either choice
    // 2. lat is entered and lng isn't (and vice versa)
    if (includeCoords && lat === '' && lng === '') {
        ctx.addIssue({
            code: 'custom',
            message: 'Please enter a number',
            path: ['lat']
        });
        ctx.addIssue({
            code: 'custom',
            message: 'Please enter a number',
            path: ['lng']
        });
    }
    if (includeCoords && lat !== '' && lng === '') {
        ctx.addIssue({
            code: 'custom',
            message: 'Please enter a number, or remove the latitude number',
            path: ['lng']
        });
    }
    else if (includeCoords && lng !== '' && lat === '') {
        ctx.addIssue({
            code: 'custom',
            message: 'Please enter a number, or remove the longtitude number',
            path: ['lat']
        });
    }
});

const AddSub = FormSchema;

export type State = {
    errors?: {
        location?: string[];
        lat?: string[];
        lng?: string[];
        email?: string[];
    };
    message?: string | null;
};

// TODO add support for updating existing subscriptions
export async function addSubscription(includeCoords: boolean, prevState: State, formData: FormData) {
    const validatedFields = AddSub.safeParse({
        location: formData.get('location'),
        lat: formData.get('lat'),
        lng: formData.get('lng'),
        email: formData.get('email'),
        includeCoords: includeCoords,
    });

    if (!validatedFields.success) {
        return {
            message: 'Subscription not added - please address the form errors',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { location, email } = validatedFields.data;

    let lat, lng = '';
    if (includeCoords && validatedFields.data.lat && validatedFields.data.lng) {
        lat = (validatedFields.data.lat *= -1).toFixed(5);
        lng = (validatedFields.data.lng).toFixed(5);
    }

    const datesubscribed = new Date().toLocaleString();

    await fetch(process.env.API_URL + '/subscription', {
        method: 'POST',
        body: JSON.stringify(
            {
                location: location,
                lat: lat,
                lng: lng,
                email: email,
                datesubscribed: datesubscribed,
                includeCoords: includeCoords
            }
        )
    });

    revalidatePath('/notifications'); // clear cache
    return { message: 'Subscription successfully created!', errors: {} };
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
