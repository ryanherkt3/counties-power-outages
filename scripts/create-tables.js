import { db } from '@vercel/postgres';

async function createTables(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "notifications" table if it doesn't exist
        const createNotifsTable = await client.sql`
            CREATE TABLE IF NOT EXISTS notifications (
                id VARCHAR(16) PRIMARY KEY,
                location VARCHAR(255) NOT NULL,
                lat FLOAT,
                lng FLOAT,
                email TEXT NOT NULL,
                datesubscribed VARCHAR(255) NOT NULL,
                outageinfo VARCHAR(700)
            );
        `;

        console.log('Created notifications table');

        // Create the "outages" table if it doesn't exist
        const createOutagesTable = await client.sql`
            CREATE TABLE IF NOT EXISTS outages (
                id VARCHAR(20) PRIMARY KEY,
                projecttype VARCHAR(50),
                shutdowndatetime VARCHAR(50),
                shutdowndate DATE,
                shutdownperiodstart VARCHAR(50),
                shutdownperiodend VARCHAR(50),
                feeder VARCHAR(50),
                affectedcustomers INT,
                lat DECIMAL,
                lng DECIMAL,
                distance DECIMAL,
                hull VARCHAR(1200),
                address VARCHAR(400),
                statustext VARCHAR(400),
                latestinformation VARCHAR(400),
                originalshutdowndate DATE,
                originalshutdownperiodstart VARCHAR(50),
                originalshutdownperiodend VARCHAR(50),
                lastmodified VARCHAR(400),
                UNIQUE (id, lastmodified)
            );
        `;

        console.log('Created outages table');

        return {
            createNotifsTable, createOutagesTable
        };
    }
    catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await createTables(client);

    await client.release();
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});
