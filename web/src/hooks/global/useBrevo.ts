import { useEffect } from 'react';

declare global {
    interface Window {
        BrevoConversationsID?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    }
}

export const useBrevo = () => {
    useEffect(() => {
        if (process.env.NODE_ENV !== 'production') return;

        const loadScript = () => {
            (function (d: Document, w: Window & typeof globalThis, c: string) {
                w.BrevoConversationsID = '62e42fcaf4fb9c55755353b8';
                w[c] =
                    w[c] ||
                    function (...args: unknown[]) {
                        (w[c].q = w[c].q || []).push(args);
                    };
                const s = d.createElement('script');
                s.async = true;
                s.src =
                    'https://conversations-widget.brevo.com/brevo-conversations.js';
                if (d.head) d.head.appendChild(s);
            })(document, window, 'BrevoConversations');
        };

        if (document.readyState === 'complete') {
            loadScript(); // If the page is already loaded, load the script immediately
        } else {
            window.addEventListener('load', loadScript); // Wait for the page to fully load
        }

        return () => {
            window.removeEventListener('load', loadScript);
        };
    }, []);
};
