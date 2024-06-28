'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { unstable_noStore as noStore } from 'next/cache';
import { NotificationSub } from './definitions';
import { Resend } from 'resend';
import NotificationEmail from '../ui/notif-email'

const FormSchema = z.object({
    name: z.string()
        .min(1, { message: 'Name must not be empty' }),
    lat: z.coerce.number(
        { invalid_type_error: 'Please enter a number' }
    )
        .step(0.00001, { message: 'Latitude must have no more than five decimal places' })
        .nonnegative({ message: 'Please remove the minus sign from the input' })
        .min(37, { message: 'Latitude must be at least 37' })
        .max(37.99999, { message: 'Latitude must be no more than 37.9999' }),
    lng: z.coerce.number(
        { invalid_type_error: 'Please enter a number' }
    )
        .step(0.00001, { message: 'Longtitude must have no more than five decimal places' })
        .min(174, { message: 'Longtitude must be at least 174' })
        .max(175.99999, { message: 'Longtitude must be no more than 175.99999' }),
    email: z.string().email(),
});

const AddSub = FormSchema;

export type State = {
    errors?: {
        name?: string[];
        lat?: string[];
        lng?: string[];
        email?: string[];
    };
    message?: string | null;
};   

export async function addSubscription(prevState: State, formData: FormData) {
    const validatedFields = AddSub.safeParse({
        name: formData.get('name'),
        lat: formData.get('lat'),
        lng: formData.get('lng'),
        email: formData.get('email'),
    });

    if (!validatedFields.success) {
        return {
            message: 'Subscription not added - please address the form errors',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email } = validatedFields.data;
    const lat = (validatedFields.data.lat *= -1).toFixed(5);
    const lng = (validatedFields.data.lng).toFixed(5);

    const dateSubscribed = new Date().toLocaleString();

    try {  
        await sql`
            INSERT INTO notifications (outageName, lat, lng, email, dateSubscribed)
            VALUES (${name}, ${lat}, ${lng}, ${email}, ${dateSubscribed})
        `;
    }
    catch(error) {
        return { message: `Subscription already exists` };
    }

    revalidatePath('/notifications'); // clear cache
    return { message: 'Subscription successfully created!', errors: {} }
}

export async function getSubscriptions(email: string) {
    noStore();

    try {
        const outages = await sql<NotificationSub>`SELECT * FROM notifications WHERE email = ${email}`;
        return outages.rows;
    }
    catch(error) {
        console.error('Database Error:', error);
        throw new Error('Database Error: Failed to fetch subscriptions');
    }
}

export async function deleteSubscription(subscription: NotificationSub) {
    try {
        // TODO fix where clause
        // await sql`DELETE FROM notifications WHERE id = ${id}`;
        // revalidatePath('/notifications');
        return Promise.resolve(true);
    }
    catch(error) {
        console.error('Database Error:', error);
        return Promise.resolve(false);
    }
}

// TODO integrate with cron job
export async function sendEmailNotification(data: NotificationSub) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        
        // TODO tidy up subject
        await resend.emails.send({
            from: "Counties Power Outages <notifications@outages.ryanherkt.com>",
            to: data.email,
            subject: "Upcoming Power Outage",
            react: NotificationEmail({data})
        });
        return {
            error: null,
            success: true
        }
    } 
    catch (error) {
        console.log(error);
        return {
            error: (error as Error).message,
            success: false
        };
    }
}