const { db } = require('@vercel/postgres');

// outageInfo - JSON string {emailSent: unix timestamp, outageId: id, status: 'Scheduled' | 'Postponed' | 'Cancelled'}
async function createNotifsTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "notifications" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL,
                outageName VARCHAR(255) NOT NULL,
                lat FLOAT NOT NULL,
                lng FLOAT NOT NULL,
                email TEXT NOT NULL,
                dateSubscribed VARCHAR(255) NOT NULL,
                outageInfo TEXT,
                PRIMARY KEY(lat, lng, email)
            );
        `;

        console.log(`Created "notifications" table`);

        return {
            createTable
        };
    } 
    catch (error) {
        console.error('Error creating notifications table:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await createNotifsTable(client);

    await client.end();
}

main().catch((err) => {
    console.error('An error occurred while attempting to seed the database:', err);
});
