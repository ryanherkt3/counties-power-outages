'use client';

import { useState } from 'react';
import NotifSubChallengeOverlay from '@/components/notifications/notif-sub-challenge-overlay';
import { notFound, useSearchParams } from 'next/navigation';
import SubscriptionInfo from '@/components/subscription/subscription-info';
import { ChallengeOutcome, ChallengeVariables } from '@/lib/definitions';

export default function SubscriptionPageClient({ id } : { id: string; }) {
    const searchParams = useSearchParams();
    const showChallenge = searchParams.get('showchallenge') || '-1';

    // showChallenge = 0 is the same as the challenge succeeding
    const [challengeOutcome, setChallengeOutcome] = useState<ChallengeOutcome>(
        showChallenge === '0' ? 'success' : 'pending'
    );

    const updateChallengeOutcome = (outcome: ChallengeOutcome) => {
        setChallengeOutcome(outcome);
    };

    if ((showChallenge !== '0' && showChallenge !== '1') || challengeOutcome === 'failed') {
        return notFound();
    }

    if (challengeOutcome === 'pending') {
        const challengeVariables: ChallengeVariables = { subIdentifier: 'id', subParam: id };

        return (
            <NotifSubChallengeOverlay
                onSubPage={true}
                stateUpdate={updateChallengeOutcome}
                challengeVariables={challengeVariables}
            />
        );
    }

    return <SubscriptionInfo id={id} />;
}
