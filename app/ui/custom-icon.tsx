import { BoltIcon, BellAlertIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { CalendarIcon, ClockIcon, UserIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function CustomIcon({ icon, iconClass }: { icon: string; iconClass: string }) {
    if (icon === 'ClipboardDocumentListIcon') {
        return <ClipboardDocumentListIcon className={iconClass} />;
    }
    if (icon === 'BoltIcon') {
        return <BoltIcon className={iconClass} />;
    }
    if (icon === 'BellAlertIcon') {
        return <BellAlertIcon className={iconClass} />;
    }
    if (icon === 'CalendarIcon') {
        return <CalendarIcon className={iconClass} />;
    }
    if (icon === 'ClockIcon') {
        return <ClockIcon className={iconClass} />;
    }
    if (icon === 'UserIcon') {
        return <UserIcon className={iconClass} />;
    }
    if (icon === 'MinusIcon') {
        return <MinusIcon className={iconClass} />;
    }
    if (icon === 'PlusIcon') {
        return <PlusIcon className={iconClass} />;
    }

    return null;
};