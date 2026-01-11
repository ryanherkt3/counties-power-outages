/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ChallengeVariables, FormValues, NotificationSub, OutageDBData } from './definitions';
import prisma from './prisma';

/**
 * Get all outages from the database
 *
 * @returns {Array<OutageDBData>}
 */
export async function getAllOutages() {
    try {
        const allOutages = await prisma.outages.findMany();
        // TODO fix after fixing interface defs
        return allOutages as unknown as OutageDBData[];
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Get all notifications from the database
 *
 * @returns {Array<NotificationSub>}
 */
export async function getAllNotifications() {
    try {
        const allNotifications: NotificationSub[] = await prisma.notifications.findMany();

        return allNotifications;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Update the outageInfo for an existing notification which had an email sent,
 * or which had no emails sent for a specific ID within the last 14 days
 *
 * @param {string} outageInfo
 * @param {string} id
 * @returns {NotificationSub | boolean}
 */
export async function updateNotifOutageInfo(outageInfo: string, id: string) {
    try {
        const updateOutageInfo: NotificationSub = await prisma.notifications.update({
            where: {
                id: id
            },
            data: {
                outageinfo: outageInfo
            },
        });

        return updateOutageInfo;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get a subscription based on its ID.
 *
 * @param {string | null} id the subscription ID
 * @returns {NotificationSub | null | boolean}
 */
export async function getUserNotifByID(id: string | null) {
    try {
        if (id) {
            const userNotif: NotificationSub | null = await prisma.notifications.findFirst({ where: { id: id } });
            return userNotif;
        }

        return null;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get a subscription based on its location.
 *
 * @param {string | null} location the subscription location
 * @param {ChallengeVariables} challengeVariables to determine whether to filter further by email or ID
 * @returns {NotificationSub | null | boolean}
 */
export async function getUserNotifByLocation(location: string | null, challengeVariables: ChallengeVariables) {
    try {
        if (location) {
            const { subIdentifier, subParam } = challengeVariables;

            let userNotif: NotificationSub | null = null;
            if (subIdentifier === 'id') {
                userNotif = await prisma.notifications.findFirst(
                    {
                        where: {
                            location: {
                                equals: location,
                                mode: 'insensitive'
                            },
                            id: subParam
                        }
                    }
                );
            }
            else {
                userNotif = await prisma.notifications.findFirst(
                    {
                        where: {
                            location: {
                                equals: location,
                                mode: 'insensitive'
                            },
                            email: subParam
                        }
                    }
                );
            }

            return userNotif;
        }

        return null;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get all subscriptions tied to a user's email address.
 *
 * @param {string | null} email
 * @returns {Array<NotificationSub> | null | boolean}
 */
export async function getUserNotifByEmail(email: string | null) {
    try {
        if (email) {
            const userNotifs: NotificationSub[] = await prisma.notifications.findMany({ where: { email: email } });
            return userNotifs;
        }

        return null;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Create a new notification for the user
 *
 * @param {FormValues} data the form data sent by the user
 * @returns {string | null | boolean} the ID of the notification
 */
export async function createNewUserNotification(data: FormValues) {
    try {
        const { hasCoordinates, location, latitude, longtitude, email, datesubscribed } = data;

        let notifID = '';
        let idIsNew = false;

        do {
            // Generate a random 16 character string for the subscription ID
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let idString = '';
            for (let i = 0; i < 16; i++) {
                idString += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            const notifWithIdExists = await getUserNotifByID(idString);

            if (notifWithIdExists === null) {
                idIsNew = true;
                notifID = idString;
            }
        } while (!idIsNew);

        await prisma.notifications.create({
            data: hasCoordinates ?
                {
                    id: notifID,
                    location,
                    lat: latitude as number,
                    lng: longtitude as number,
                    email,
                    datesubscribed
                } :
                {
                    id: notifID,
                    location,
                    email,
                    datesubscribed
                },
        });

        return notifID;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Update an existing user notification
 *
 * @param {FormValues} data the form data sent by the user
 * @returns {NotificationSub | boolean}
 */
export async function updateExistingUserNotification(data: FormValues) {
    try {
        const { id, hasCoordinates, location, latitude, longtitude, email } = data;

        const updateUserNotif: NotificationSub = await prisma.notifications.update({
            where: {
                id: id
            },
            data: hasCoordinates ?
                {
                    location,
                    lat: latitude as number,
                    lng: longtitude as number,
                    email,
                } :
                {
                    location,
                    email,
                },
        });

        return updateUserNotif;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Delete an existing user notification based on its ID
 *
 * @param {string} id the form data sent by the user
 * @returns {NotificationSub | boolean}
 */
export async function deleteUserNotification(id: string) {
    try {
        const deleteUserNotif: NotificationSub = await prisma.notifications.delete({ where: { id: id } });

        return deleteUserNotif;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}
