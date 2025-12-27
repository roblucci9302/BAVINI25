import { RemixBrowser } from '@remix-run/react';
import { startTransition } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { initPreloading, registerServiceWorker } from '~/lib/performance';
import { initAnalytics } from '~/lib/analytics';

startTransition(() => {
  hydrateRoot(document.getElementById('root')!, <RemixBrowser />);
});

// Initialize performance optimizations after hydration
if (typeof window !== 'undefined') {
  // Wait for hydration to complete before starting optimizations
  requestAnimationFrame(() => {
    // Strategic module preloading during idle time
    initPreloading();

    // Register service worker for asset caching (production only)
    registerServiceWorker();

    // Initialize analytics (configure via environment variables)
    // Set VITE_ANALYTICS_PROVIDER and VITE_ANALYTICS_API_KEY in .env
    const analyticsProvider = import.meta.env.VITE_ANALYTICS_PROVIDER as 'posthog' | 'amplitude' | 'none';
    const analyticsApiKey = import.meta.env.VITE_ANALYTICS_API_KEY as string;

    if (analyticsProvider && analyticsApiKey) {
      initAnalytics({
        provider: analyticsProvider,
        apiKey: analyticsApiKey,
        options: {
          debug: import.meta.env.DEV,
          disableSessionRecording: true, // Disable for privacy
        },
      });
    }
  });
}
