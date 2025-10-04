'use client';

import './globals.css';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import ClientLayout from '@/components/common/client-layout';

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <Provider store={store}>
            <html lang="en">
                <ClientLayout items={children} />
            </html>
        </Provider>
    );
}
