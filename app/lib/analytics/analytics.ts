/**
 * Analytics Module
 *
 * Provides a unified interface for analytics tracking.
 * Supports multiple providers (PostHog, Amplitude) with easy switching.
 */

import type {
  AnalyticsProvider,
  AnalyticsConfig,
  EventProperties,
  PageViewProperties,
  UserProperties,
} from './types';
import { posthogProvider } from './providers/posthog';
import { amplitudeProvider } from './providers/amplitude';

// Null provider for when analytics is disabled
const nullProvider: AnalyticsProvider = {
  name: 'none',
  init: async () => {},
  track: () => {},
  page: () => {},
  identify: () => {},
  reset: () => {},
  isInitialized: () => true,
  optOut: () => {},
  optIn: () => {},
};

// Current active provider
let currentProvider: AnalyticsProvider = nullProvider;
let isInitialized = false;

/**
 * Get provider by name
 */
function getProvider(name: AnalyticsConfig['provider']): AnalyticsProvider {
  switch (name) {
    case 'posthog':
      return posthogProvider;
    case 'amplitude':
      return amplitudeProvider;
    case 'none':
    default:
      return nullProvider;
  }
}

/**
 * Initialize analytics with the specified provider
 *
 * @example
 * ```ts
 * await initAnalytics({
 *   provider: 'posthog',
 *   apiKey: 'phc_xxx',
 *   options: { debug: true }
 * });
 * ```
 */
export async function initAnalytics(config: AnalyticsConfig): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  if (isInitialized) {
    console.warn('[Analytics] Already initialized');
    return;
  }

  currentProvider = getProvider(config.provider);

  if (config.provider !== 'none' && config.apiKey) {
    await currentProvider.init(config.apiKey, config.options);
    isInitialized = true;

    if (config.options?.debug) {
      console.log(`[Analytics] Initialized with ${config.provider}`);
    }
  }
}

/**
 * Track a custom event
 *
 * @example
 * ```ts
 * trackEvent('message_sent', { messageLength: 150 });
 * ```
 */
export function trackEvent(eventName: string, properties?: EventProperties): void {
  currentProvider.track(eventName, properties);
}

/**
 * Track a page view
 *
 * @example
 * ```ts
 * trackPageView({ path: '/chat', title: 'Chat' });
 * ```
 */
export function trackPageView(properties?: PageViewProperties): void {
  currentProvider.page(properties);
}

/**
 * Identify a user
 *
 * @example
 * ```ts
 * identifyUser('user_123', { email: 'user@example.com', plan: 'pro' });
 * ```
 */
export function identifyUser(userId: string, properties?: UserProperties): void {
  currentProvider.identify(userId, properties);
}

/**
 * Reset user identity (logout)
 */
export function resetUser(): void {
  currentProvider.reset();
}

/**
 * Check if analytics is initialized
 */
export function isAnalyticsInitialized(): boolean {
  return isInitialized && currentProvider.isInitialized();
}

/**
 * Get current provider name
 */
export function getProviderName(): string {
  return currentProvider.name;
}

/**
 * Opt user out of tracking
 */
export function optOutTracking(): void {
  currentProvider.optOut();
}

/**
 * Opt user back in to tracking
 */
export function optInTracking(): void {
  currentProvider.optIn();
}

/**
 * Reset analytics (for testing)
 */
export function resetAnalytics(): void {
  currentProvider = nullProvider;
  isInitialized = false;
}
