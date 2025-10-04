import { getManipulatedOutages } from '@/lib/utils';
import { sql } from '@vercel/postgres';

export async function GET() {
    // Get outages from DB
    let outages;
    try {
        outages = await sql`SELECT * FROM outages`;
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error', 'planned_outages': [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (outages && outages.rows) {
        return new Response(JSON.stringify({ 'planned_outages': getManipulatedOutages(outages.rows) }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'planned_outages': [] }), {
        status: 204,
        headers: { 'Content-Type': 'application/json' }
    });
}
