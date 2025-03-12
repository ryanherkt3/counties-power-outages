const { db } = require('@vercel/postgres');

// TODO put outageInfo back:
// Update individual subscrption entries with JSON string (outageInfo section):
// {emailSent: unix timestamp, outageId: id, status: 'Scheduled' | 'Postponed' | 'Cancelled'}
// whenever cron job is run and email gets sent to a user.
async function createNotifsTable(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "notifications" table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS notifications (
                id SERIAL PRIMARY KEY,
                location VARCHAR(255) NOT NULL,
                lat FLOAT,
                lng FLOAT,
                email TEXT NOT NULL,
                datesubscribed VARCHAR(255) NOT NULL
            );
        `;

        console.log('Created notifications table');

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
