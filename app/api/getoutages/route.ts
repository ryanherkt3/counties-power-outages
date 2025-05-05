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
        for (const outage of outages.rows) {
            outage.hull = outage.hull ? JSON.parse(outage.hull) : [];

            // Convert shutdowndate to a string
            const year = outage.shutdowndate.getFullYear();
            const month = outage.shutdowndate.getMonth() + 1;
            const day = outage.shutdowndate.getDate();
            outage.shutdowndate = `${day}/${month}/${year}`;

            // Convert originalshutdowndate to a string
            if (outage.originalshutdowndate) {
                const year = outage.originalshutdowndate.getFullYear();
                const month = outage.originalshutdowndate.getMonth() + 1;
                const day = outage.originalshutdowndate.getDate();
                outage.originalshutdowndate = `${day}/${month}/${year}`;
            }

            outage.shutdownperiods = [
                {
                    start: outage.shutdownperiodstart,
                    end: outage.shutdownperiodend,
                }
            ];

            outage.originalshutdownperiods = [
                {
                    start: outage.originalshutdownperiodstart,
                    end: outage.originalshutdownperiodstart,
                }
            ];

            delete outage.shutdownperiodstart;
            delete outage.shutdownperiodend;
            delete outage.originalshutdownperiodstart;
            delete outage.originalshutdownperiodstart;
        }

        return new Response(JSON.stringify({ 'planned_outages': outages.rows }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ 'planned_outages': [] }), {
        status: 204,
        headers: { 'Content-Type': 'application/json' }
    });
}
