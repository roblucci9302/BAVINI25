/**
 * PostHog Analytics Provider
 *
 * Implements the AnalyticsProvider interface for PostHog.
 * PostHog is an open-source product analytics platform.
 */

import type {
  AnalyticsProvider,
  EventProperties,
  PageViewProperties,
  UserProperties,
  ProviderOptions,
} from '../types';

// PostHog types (minimal subset we need)
interface PostHogInstance {
  init: (apiKey: string, options?: Record<string, unknown>) => void;
  capture: (eventName: string, properties?: Record<string, unknown>) => void;
  identify: (userId: string, properties?: Record<string, unknown>) => void;
  reset: () => void;
  opt_out_capturing: () => void;
  opt_in_capturing: () => void;
  has_opted_out_capturing: () => boolean;
}

declare global {
  interface Window {
    posthog?: PostHogInstance;
  }
}

let initialized = false;

/**
 * Load PostHog script dynamically
 */
async function loadPostHog(): Promise<PostHogInstance | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (window.posthog) {
    return window.posthog;
  }

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://eu.i.posthog.com/static/array.js';
    script.async = true;
    script.onload = () => {
      // Wait a bit for PostHog to initialize on window
      setTimeout(() => resolve(window.posthog || null), 100);
    };
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

/**
 * PostHog Analytics Provider
 */
export const posthogProvider: AnalyticsProvider = {
  name: 'posthog',

  async init(apiKey: string, options?: ProviderOptions): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    if (initialized) {
      return;
    }

    const posthog = await loadPostHog();

    if (!posthog) {
      console.warn('[Analytics] Failed to load PostHog');
      return;
    }

    posthog.init(apiKey, {
      api_host: options?.apiHost || 'https://eu.i.posthog.com',
      capture_pageview: !options?.disableAutoPageviews,
      capture_pageleave: true,
      disable_session_recording: options?.disableSessionRecording,
      loaded: () => {
        initialized = true;
        if (options?.debug) {
          console.log('[Analytics] PostHog initialized');
        }
      },
    });

    initialized = true;
  },

  track(eventName: string, properties?: EventProperties): void {
    if (typeof window === 'undefined' || !window.posthog) {
      return;
    }

    window.posthog.capture(eventName, properties);
  },

  page(properties?: PageViewProperties): void {
    if (typeof window === 'undefined' || !window.posthog) {
      return;
    }

    window.posthog.capture('$pageview', {
      $current_url: properties?.path || window.location.href,
      title: properties?.title || document.title,
      referrer: properties?.referrer || document.referrer,
      ...properties,
    });
  },

  identify(userId: string, properties?: UserProperties): void {
    if (typeof window === 'undefined' || !window.posthog) {
      return;
    }

    window.posthog.identify(userId, properties);
  },

  reset(): void {
    if (typeof window === 'undefined' || !window.posthog) {
      return;
    }

    window.posthog.reset();
  },

  isInitialized(): boolean {
    return initialized;
  },

  optOut(): void {
    if (typeof window === 'undefined' || !window.posthog) {
      return;
    }

    window.posthog.opt_out_capturing();
  },

  optIn(): void {
    if (typeof window === 'undefined' || !window.posthog) {
      return;
    }

    window.posthog.opt_in_capturing();
  },
};

export default posthogProvider;
