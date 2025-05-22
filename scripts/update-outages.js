import { db } from '@vercel/postgres';

async function addOutages(client, outage) {
    const {
        id,
        projectType,
        shutdownDateTime,
        shutdownPeriods,
        feeder,
        affectedCustomers,
        lat, lng,
        distance,
        hull,
        address,
        statusText,
        latestInformation,
        originalShutdownDateTime,
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

    const dateString = shutdownDateTime.split('T')[0];
    const ogDateString = originalShutdownDateTime.length ? originalShutdownDateTime.split('T')[0] : dateString;

    // Add outage to DB
    try {
        const addOutage = await client.sql`
            INSERT INTO outages (
                id, projecttype, shutdowndatetime, shutdowndate, shutdownperiodstart, shutdownperiodend, feeder,
                affectedcustomers, lat, lng, distance, hull, address, statustext, latestinformation,
                originalshutdowndate, originalshutdownperiodstart,
                originalshutdownperiodend, lastmodified
            )
            VALUES (
                ${id}, ${projectType}, ${shutdownDateTime}, ${dateString}, ${shutDownStart}, ${shutDownEnd},
                ${feeder}, ${affectedCustomers}, ${lat}, ${lng}, ${distance}, ${hullString}, ${address},
                ${statusText}, ${latestInformation || ''}, ${ogDateString}, ${ogShutDownStart},
                ${ogShutDownEnd}, ${lastModified}
            )
            ON CONFLICT (id) DO UPDATE
            SET 
                shutdowndate = ${dateString},
                statustext = ${statusText},
                latestinformation = ${latestInformation || ''},
                originalshutdowndate = ${ogDateString},
                originalshutdownperiodstart = ${ogShutDownStart},
                originalshutdownperiodend = ${ogShutDownEnd},
                lastmodified = ${lastModified}
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

async function removeOutages(client) {
    // Remove outages from DB
    // now() - 1 DAY excludes any outages whose date is today's date (as these outages may not have started yet)
    try {
        const removeOutages = await client.sql`
            DELETE FROM outages
            WHERE shutdowndate::date < (now() - INTERVAL '1 DAY')
        `;

        return {
            removeOutages
        };
    }
    catch (error) {
        console.error('Error removing expired outages:', error);
        throw error;
    }
}

async function main() {
    const outagesReq = await fetch('https://api.integration.countiesenergy.co.nz/user/v1.0/shutdowns');
    const outagesJson = await outagesReq.json();
    const outages = outagesJson.planned_outages;

    const client = await db.connect();

    for (const outage of outages) {
        await addOutages(client, outage);
    }
    console.log('Outages added');

    await removeOutages(client);

    console.log('Expired outages removed');

    await client.release();
}

main().catch((err) => {
    console.error('An error occurred while attempting to update the database:', err);
});
