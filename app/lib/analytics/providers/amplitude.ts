/**
 * Amplitude Analytics Provider
 *
 * Implements the AnalyticsProvider interface for Amplitude.
 * Amplitude is a product analytics platform.
 */

import type {
  AnalyticsProvider,
  EventProperties,
  PageViewProperties,
  UserProperties,
  ProviderOptions,
} from '../types';

// Amplitude types (minimal subset we need)
interface AmplitudeInstance {
  init: (apiKey: string, userId?: string, options?: Record<string, unknown>) => void;
  track: (eventName: string, properties?: Record<string, unknown>) => void;
  identify: (identify: unknown) => void;
  setUserId: (userId: string | null) => void;
  reset: () => void;
  setOptOut: (optOut: boolean) => void;
}

interface AmplitudeIdentify {
  set: (key: string, value: unknown) => AmplitudeIdentify;
}

declare global {
  interface Window {
    amplitude?: {
      getInstance: () => AmplitudeInstance;
      Identify: new () => AmplitudeIdentify;
    };
  }
}

let initialized = false;

/**
 * Load Amplitude script dynamically
 */
async function loadAmplitude(): Promise<typeof window.amplitude | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (window.amplitude) {
    return window.amplitude;
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.amplitude.com/libs/amplitude-8.21.4-min.gz.js';
    script.async = true;
    script.onload = () => {
      setTimeout(() => resolve(window.amplitude || null), 100);
    };
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

/**
 * Amplitude Analytics Provider
 */
export const amplitudeProvider: AnalyticsProvider = {
  name: 'amplitude',

  async init(apiKey: string, options?: ProviderOptions): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    if (initialized) {
      return;
    }

    const amplitude = await loadAmplitude();

    if (!amplitude) {
      console.warn('[Analytics] Failed to load Amplitude');
      return;
    }

    amplitude.getInstance().init(apiKey, undefined, {
      includeReferrer: true,
      includeUtm: true,
      includeGclid: true,
      logLevel: options?.debug ? 'WARN' : 'DISABLE',
      ...options,
    });

    initialized = true;

    if (options?.debug) {
      console.log('[Analytics] Amplitude initialized');
    }
  },

  track(eventName: string, properties?: EventProperties): void {
    if (typeof window === 'undefined' || !window.amplitude) {
      return;
    }

    window.amplitude.getInstance().track(eventName, properties);
  },

  page(properties?: PageViewProperties): void {
    if (typeof window === 'undefined' || !window.amplitude) {
      return;
    }

    window.amplitude.getInstance().track('Page Viewed', {
      path: properties?.path || window.location.pathname,
      title: properties?.title || document.title,
      referrer: properties?.referrer || document.referrer,
      url: window.location.href,
      ...properties,
    });
  },

  identify(userId: string, properties?: UserProperties): void {
    if (typeof window === 'undefined' || !window.amplitude) {
      return;
    }

    const instance = window.amplitude.getInstance();
    instance.setUserId(userId);

    if (properties) {
      const identify = new window.amplitude.Identify();

      for (const [key, value] of Object.entries(properties)) {
        if (value !== undefined) {
          identify.set(key, value);
        }
      }

      instance.identify(identify);
    }
  },

  reset(): void {
    if (typeof window === 'undefined' || !window.amplitude) {
      return;
    }

    window.amplitude.getInstance().setUserId(null);
    window.amplitude.getInstance().reset();
  },

  isInitialized(): boolean {
    return initialized;
  },

  optOut(): void {
    if (typeof window === 'undefined' || !window.amplitude) {
      return;
    }

    window.amplitude.getInstance().setOptOut(true);
  },

  optIn(): void {
    if (typeof window === 'undefined' || !window.amplitude) {
      return;
    }

    window.amplitude.getInstance().setOptOut(false);
  },
};

export default amplitudeProvider;
