import { getAllOutages } from '@/lib/database';
import { getManipulatedOutages } from '@/lib/utils';

export async function GET() {
    // Get outages from DB
    let outages;
    try {
        outages = await getAllOutages();
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
