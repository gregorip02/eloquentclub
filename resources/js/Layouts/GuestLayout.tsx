import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <main className="min-h-screen">
            {children}
        </main>
    );
}
