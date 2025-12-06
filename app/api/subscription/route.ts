import {
    createNewUserNotification,
    deleteUserNotification,
    getUserNotifByEmail,
    getUserNotifByID,
    updateExistingUserNotification
} from '@/lib/database';
import { FormValues, NotificationSub } from '@/lib/definitions';
import { sendConfirmationEmail } from '@/lib/emails';
import { isValidEmail, isValidPayloadArgument } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const { searchParams } = request.nextUrl;
    const email = searchParams.get('email'); // api/subscription?email=xx
    const id = searchParams.get('id'); // api/subscription?id=xx

    if (id) {
        if (!isValidPayloadArgument(id, 'id')) {
            return new NextResponse(JSON.stringify(
                { 'error': 'Invalid arguments for getting subscription - step 1', 'sub': [] }
            ), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get the notification with the requested ID from DB
        const subscription: NotificationSub | boolean | null = await getUserNotifByID(id);

        if (subscription) {
            return new NextResponse(JSON.stringify({ 'sub': subscription }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (subscription === null) {
            return new NextResponse(JSON.stringify({ 'sub': [] }), {
                status: 204,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        if (!subscription) {
            return new NextResponse(JSON.stringify({ 'error': 'Server error', 'sub': [] }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    }

    if (!email || !isValidEmail(email)) {
        return new NextResponse(JSON.stringify(
            { 'error': 'Invalid arguments for getting subscription - step 2', 'rows': [] }
        ), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Get notifications from DB
    const subscriptions: NotificationSub[] | boolean | null = await getUserNotifByEmail(email);

    if (subscriptions) {
        return new NextResponse(JSON.stringify({ 'rows': subscriptions }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    if (subscriptions === null) {
        return new NextResponse(JSON.stringify({ 'rows': [] }), {
            status: 204,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    if (!subscriptions) {
        return new NextResponse(JSON.stringify({ 'error': 'Server error', 'rows': [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

// POST: Create subscription
export async function POST(request: Request) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const body: FormValues = await request.json();

    const invalidArguments = !body || typeof body.hasCoordinates !== 'boolean' || !isValidEmail(body.email)
        || (body.location && !isValidPayloadArgument(body.location, 'location'))
        || (body.hasCoordinates && body.latitude && !isValidPayloadArgument(body.latitude, 'coordinate'))
        || (body.hasCoordinates && body.longtitude && !isValidPayloadArgument(body.longtitude, 'coordinate'))
        || !isValidPayloadArgument(body.datesubscribed, 'date-subscribed');

    if (invalidArguments) {
        return new Response(JSON.stringify(
            { 'error': 'Invalid arguments for creating subscription - step 1', 'success': false }
        ), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const { location, latitude, longtitude, email, datesubscribed } = body;

    // Add outage subscription to DB
    const idString = await createNewUserNotification(body);

    if (idString) {
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
    if (idString === null) {
        return new Response(JSON.stringify(
            { 'error': 'Invalid arguments for creating subscription - step 2', 'success': false }
        ), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'error': 'Server error', 'success': false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}

// PUT: Update subscription
export async function PUT(request: Request) {
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const body: FormValues = await request.json();

    const invalidArguments = !body || !isValidPayloadArgument(body.id, 'id') || typeof body.hasCoordinates !== 'boolean'
        || (body.hasCoordinates && body.latitude && !isValidPayloadArgument(body.latitude, 'coordinate'))
        || (body.hasCoordinates && body.longtitude && !isValidPayloadArgument(body.longtitude, 'coordinate'));

    if (invalidArguments) {
        return new Response(JSON.stringify(
            { 'error': 'Invalid arguments for updating subscription - step 1', 'success': false }
        ), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Update existing outage subscription
    const notifUpdated = await updateExistingUserNotification(body);

    if (notifUpdated) {
        return new Response(JSON.stringify({ 'success': true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'error': 'Server error', 'success': false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function DELETE(request: Request) {
    const body = await request.json();

    const { id } = body;

    if (!body || !isValidPayloadArgument(id, 'id')) {
        return new Response(JSON.stringify(
            { 'error': 'Invalid arguments for deleting subscription', 'success': false }
        ), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Delete outage subscription from DB
    const notifDeleted = await deleteUserNotification(id);

    if (notifDeleted) {
        return new Response(JSON.stringify({ 'success': true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'error': 'Server error', 'success': false }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}
