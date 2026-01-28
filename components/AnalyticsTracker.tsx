'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { apiFetch, API_ENDPOINTS } from '@/lib/api-config';

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [visitorId, setVisitorId] = useState<number | null>(null);
    const initialized = useRef(false);

    // Initialize visitor session
    useEffect(() => {
        const initVisitor = async () => {
            try {
                // Get existing visitor ID from local storage
                const storedId = localStorage.getItem('visitorId');
                const id = storedId ? parseInt(storedId) : undefined;

                // Get device info (basic)
                const userAgent = window.navigator.userAgent;
                const referrer = document.referrer;

                // Track visitor
                const response = await apiFetch(API_ENDPOINTS.PUBLIC.ANALYTICS.TRACK_VISITOR, {
                    method: 'POST',
                    body: JSON.stringify({
                        visitorId: id,
                        userAgent,
                        referrer,
                        // Other fields like ipAddress, country, etc. are handled by backend from request IP
                    })
                });

                const data = await response.json();

                if (data.success && data.data) {
                    const newVisitorId = data.data.visitorId;
                    setVisitorId(newVisitorId);
                    localStorage.setItem('visitorId', newVisitorId.toString());
                }
            } catch (error) {
                console.error('Failed to track visitor:', error);
            }
        };

        if (!initialized.current) {
            initialized.current = true;
            initVisitor();
        }
    }, []);

    // Track page views
    useEffect(() => {
        const trackPageView = async () => {
            if (!visitorId) return;

            try {
                const fullPath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

                await apiFetch(API_ENDPOINTS.PUBLIC.ANALYTICS.TRACK_PAGE_VIEW, {
                    method: 'POST',
                    body: JSON.stringify({
                        visitorId,
                        pagePath: fullPath,
                        pageTitle: document.title,
                        referrer: document.referrer
                    })
                });
            } catch (error) {
                console.error('Failed to track page view:', error);
            }
        };

        if (visitorId) {
            trackPageView();
        }
    }, [pathname, searchParams, visitorId]);

    return null;
}
