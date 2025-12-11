import { getAllOutages } from '@/lib/database';
import { OutageData } from '@/lib/definitions';
import { getManipulatedOutages } from '@/lib/utils';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');

    // If no auth token provided, return 500 response
    if (!process.env.AUTH_TOKEN) {
        return new Response(JSON.stringify({ 'error': 'Server error', 'rows': [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (authHeader !== `Bearer ${process.env.AUTH_TOKEN}`) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    // Get outages from DB
    let outages;
    try {
        outages = await getAllOutages() as OutageData[];
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error', 'planned_outages': [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (outages.length) {
        return new Response(JSON.stringify({ 'planned_outages': getManipulatedOutages(outages) }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'planned_outages': [] }), {
        status: 204,
        headers: { 'Content-Type': 'application/json' }
    });
}
