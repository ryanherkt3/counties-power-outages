import { NotificationSub } from '@/app/lib/definitions';
import { isValidEmail } from '@/app/lib/utils';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    const email = searchParams.get('email'); // api/subscription?email=xx

    if (!email || !isValidEmail(email)) {
        return new NextResponse(JSON.stringify({ 'error': 'Invalid arguments', 'rows': [] }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Get notifications from DB
    let outages;
    try {
        outages = await sql<NotificationSub>`SELECT * FROM notifications WHERE email = ${email}`;
    }
    catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ 'error': 'Server error', 'rows': [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (outages && outages.rows) {
        return new NextResponse(JSON.stringify({ 'rows': outages.rows }), {
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
    if (!body || !body.location || !body.datesubscribed || !body.email || !isValidEmail(body.email)) {
        return new Response(JSON.stringify({ 'error': 'Invalid arguments' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // TODO check for valid location, date subscribed, lat, lng
    const { includeCoords, location, lat, lng, email, datesubscribed } = body;

    // Add outage subscription to DB
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

export async function DELETE(request: Request) {
    const body = await request.json();

    if (!body || !body.id || typeof body.id !== 'number') {
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
