import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addUpdateOutage(outage) {
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
        const outageExists = await prisma.outages.findFirst({ where: { id: id } });

        if (outageExists) {
            const updateOutage = await prisma.outages.update({
                where: {
                    id: id
                },
                data: {
                    shutdowndate: new Date(dateString),
                    statustext: statusText,
                    latestinformation: latestInformation || '',
                    originalshutdowndate: new Date(ogDateString),
                    originalshutdownperiodstart: ogShutDownStart,
                    originalshutdownperiodend: ogShutDownEnd,
                    lastmodified: lastModified,
                }
            });

            console.log('Updated outage');

            return updateOutage;
        }

        const addOutage = await prisma.outages.create({
            data: {
                id,
                projecttype: projectType,
                shutdowndatetime: shutdownDateTime,
                shutdowndate: new Date(dateString),
                shutdownperiodstart: shutDownStart,
                shutdownperiodend: shutDownEnd,
                feeder,
                affectedcustomers: affectedCustomers,
                lat,
                lng,
                distance,
                hull: hullString,
                address,
                statustext: statusText,
                latestinformation: latestInformation || '',
                originalshutdowndate: new Date(ogDateString),
                originalshutdownperiodstart: ogShutDownStart,
                originalshutdownperiodend: ogShutDownEnd,
                lastmodified: lastModified,
            }
        });

        console.log('Added outage');

        return addOutage;
    }
    catch (error) {
        console.error('Error adding/updating outage entry:', error);
        throw error;
    }
}

async function removeOutages() {
    // Remove outages from DB that have expired
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const removeOutages = await prisma.outages.deleteMany({
            where: {
                shutdowndate: {
                    lt: today
                }
            }
        });

        return removeOutages;
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

    for (const outage of outages) {
        await addUpdateOutage(outage);
    }
    console.log('Outages added/updated');

    // TODO remove outages first (so we don't do redundant updates)
    await removeOutages();

    console.log('Expired outages removed');

    await prisma.$disconnect();

    console.log('Client disconnected');
}

main().catch((err) => {
    console.error('An error occurred while attempting to update the database:', err);
});
