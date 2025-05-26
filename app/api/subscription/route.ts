import { NotificationSub } from '@/app/lib/definitions';
import { isValidEmail } from '@/app/lib/utils';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const email = searchParams.get('email'); // api/subscription?email=xx
    const id = searchParams.get('id'); // api/subscription?id=xx

    if (id) {
        // Get the notification with the requested ID from DB
        let subscription;
        try {
            subscription = await sql<NotificationSub>`SELECT * FROM notifications WHERE id = ${id}`;
        }
        catch (error) {
            console.log(error);
            return new NextResponse(JSON.stringify({ 'error': 'Server error', 'rows': [] }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (subscription && subscription.rows) {
            return new NextResponse(JSON.stringify({ 'sub': subscription.rows }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new NextResponse(JSON.stringify({ 'sub': [] }), {
            status: 204,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (!email || !isValidEmail(email)) {
        return new NextResponse(JSON.stringify({ 'error': 'Invalid arguments', 'rows': [] }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Get notifications from DB
    let subscriptions;
    try {
        subscriptions = await sql<NotificationSub>`SELECT * FROM notifications WHERE email = ${email}`;
    }
    catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ 'error': 'Server error', 'rows': [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (subscriptions && subscriptions.rows) {
        return new NextResponse(JSON.stringify({ 'rows': subscriptions.rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new NextResponse(JSON.stringify({ 'rows': [] }), {
        status: 204,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request: Request) {
    const body = await request.json();

    // TODO protect against SQL injection (location, date subbed, email)
    if (!body || !body.location || !body.datesubscribed || !body.email || !isValidEmail(body.email)
        || typeof body.hasCoordinates !== 'boolean') {
        return new Response(JSON.stringify({ 'error': 'Invalid arguments' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // TODO check for valid location, date subscribed, lat, lng
    const { hasCoordinates, location, latitude, longtitude, email, datesubscribed } = body;

    // Generate a random 16 character string for the subscription ID - TODO test this works
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let idString = '';
    for (let i = 0; i < 16; i++) {
        idString += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Add outage subscription to DB
    try {
        if (hasCoordinates) {
            await sql`
            INSERT INTO notifications (id, location, lat, lng, email, datesubscribed)
            VALUES (${idString}, ${location}, ${latitude}, ${longtitude}, ${email}, ${datesubscribed})
            `;
        }
        else {
            await sql`
            INSERT INTO notifications (id, location, email, datesubscribed)
            VALUES (${idString}, ${location}, ${email}, ${datesubscribed})
            `;
        }
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'success': 1 }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function PUT(request: Request) {
    const body = await request.json();

    // TODO protect against SQL injection (location) and add typeof checks / use zod checks (lat, lng)
    if (!body || !body.id || typeof body.hasCoordinates !== 'boolean') {
        return new Response(JSON.stringify({ 'error': 'Invalid arguments' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { id, hasCoordinates, location, latitude, longtitude } = body;

    // Update existing outage subscription
    try {
        let queryString = `UPDATE notifications SET location = ${location}`;

        if (hasCoordinates) {
            queryString += `, lat = ${latitude}, lng = ${longtitude}`;
        }

        queryString += ` WHERE id = ${id}`;

        await sql`${queryString}`;

        return new Response(JSON.stringify({ 'success': 1 }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE(request: Request) {
    const body = await request.json();

    if (!body || !body.id) {
        return new Response(JSON.stringify({ 'error': 'Invalid arguments' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { id } = body;

    // Delete outage subscription from DB
    try {
        await sql`DELETE FROM notifications WHERE id = ${id}`;
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'success': 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
