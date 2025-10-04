import { NotificationSub } from '@/lib/definitions';
import { sendConfirmationEmail } from '@/lib/emails';
import { isValidEmail, isValidPayloadArgument } from '@/lib/utils';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const email = searchParams.get('email'); // api/subscription?email=xx
    const id = searchParams.get('id'); // api/subscription?id=xx

    if (id) {
        if (!isValidPayloadArgument(id, 'id')) {
            return new NextResponse(JSON.stringify({ 'error': 'Invalid arguments', 'sub': [] }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get the notification with the requested ID from DB
        let subscription;
        try {
            subscription = await sql<NotificationSub>`SELECT * FROM notifications WHERE id = ${id}`;
        }
        catch (error) {
            console.log(error);
            return new NextResponse(JSON.stringify({ 'error': 'Server error', 'sub': [] }), {
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

    const invalidArguments = !body || typeof body.hasCoordinates !== 'boolean' || !isValidEmail(body.email)
        || (body.location && !isValidPayloadArgument(body.location, 'location'))
        || (body.hasCoordinates && !isValidPayloadArgument(body.latitude, 'coordinate'))
        || (body.hasCoordinates && !isValidPayloadArgument(body.longtitude, 'coordinate'))
        || !isValidPayloadArgument(body.datesubscribed, 'date-subscribed');

    if (invalidArguments) {
        return new Response(JSON.stringify({ 'error': 'Invalid arguments', 'success': false }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { hasCoordinates, location, latitude, longtitude, email, datesubscribed } = body;

    // Generate a random 16 character string for the subscription ID
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

        const subData: NotificationSub = {
            id: idString,
            location: location,
            lat: latitude,
            lng: longtitude,
            email: email,
            datesubscribed: datesubscribed,
            outageinfo: ''
        };

        await sendConfirmationEmail(subData);

        return new Response(JSON.stringify({ 'success': true }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error', 'success': false }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function PUT(request: Request) {
    const body = await request.json();

    const invalidArguments = !body || !isValidPayloadArgument(body.id, 'id') || typeof body.hasCoordinates !== 'boolean'
        || (body.hasCoordinates && !isValidPayloadArgument(body.latitude, 'coordinate'))
        || (body.hasCoordinates && !isValidPayloadArgument(body.longtitude, 'coordinate'));

    if (invalidArguments) {
        return new Response(JSON.stringify({ 'error': 'Invalid arguments', 'success': false }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { id, hasCoordinates, location, latitude, longtitude, email } = body;

    // Update existing outage subscription
    try {
        if (hasCoordinates) {
            await sql`
            UPDATE notifications
            SET email = ${email}, location = ${location}, lat = ${latitude}, lng = ${longtitude}
            WHERE id = ${id}
            `;
        }
        else {
            await sql`UPDATE notifications SET email = ${email}, location = ${location} WHERE id = ${id}`;
        }

        return new Response(JSON.stringify({ 'success': true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error', 'success': false }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE(request: Request) {
    const body = await request.json();

    if (!body || !isValidPayloadArgument(body.id, 'id')) {
        return new Response(JSON.stringify({ 'error': 'Invalid arguments', 'success': false }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { id } = body;

    let result;

    // Delete outage subscription from DB
    try {
        result = await sql`DELETE FROM notifications WHERE id = ${id}`;
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error', 'success': false }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'success': result && result.rowCount === 1 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}
