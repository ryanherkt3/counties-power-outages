'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';
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

    // TODO move to backend
    try {
        if (includeCoords) {
            await sql`
            INSERT INTO notifications (location, lat, lng, email, datesubscribed)
            VALUES (${location}, ${lat}, ${lng}, ${email}, ${datesubscribed})
            `;
        }
        else {
            await sql`
            INSERT INTO notifications (location, email, datesubscribed)
            VALUES (${location}, ${email}, ${datesubscribed})
            `;
        }
    }
    catch (error) {
        return { message: 'Subscription already exists' };
    }

    revalidatePath('/notifications'); // clear cache
    return { message: 'Subscription successfully created!', errors: {} };
}

export async function getSubscriptions(email: string) {
    noStore();

    // TODO move to backend
    try {
        const outages = await sql<NotificationSub>`SELECT * FROM notifications WHERE email = ${email}`;
        return outages.rows;
    }
    catch (error) {
        console.error('Database Error:', error);
        throw new Error('Database Error: Failed to fetch subscriptions');
    }
}

export async function deleteSubscription(subscription: NotificationSub) {
    // TODO move to backend
    try {
        await sql`DELETE FROM notifications WHERE id = ${subscription.id}`;
        revalidatePath('/notifications'); // clear cache
        return Promise.resolve(true);
    }
    catch (error) {
        console.error('Database Error:', error);
        return Promise.resolve(false);
    }
}
