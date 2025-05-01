// TODO create cron script for this to run automatically
import { db } from '@vercel/postgres';

async function updateOutages(client, outage) {
    const {
        id,
        projectType,
        shutdownDateTime,
        shutdownDate,
        shutdownPeriods,
        feeder,
        affectedCustomers,
        lat, lng,
        distance,
        hull,
        address,
        statusText,
        latestInformation,
        originalShutdownDate,
        originalShutdownPeriods,
        lastModified
    } = outage;

    const shutDownStart = shutdownPeriods[0].start;
    const shutDownEnd = shutdownPeriods[0].end;
    const ogShutDownStart = originalShutdownPeriods.length ? originalShutdownPeriods[0].start : '';
    const ogShutDownEnd = originalShutdownPeriods.length ? originalShutdownPeriods[0].end :  '';

    const hullObj = [];
    let hullString = '';
    if (hull && typeof hull === 'object') {
        for (const coords of hull) {
            hullObj.push({lat: coords.lat, lng: coords.lng});
        }
        hullString = JSON.stringify(hullObj);
    }

    // Add outage to DB
    // TODO delete if shutdownperiodend time has passed
    try {
        const addOutage = await client.sql`
            INSERT INTO outages (
                id, projecttype, shutdowndatetime, shutdowndate, shutdownperiodstart, shutdownperiodend, feeder,
                affectedcustomers, lat, lng, distance, hull, address, statustext, latestinformation,
                originalshutdowndate, originalshutdownperiodstart,
                originalshutdownperiodend, lastmodified
            )
            VALUES (
                ${id}, ${projectType}, ${shutdownDateTime}, ${shutdownDate}, ${shutDownStart}, ${shutDownEnd},
                ${feeder}, ${affectedCustomers}, ${lat}, ${lng}, ${distance}, ${hullString}, ${address},
                ${statusText}, ${latestInformation || ''}, ${originalShutdownDate || ''}, ${ogShutDownStart},
                ${ogShutDownEnd}, ${lastModified}
            )
            ON CONFLICT (id, lastmodified) DO UPDATE
            SET 
                shutdowndate = EXCLUDED.shutdowndate,
                shutdownperiodstart = EXCLUDED.shutdownperiodstart,
                shutdownperiodend = EXCLUDED.shutdownperiodend,
                statustext = EXCLUDED.statustext,
                latestinformation = EXCLUDED.latestinformation,
                originalshutdowndate = EXCLUDED.originalshutdowndate,
                originalshutdownperiodstart = EXCLUDED.originalshutdownperiodstart,
                originalshutdownperiodend = EXCLUDED.originalshutdownperiodend,
                lastmodified = EXCLUDED.lastmodified
        `;

        console.log('Added/updated outage');

        return {
            addOutage
        };
    }
    catch (error) {
        console.error('Error adding outage entry:', error);
        throw error;
    }
}

async function main() {
    const outagesReq = await fetch('https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');
    const outagesJson = await outagesReq.json();
    const outages = outagesJson.planned_outages;

    const client = await db.connect();

    for (const outage of outages) {
        await updateOutages(client, outage);
    }

    console.log('Entries added');

    await client.end();
}

main().catch((err) => {
    console.error('An error occurred while attempting to update the database:', err);
});
