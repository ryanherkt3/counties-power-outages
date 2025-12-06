'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import NotifSubChallengeOverlay from '@/components/notifications/notif-sub-challenge-overlay';
import NotifSubForm from '@/components/notifications/notif-sub-form';
import NotifSubs from '@/components/notifications/notif-subs';
import Search from '@/components/search';
import { getSubscriptions } from '@/lib/actions';
import { ChallengeOutcome, ChallengeVariables } from '@/lib/definitions';
import { useState, useEffect } from 'react';
import { AtSymbolIcon, EnvelopeIcon, KeyIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export default function NotificationsClient() {
    const email = useSearchParams().get('email') || '';
    const router = useRouter();

    // Create empty object as only new subscriptions get created on this page
    const notifFormValues = {
        id: '',
        latitude: null,
        longtitude: null,
        location: '',
        email: '',
        hasCoordinates: true,
        datesubscribed: '',
    };

    const [challengeOutcome, setChallengeOutcome] = useState<ChallengeOutcome>('pending');
    const challengeCb = (outcome: ChallengeOutcome) => {
        if (outcome === 'failed') {
            // Remove the email parameter
            router.push('/notifications');
            router.refresh();
        }

        setChallengeOutcome(outcome);
    };

    const [subscriptions, setSubscriptions] = useState([]);
    useEffect(() => {
        const checkForSubs = async () => {
            const subs = await getSubscriptions(email);
            setSubscriptions(subs);

            setChallengeOutcome('pending');
        };

        checkForSubs().catch(
            (e: unknown) => {
                console.error('Error checking for subscriptions', e);
            }
        );
    }, [email]);

    if (subscriptions.length && challengeOutcome === 'pending') {
        const challengeVariables: ChallengeVariables = { subIdentifier: 'email', subParam: email };

        return (
            <NotifSubChallengeOverlay
                onSubPage={false}
                stateUpdate={challengeCb}
                challengeVariables={challengeVariables}
            />
        );
    }

    return (
        <div className="flex flex-col gap-8 px-4 py-6 page-min-height">
            <div className="flex flex-col gap-4 relative">
                <div className="text-xl font-semibold text-center">Simple Subscription Steps</div>
                <div className='flex flex-row gap-6 justify-center flex-wrap'>
                    <div className='flex flex-col gap-3 w-40 items-center justify-start'>
                        <PencilSquareIcon className='w-15 h-15 text-red-500'/>
                        <span className='text-center text-lg'>Fill in the form below</span>
                    </div>
                    <div className='flex flex-col gap-3 w-40 items-center justify-start'>
                        <EnvelopeIcon className='w-15 h-15 text-red-500'/>
                        <span className='text-center text-lg'>Get notified of upcoming outages</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 relative">
                <div className="text-xl font-semibold text-center">Simple Update Steps</div>
                <div className='flex flex-row gap-6 justify-center flex-wrap'>
                    <div className='flex flex-col gap-3 w-40 items-center justify-start'>
                        <AtSymbolIcon className='w-15 h-15 text-red-500'/>
                        <span className='text-center text-lg'>Check your email address for active subscriptions</span>
                    </div>
                    <div className='flex flex-col gap-3 w-40 items-center justify-start'>
                        <KeyIcon className='w-15 h-15 text-red-500'/>
                        <span className='text-center text-lg'>Complete the challenge</span>
                    </div>
                    <div className='flex flex-col gap-3 w-40 items-center justify-start'>
                        <PencilSquareIcon className='w-15 h-15 text-red-500'/>
                        <span className='text-center text-lg'>Edit your subscription (or unsubscribe)</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 relative">
                <div className="text-xl font-semibold text-center">Active Subscriptions</div>
                <Search placeholder="Enter your email address"/>
            </div>

            {
                challengeOutcome === 'success' ? <NotifSubs subscriptions={subscriptions} /> : null
            }

            <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold text-center">Subscribe to Outages</div>
                <NotifSubForm values={notifFormValues} onSubPage={false} />
            </div>
        </div>
    );
}
