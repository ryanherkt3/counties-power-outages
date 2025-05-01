import { sql } from '@vercel/postgres';

export async function GET() {
    // Get outages from DB
    let outages;
    try {
        outages = await sql`SELECT * FROM outages`;
    }
    catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ 'error': 'Server error', 'rows': [] }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (outages && outages.rows) {
        return new Response(JSON.stringify({ 'rows': outages.rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'rows': [] }), {
        status: 204,
        headers: { 'Content-Type': 'application/json' }
    });
}
